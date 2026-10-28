// Named colours in the app's asset catalogs (*.xcassets/**/*.colorset/Contents.json). Each colour
// can have variants Xcode writes as "appearances": a dark one (luminosity: dark) that UIKit and
// SwiftUI use in Dark Mode, and a high contrast one (contrast: high) for the Increase Contrast
// setting. A colour that references a system colour adapts to both on its own.
import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { readProjectText } from '../core/files.js';
import { parseJson } from '../core/json.js';
import { record } from '../detect/packages.js';

export interface ColorAsset {
  /** Absolute path of the .colorset folder. */
  path: string;
  /** The colour's name: the folder name without .colorset. */
  name: string;
  hasDark: boolean;
  hasHighContrast: boolean;
  /** Its default value references a system colour (labelColor, systemBlueColor, …). */
  system: boolean;
}

/** Folders that never hold the app's own asset catalogs. */
const SKIPPED = new Set([
  'Pods',
  'node_modules',
  'build',
  'DerivedData',
  '.build',
  'Carthage',
  '.git',
  '.symlinks',
]);
const MAX_DEPTH = 12;
/** More colour sets than any app has; a pull request cannot make a11ylabel read without end. */
export const MAX_COLOR_SETS = 5_000;

interface Appearance {
  appearance?: unknown;
  value?: unknown;
}

const appearancesOf = (entry: Record<string, unknown>): Appearance[] =>
  Array.isArray(entry.appearances) ? (entry.appearances as unknown[]).map(record) : [];

/** Reads one colorset's Contents.json; null when it is unreadable or defines no colour. */
export function colorAsset(path: string, name: string, text: string): ColorAsset | null {
  let json: unknown;
  try {
    json = parseJson(text);
  } catch {
    return null;
  }
  const entries = (Array.isArray(record(json).colors) ? (record(json).colors as unknown[]) : [])
    .map(record)
    .filter((entry) => Object.keys(record(entry.color)).length > 0);
  if (entries.length === 0) return null;
  const has = (kind: string, value: string) =>
    entries.some((entry) =>
      appearancesOf(entry).some((item) => item.appearance === kind && item.value === value),
    );
  const base = entries.find((entry) => appearancesOf(entry).length === 0) ?? entries[0];
  const system = typeof record(base?.color).reference === 'string';
  return {
    path,
    name,
    hasDark: has('luminosity', 'dark'),
    hasHighContrast: has('contrast', 'high'),
    system,
  };
}

/** Every .colorset folder under `folder`, inside asset catalogs, up to MAX_COLOR_SETS. */
async function colorSetFolders(folder: string): Promise<{ found: string[]; truncated: boolean }> {
  const found: string[] = [];
  let truncated = false;
  const walk = async (dir: string, depth: number, inCatalog: boolean) => {
    if (depth > MAX_DEPTH || truncated) return;
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      if (!entry.isDirectory() || SKIPPED.has(entry.name)) continue;
      const path = join(dir, entry.name);
      if (inCatalog && entry.name.endsWith('.colorset')) {
        if (found.length >= MAX_COLOR_SETS) {
          truncated = true;
          return;
        }
        found.push(path);
      } else {
        await walk(path, depth + 1, inCatalog || entry.name.endsWith('.xcassets'));
      }
    }
  };
  await walk(folder, 0, folder.endsWith('.xcassets'));
  return { found, truncated };
}

/** The named colours of the asset catalogs under `iosDir`, with notes on what was left out. */
export async function readColorAssets(
  iosDir: string,
  projectRoot: string,
): Promise<{ colors: ColorAsset[]; notes: string[] }> {
  const { found, truncated } = await colorSetFolders(iosDir);
  const colors: ColorAsset[] = [];
  for (const path of found) {
    const text = await readProjectText(join(path, 'Contents.json'), projectRoot);
    if (text === null) continue;
    const name = basename(path).replace(/\.colorset$/, '');
    const color = colorAsset(path, name, text);
    if (color) colors.push(color);
  }
  const notes = truncated
    ? [
        `The asset catalogs hold more than ${MAX_COLOR_SETS} colour sets; the first ${MAX_COLOR_SETS} by path were read.`,
      ]
    : [];
  return { colors, notes };
}
