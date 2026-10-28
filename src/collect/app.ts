// Everything the rules look at for one project: its iOS app targets with their Info.plist and
// build settings, the colours of its asset catalogs, and the app's own source files.
import { join, relative, sep } from 'node:path';
import { clip, clipOrNull } from '../core/clip.js';
import { NOT_READ, readProjectFile, readProjectText } from '../core/files.js';
import { compareVersions } from '../core/versions.js';
import type { Project } from '../detect/project.js';
import { type ColorAsset, readColorAssets } from './assets.js';
import {
  generatesInfoPlist,
  infoPlistFiles,
  iosAppTargets,
  readXcodeProject,
  setting,
  type XcodeProject,
  type XcodeTarget,
} from './pbxproj.js';
import { isDict, type PlistDict, parsePlist } from './plist.js';
import { type Language, readSources, type SourceFile, type SourceRoot } from './sources.js';

export interface InfoPlistFile {
  path: string;
  dict: PlistDict;
  keyLines: ReadonlyMap<string, number>;
}

/** A build setting found in project.pbxproj, with the line it is on. */
export interface BuildSettingValue {
  value: string;
  file: string;
  line: number | null;
}

export interface AppTarget {
  name: string;
  /** The .xcodeproj the target belongs to. */
  xcodeProject: string;
  infoPlists: InfoPlistFile[];
  /** Xcode generates (part of) the Info.plist: GENERATE_INFOPLIST_FILE = YES. */
  generatesInfoPlist: boolean;
  /** Whether an Info.plist was named but could not be read, so its keys are not known. */
  unreadInfoPlist: boolean;
  /** INFOPLIST_KEY_UIUserInterfaceStyle, when a configuration sets it. */
  styleSetting: BuildSettingValue | null;
  deploymentTarget: string | null;
}

export interface AppModel {
  project: Project;
  targets: AppTarget[];
  sources: SourceFile[];
  /** Named colours of the app's asset catalogs. */
  colors: ColorAsset[];
  /**
   * Whether an .xcodeproj could not be read or had no iOS app target, so no Info.plist or build
   * setting of the app was checked.
   */
  appNotChecked: boolean;
  /** Problems reading the project that the report should mention. */
  notes: string[];
}

export const STYLE_KEY = 'UIUserInterfaceStyle';
export const STYLE_SETTING = `INFOPLIST_KEY_${STYLE_KEY}`;

/**
 * How a note names a file: relative to the project folder, with forward slashes. Reports are
 * committed and shared, and an absolute path would carry the home folder (and user name) of
 * whoever ran a11ylabel.
 */
export const shownPath = (path: string, projectRoot: string) =>
  relative(projectRoot, path).split(sep).join('/') || '.';

/**
 * Reads the Info.plist a target names. INFOPLIST_FILE comes from the checked project, so a path
 * that leads outside the project folder is not read, and neither is anything but a regular file.
 */
async function readInfoPlist(
  path: string,
  projectRoot: string,
  notes: string[],
): Promise<InfoPlistFile | null> {
  const file = await readProjectFile(path, projectRoot);
  const shown = shownPath(path, projectRoot);
  if (!file.found) {
    notes.push(`${shown} is named in INFOPLIST_FILE but ${NOT_READ[file.reason]}`);
    return null;
  }
  try {
    const { value, keyLines } = parsePlist(file.bytes);
    if (!isDict(value)) throw new Error('the top level is not a dictionary');
    return { path, dict: value, keyLines };
  } catch (error) {
    notes.push(`${shown} could not be read as a property list: ${(error as Error).message}`);
    return null;
  }
}

function lineOf(text: string | null, needle: string): number | null {
  if (text === null) return null;
  const index = text.indexOf(needle);
  return index === -1 ? null : text.slice(0, index).split('\n').length;
}

function lowestDeploymentTarget(target: XcodeTarget): string | null {
  const versions = Object.values(target.configurations)
    .map((settings) => setting(settings, 'IPHONEOS_DEPLOYMENT_TARGET'))
    .filter((value): value is string => value !== undefined && /^\d+(\.\d+)*$/.test(value));
  return versions.sort(compareVersions)[0] ?? null;
}

/** The value of `key` in the target's configurations: Light wins over others, as it is the one to report. */
function buildSetting(
  xcode: XcodeProject,
  target: XcodeTarget,
  key: string,
  pbxprojText: string | null,
): BuildSettingValue | null {
  const values = Object.values(target.configurations)
    .map((settings) => setting(settings, key))
    .filter((value): value is string => value !== undefined);
  const value = values.find((item) => item === 'Light') ?? values[0];
  if (value === undefined) return null;
  return {
    value,
    file: join(xcode.path, 'project.pbxproj'),
    line: lineOf(pbxprojText, `${key} = ${value}`),
  };
}

async function readTarget(
  xcode: XcodeProject,
  target: XcodeTarget,
  projectRoot: string,
  pbxprojText: string | null,
  notes: string[],
): Promise<AppTarget> {
  const { files, unresolved } = infoPlistFiles(xcode, target);
  // The full name still expands $(TARGET_NAME) in INFOPLIST_FILE; the report gets the clipped one.
  const name = clip(target.name);
  for (const raw of unresolved) {
    notes.push(
      `${name}: INFOPLIST_FILE ${clip(raw)} uses a build setting a11ylabel does not expand.`,
    );
  }
  const infoPlists: InfoPlistFile[] = [];
  for (const file of files) {
    const plist = await readInfoPlist(file, projectRoot, notes);
    if (plist) infoPlists.push(plist);
  }
  const generates = generatesInfoPlist(target);
  if (files.length + unresolved.length === 0 && !generates) {
    notes.push(
      `${name}: the Xcode project sets neither INFOPLIST_FILE nor GENERATE_INFOPLIST_FILE = YES; they may be set in an .xcconfig file, which a11ylabel does not read.`,
    );
  }
  return {
    name,
    xcodeProject: xcode.path,
    infoPlists,
    generatesInfoPlist: generates,
    unreadInfoPlist: infoPlists.length < files.length + unresolved.length,
    styleSetting: buildSetting(xcode, target, STYLE_SETTING, pbxprojText),
    deploymentTarget: clipOrNull(lowestDeploymentTarget(target)),
  };
}

const NATIVE: ReadonlySet<Language> = new Set(['swift', 'objc']);
const JAVASCRIPT: ReadonlySet<Language> = new Set(['js']);
const DART: ReadonlySet<Language> = new Set(['dart']);

/** Where each kind of project keeps the code the rules read. */
function sourceRoots(project: Project): SourceRoot[] {
  const roots: SourceRoot[] = [];
  if (project.iosDir) roots.push({ folder: project.iosDir, languages: NATIVE });
  if (project.ecosystem === 'flutter') {
    roots.push({ folder: join(project.root, 'lib'), languages: DART });
  }
  if (project.ecosystem === 'react-native' || project.ecosystem === 'expo') {
    roots.push({ folder: project.root, languages: JAVASCRIPT });
  }
  return roots;
}

/** What a note adds when an .xcodeproj cannot be read: its Info.plist keys are not known. */
export const PROJECT_NOT_CHECKED =
  'Its targets were not checked, so their Info.plist keys and build settings are not known.';

/** Reads the app targets, asset catalog colours and sources of a detected project. */
export async function collectApp(project: Project): Promise<AppModel> {
  const notes = [...project.notes];
  const targets: AppTarget[] = [];
  let appNotChecked = false;
  for (const path of project.xcodeProjects) {
    let xcode: XcodeProject;
    try {
      xcode = await readXcodeProject(path, project.root);
    } catch (error) {
      notes.push(
        `${shownPath(path, project.root)}: ${(error as Error).message} ${PROJECT_NOT_CHECKED}`,
      );
      appNotChecked = true;
      continue;
    }
    const text = await readProjectText(join(path, 'project.pbxproj'), project.root);
    for (const target of iosAppTargets(xcode)) {
      targets.push(await readTarget(xcode, target, project.root, text, notes));
    }
  }
  if (project.iosDir && project.xcodeProjects.length > 0 && targets.length === 0) {
    notes.push('No iOS app target was found in the Xcode project.');
    appNotChecked = true;
  }
  const sources = await readSources(sourceRoots(project), project.root);
  notes.push(...sources.notes);
  const colors = project.iosDir ? await readColorAssets(project.iosDir, project.root) : null;
  if (colors) notes.push(...colors.notes);
  return {
    project,
    targets,
    sources: sources.files,
    colors: colors?.colors ?? [],
    appNotChecked,
    notes,
  };
}
