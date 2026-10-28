// The source files of an app that the rules read: Swift and Objective-C under the iOS folder,
// JavaScript and TypeScript of a React Native or Expo app, Dart under a Flutter app's lib/. Each
// file is kept as written and with its comments and string contents blanked out.
import { readdir, realpath } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';
import { isInside, megabytes, NOT_READ, readProjectFile } from '../core/files.js';
import { lineIndex } from '../core/lines.js';
import { blankCommentsAndStrings } from './blank.js';

export { blankCommentsAndStrings } from './blank.js';

export type Language = 'swift' | 'objc' | 'js' | 'dart';

export interface SourceFile {
  path: string;
  language: Language;
  /** The file as written. */
  text: string;
  /** The same text with comments and string contents replaced by spaces; offsets and lines match. */
  code: string;
  /** 1-based line of an offset. */
  lineAt(offset: number): number;
}

export const EXTENSIONS: Readonly<Record<string, Language>> = {
  '.swift': 'swift',
  '.m': 'objc',
  '.mm': 'objc',
  '.h': 'objc',
  '.js': 'js',
  '.jsx': 'js',
  '.ts': 'js',
  '.tsx': 'js',
  '.mjs': 'js',
  '.cjs': 'js',
  '.dart': 'dart',
};

/** Folders that hold dependencies, build output, tests or other platforms. */
const SKIPPED =
  /^(Pods|node_modules|build|DerivedData|\.build|Carthage|\.git|\.symlinks|\.expo|\.dart_tool|Flutter|android|web|windows|linux|macos|ios|.*Tests|__tests__|test|tests|e2e|.*\.xcodeproj|.*\.xcworkspace|.*\.xcassets|.*\.framework|.*\.xcframework)$/;

/** Files that are not app code: type declarations, tests, web-only variants and configs. */
const SKIPPED_FILES = /(\.d\.ts|\.(test|spec)\.[jt]sx?|\.web\.[jt]sx?|\.config\.[cm]?[jt]s)$/;

const MAX_DEPTH = 12;

/**
 * Every file with one of `languages` under `folder`, skipping dependencies, builds, tests and the
 * other platforms' folders. `folder` itself may be one of those names (for example ios/).
 */
export async function listSourceFiles(
  folder: string,
  languages: ReadonlySet<Language>,
): Promise<string[]> {
  const found: string[] = [];
  const walk = async (dir: string, depth: number) => {
    if (depth > MAX_DEPTH) return;
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!SKIPPED.test(entry.name)) await walk(join(dir, entry.name), depth + 1);
        continue;
      }
      const language = EXTENSIONS[extname(entry.name)];
      if (
        entry.isFile() &&
        language &&
        languages.has(language) &&
        !SKIPPED_FILES.test(entry.name)
      ) {
        found.push(join(dir, entry.name));
      }
    }
  };
  await walk(folder, 0);
  return found.sort();
}

export function sourceFile(path: string, text: string): SourceFile {
  const language = EXTENSIONS[extname(path)] ?? 'swift';
  return {
    path,
    language,
    text,
    code: blankCommentsAndStrings(text, language),
    lineAt: lineIndex(text),
  };
}

/** Where to look for sources, and in which languages. */
export interface SourceRoot {
  folder: string;
  languages: ReadonlySet<Language>;
}

/**
 * How much source a11ylabel reads. Sources can come from a pull request; a large app has a few
 * thousand files of a few hundred KB at most, and every file is held twice (as written and
 * blanked) while the rules run.
 */
export interface SourceLimits {
  fileBytes: number;
  files: number;
  totalBytes: number;
}

export const SOURCE_LIMITS: Readonly<SourceLimits> = {
  /** A file larger than this is generated or not app code; it is skipped with a note. */
  fileBytes: 4_000_000,
  files: 20_000,
  totalBytes: 128_000_000,
};

/** Files read at the same time. */
const READ_BATCH = 32;
/** File names a note lists before it only counts the rest. */
const NAMED_IN_NOTE = 3;

export interface SourceSet {
  files: SourceFile[];
  /** Files that were not read because of SOURCE_LIMITS, for the report. */
  notes: string[];
}

/** "Source files not read (why): a, b, c and 4 more." */
function skippedNote(paths: string[], why: string): string {
  const named = paths.slice(0, NAMED_IN_NOTE).join(', ');
  const rest = paths.length - NAMED_IN_NOTE;
  return `Source files not read (${why}): ${named}${rest > 0 ? ` and ${rest} more` : ''}.`;
}

interface ReadResult {
  files: SourceFile[];
  tooLarge: string[];
  overBudget: string[];
}

/**
 * Reads `paths` in order, skipping files outside `root` (when given) or over the per-file limit
 * and stopping at the total.
 */
async function readWithin(
  paths: string[],
  root: string | null,
  limits: Readonly<SourceLimits>,
): Promise<ReadResult> {
  const result: ReadResult = { files: [], tooLarge: [], overBudget: [] };
  let total = 0;
  for (let start = 0; start < paths.length; start += READ_BATCH) {
    const batch = paths.slice(start, start + READ_BATCH);
    const reads = await Promise.all(
      batch.map((path) => readProjectFile(path, root, limits.fileBytes)),
    );
    reads.forEach((read, index) => {
      const path = batch[index] ?? '';
      if (!read.found) {
        if (read.reason === 'too-large') result.tooLarge.push(path);
      } else if (total + read.bytes.length > limits.totalBytes) {
        result.overBudget.push(path);
      } else {
        total += read.bytes.length;
        result.files.push(sourceFile(path, read.bytes.toString('utf8')));
      }
    });
  }
  return result;
}

/**
 * The roots whose folder, with symbolic links resolved, is inside `project`. A folder such as
 * lib/ can be a link out of the project; its files are not what the user asked to check.
 */
async function rootsInside(
  roots: readonly SourceRoot[],
  project: string,
): Promise<{ inside: SourceRoot[]; outside: string[] }> {
  const real = await realpath(project).catch(() => project);
  const inside: SourceRoot[] = [];
  const outside: string[] = [];
  for (const root of roots) {
    const folder = await realpath(root.folder).catch(() => null);
    if (folder === null) continue;
    if (isInside(folder, real)) inside.push(root);
    else outside.push(root.folder);
  }
  return { inside, outside };
}

/**
 * Reads every source file under the given roots, each file once, sorted by path, within `limits`.
 * With `project`, only files inside that folder (after symbolic links) are read, and notes name
 * paths relative to it. What is left out is listed in `notes`.
 */
export async function readSources(
  roots: readonly SourceRoot[],
  project?: string,
  limits: Readonly<SourceLimits> = SOURCE_LIMITS,
): Promise<SourceSet> {
  const shown = (paths: string[]) =>
    project === undefined
      ? paths
      : paths.map((path) => relative(project, path).split(sep).join('/'));
  const notes: string[] = [];
  let readable = roots;
  if (project !== undefined) {
    const { inside, outside } = await rootsInside(roots, project);
    readable = inside;
    for (const folder of shown(outside)) notes.push(`${folder} ${NOT_READ.outside}`);
  }
  const lists = await Promise.all(
    readable.map((root) => listSourceFiles(root.folder, root.languages)),
  );
  const paths = [...new Set(lists.flat())].sort();
  if (paths.length > limits.files) {
    notes.push(
      `The project has ${paths.length} source files; a11ylabel read the first ${limits.files} by path.`,
    );
  }
  const { files, tooLarge, overBudget } = await readWithin(
    paths.slice(0, limits.files),
    project ?? null,
    limits,
  );
  if (tooLarge.length > 0) {
    notes.push(skippedNote(shown(tooLarge), `larger than ${megabytes(limits.fileBytes)} each`));
  }
  if (overBudget.length > 0) {
    notes.push(
      skippedNote(shown(overBudget), `after the first ${megabytes(limits.totalBytes)} of source`),
    );
  }
  return { files, notes };
}
