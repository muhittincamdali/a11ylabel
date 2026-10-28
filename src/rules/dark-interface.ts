// Dark Interface: A11Y201 (light forced for the whole app), A11Y202 (light by default with an
// in-app dark mode), A11Y203 (light set in code), A11Y204 (Flutter app without a dark theme) and
// A11Y205 (asset colours without a dark variant). Apple accepts an app that is dark by default,
// follows Dark Mode, or offers its own setting that keeps the interface dark.
import { join } from 'node:path';
import { type AppModel, type AppTarget, STYLE_KEY, shownPath } from '../collect/app.js';
import type { SourceFile } from '../collect/sources.js';
import { callArguments, topLevelArguments } from '../core/syntax.js';
import { record } from '../detect/packages.js';
import type { ExpoConfig } from '../detect/project.js';
import { type Hit, hitAt, matches, stringAt } from './hit.js';

/** How many asset colour names a message lists before it counts the rest. */
const NAMED = 3;

/** UIUserInterfaceStyle values as UIKit reads them (the key is case-sensitive, the value is not). */
const styleOf = (value: unknown) => (typeof value === 'string' ? value.trim().toLowerCase() : null);

/** Where the code switches the app to a dark appearance: an in-app setting or a dark-only app. */
export function darkInCode(sources: readonly SourceFile[]): SourceFile | null {
  for (const file of sources) {
    if (file.language === 'js') {
      for (const match of matches(file, /\bsetColorScheme\s*\(/g)) {
        if (
          stringAt(file, match.index + match[0].length, match.index + match[0].length + 3) ===
          'dark'
        )
          return file;
      }
      continue;
    }
    const pattern =
      file.language === 'dart'
        ? /\bThemeMode\s*\.\s*dark\b/
        : /\boverrideUserInterfaceStyle\s*=\s*(?:UIUserInterfaceStyle)?\s*\.?\s*(?:dark\b|UIUserInterfaceStyleDark\b)|\.\s*preferredColorScheme\s*\(\s*\.dark\b/;
    if (pattern.test(file.code)) return file;
  }
  return null;
}

/** Whether a target's Info.plist or build settings make the app dark by default. */
export const darkByDefault = (targets: readonly AppTarget[]) =>
  targets.some(
    (target) =>
      target.infoPlists.some((plist) => styleOf(plist.dict[STYLE_KEY]) === 'dark') ||
      styleOf(target.styleSetting?.value) === 'dark',
  );

function lightMessage(where: string, inApp: SourceFile | null, root: string): string {
  if (!inApp) return `${where}: the app ignores Dark Mode and nothing in the code turns it dark.`;
  const file = shownPath(inApp.path, root);
  return `${where}, but ${file} switches to a dark appearance: check that the setting keeps every common task dark.`;
}

function targetHits(app: AppModel, inApp: SourceFile | null): Hit[] {
  const hits: Hit[] = [];
  const rule = inApp ? 'A11Y202' : 'A11Y201';
  for (const target of app.targets) {
    for (const plist of target.infoPlists) {
      if (styleOf(plist.dict[STYLE_KEY]) !== 'light') continue;
      hits.push({
        rule,
        file: plist.path,
        line: plist.keyLines.get(STYLE_KEY) ?? null,
        message: lightMessage(
          `${target.name}: UIUserInterfaceStyle is Light`,
          inApp,
          app.project.root,
        ),
        variant: 'info-plist',
        target: target.name,
      });
    }
    const setting = target.styleSetting;
    if (setting && styleOf(setting.value) === 'light') {
      hits.push({
        rule,
        file: setting.file,
        line: setting.line,
        message: lightMessage(
          `${target.name}: INFOPLIST_KEY_UIUserInterfaceStyle is Light`,
          inApp,
          app.project.root,
        ),
        variant: inApp ? 'info-plist' : 'build-setting',
        target: target.name,
      });
    }
  }
  return hits;
}

/** The userInterfaceStyle an Expo config sets (ios.userInterfaceStyle wins), or null when none. */
export function expoStyle(config: ExpoConfig): string | null {
  if (config.json) {
    const ios = record(config.json.ios).userInterfaceStyle;
    const value = typeof ios === 'string' ? ios : config.json.userInterfaceStyle;
    return typeof value === 'string' ? value : null;
  }
  const values = [...config.text.matchAll(/\buserInterfaceStyle\s*:\s*['"`](\w+)['"`]/g)];
  return values.at(-1)?.[1] ?? null;
}

function expoHits(app: AppModel, inApp: SourceFile | null): Hit[] {
  const config = app.project.expoConfig;
  if (!config) return [];
  const style = expoStyle(config);
  // With an ios/ folder, the Info.plist decides and is checked above; a missing key in the config
  // only matters when ios/ is generated from it.
  if (style === null && app.targets.length > 0) return [];
  if (style !== null && styleOf(style) !== 'light') return [];
  const index = config.text.search(/\buserInterfaceStyle\b/);
  const line =
    style !== null && index !== -1 ? config.text.slice(0, index).split('\n').length : null;
  const where =
    style === null
      ? `${config.file} does not set userInterfaceStyle, so Expo uses light`
      : `${config.file} sets userInterfaceStyle to "${style}"`;
  return [
    {
      rule: inApp ? 'A11Y202' : 'A11Y201',
      file: join(app.project.root, config.file),
      line,
      message: lightMessage(where, inApp, app.project.root),
      variant: inApp ? 'info-plist' : 'expo-config',
    },
  ];
}

const LIGHT_IN_NATIVE =
  /\.\s*preferredColorScheme\s*\(\s*\.light\s*\)|\boverrideUserInterfaceStyle\s*=\s*(?:UIUserInterfaceStyle)?\s*\.?\s*(?:light\b|UIUserInterfaceStyleLight\b)/g;

function lightInCode(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  if (file.language === 'js') {
    for (const match of matches(file, /\bAppearance\s*\.\s*setColorScheme\s*\(/g)) {
      const end = match.index + match[0].length;
      if (stringAt(file, end, end + 3) !== 'light') continue;
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y203',
          'react-native',
          "Appearance.setColorScheme('light') keeps the whole app light, whatever the system appearance is.",
        ),
      );
    }
    return hits;
  }
  if (file.language === 'dart') {
    for (const match of matches(file, /\bthemeMode\s*:\s*ThemeMode\s*\.\s*light\b/g)) {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y203',
          'flutter',
          'themeMode: ThemeMode.light always uses the light theme, whatever the system appearance is.',
        ),
      );
    }
    return hits;
  }
  for (const match of matches(file, LIGHT_IN_NATIVE)) {
    const swiftUI = /preferredColorScheme/.test(match[0]);
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y203',
        swiftUI ? 'swiftui' : 'uikit',
        swiftUI
          ? '.preferredColorScheme(.light) keeps this view, and the window it is in, light in Dark Mode.'
          : 'overrideUserInterfaceStyle is .light: this view and its subviews stay light in Dark Mode.',
      ),
    );
  }
  return hits;
}

function flutterWithoutDarkTheme(file: SourceFile): Hit[] {
  if (file.language !== 'dart') return [];
  const hits: Hit[] = [];
  for (const match of matches(file, /\bMaterialApp(?:\s*\.\s*router)?(?=\s*\()/g)) {
    const args = callArguments(file, match.index + match[0].length);
    if (!args) continue;
    const named = new Map(
      topLevelArguments(file, args).map((arg) => [
        arg.label,
        file.code.slice(arg.start, arg.end + 1),
      ]),
    );
    if (named.has('darkTheme')) continue;
    const theme = named.get('theme') ?? '';
    // A theme picked in code, or one that is dark itself, is not light-only.
    if (/\?|Brightness\s*\.\s*dark|ThemeData\s*\.\s*dark\b/.test(theme)) continue;
    if (/ThemeMode\s*\.\s*dark/.test(named.get('themeMode') ?? '')) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y204',
        'flutter',
        `${match[0].replace(/\s+/g, '')} has no darkTheme, so it shows its light theme in Dark Mode too.`,
      ),
    );
  }
  return hits;
}

function assetHits(app: AppModel): Hit[] {
  const missing = app.colors.filter((color) => !color.system && !color.hasDark);
  const first = missing[0];
  if (!first) return [];
  const named = missing.slice(0, NAMED).map((color) => color.name);
  const rest = missing.length - named.length;
  const total = app.colors.filter((color) => !color.system).length;
  return [
    {
      rule: 'A11Y205',
      file: join(first.path, 'Contents.json'),
      line: null,
      message: `${missing.length} of ${total} asset colours have no dark variant: ${named.join(', ')}${rest > 0 ? ` and ${rest} more` : ''}.`,
      variant: 'asset-catalog',
    },
  ];
}

/** The Dark Interface checks for a collected project. */
export function checkDarkInterface(app: AppModel): Hit[] {
  const inApp = darkInCode(app.sources);
  const hits = [...targetHits(app, inApp), ...expoHits(app, inApp)];
  // One hit at a time: push(...list) passes each hit as an argument, and a file with a trigger on
  // every line has more of them than the call stack holds.
  for (const file of inApp ? [] : app.sources) for (const hit of lightInCode(file)) hits.push(hit);
  for (const file of app.sources) for (const hit of flutterWithoutDarkTheme(file)) hits.push(hit);
  if (!darkByDefault(app.targets)) hits.push(...assetHits(app));
  return hits;
}
