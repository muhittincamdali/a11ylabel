import { describe, expect, it } from 'vitest';
import { collectApp } from '../../src/collect/app.js';
import { sourceFile } from '../../src/collect/sources.js';
import { detectProject } from '../../src/detect/project.js';
import { checkDarkInterface, darkInCode, expoStyle } from '../../src/rules/dark-interface.js';
import { infoPlist, minimalPbxproj, tree } from '../helpers/tree.js';

async function hits(files: Record<string, string>) {
  const app = await collectApp(await detectProject(tree(files)));
  return checkDarkInterface(app).map((hit) => [hit.rule, hit.variant, hit.line, hit.message]);
}

const LIGHT = '\t<key>UIUserInterfaceStyle</key>\n\t<string>Light</string>';
const native = (plist: string, extra: Record<string, string> = {}) => ({
  'App.xcodeproj/project.pbxproj': minimalPbxproj(),
  'App/Info.plist': infoPlist(plist),
  ...extra,
});

describe('Info.plist and build settings', () => {
  it('reports UIUserInterfaceStyle Light as the whole app', async () => {
    expect(await hits(native(LIGHT))).toEqual([
      [
        'A11Y201',
        'info-plist',
        7,
        'App: UIUserInterfaceStyle is Light: the app ignores Dark Mode and nothing in the code turns it dark.',
      ],
    ]);
  });

  it('turns it into a note when the code switches to dark', async () => {
    const settings = `import UIKit
func apply(dark: Bool) { window?.overrideUserInterfaceStyle = dark ? .dark : .light }
func forceDark() { window?.overrideUserInterfaceStyle = .dark }
`;
    expect(await hits(native(LIGHT, { 'App/Settings.swift': settings }))).toEqual([
      [
        'A11Y202',
        'info-plist',
        7,
        'App: UIUserInterfaceStyle is Light, but App/Settings.swift switches to a dark appearance: check that the setting keeps every common task dark.',
      ],
    ]);
  });

  it('reports the INFOPLIST_KEY build setting', async () => {
    const pbxproj = minimalPbxproj().replace(
      'INFOPLIST_FILE = "App/Info.plist";',
      'INFOPLIST_FILE = "App/Info.plist"; INFOPLIST_KEY_UIUserInterfaceStyle = Light;',
    );
    const found = await hits({
      'App.xcodeproj/project.pbxproj': pbxproj,
      'App/Info.plist': infoPlist(),
    });
    expect(found.map(([rule, variant, line]) => [rule, variant, line])).toEqual([
      ['A11Y201', 'build-setting', 10],
    ]);
  });

  it('accepts Automatic and Dark, and a dark app needs no dark asset colours', async () => {
    const dark = '\t<key>UIUserInterfaceStyle</key>\n\t<string>Dark</string>';
    const colorset = JSON.stringify({
      colors: [
        { color: { 'color-space': 'srgb', components: { red: '0.1' } }, idiom: 'universal' },
      ],
    });
    expect(
      await hits(native(dark, { 'App/Assets.xcassets/Night.colorset/Contents.json': colorset })),
    ).toEqual([]);
    expect(
      await hits(native('\t<key>UIUserInterfaceStyle</key>\n\t<string>Automatic</string>')),
    ).toEqual([]);
  });

  it('counts asset colours without a dark variant', async () => {
    const plain = JSON.stringify({
      colors: [
        { color: { 'color-space': 'srgb', components: { red: '0.1' } }, idiom: 'universal' },
      ],
    });
    const system = JSON.stringify({
      colors: [{ color: { platform: 'ios', reference: 'labelColor' }, idiom: 'universal' }],
    });
    const found = await hits(
      native('', {
        'App/Assets.xcassets/Brand.colorset/Contents.json': plain,
        'App/Assets.xcassets/Card.colorset/Contents.json': plain,
        'App/Assets.xcassets/Text.colorset/Contents.json': system,
      }),
    );
    expect(found).toEqual([
      ['A11Y205', 'asset-catalog', null, '2 of 2 asset colours have no dark variant: Brand, Card.'],
    ]);
  });
});

describe('Expo config', () => {
  it('reads userInterfaceStyle, with ios winning', () => {
    const config = (json: Record<string, unknown>) => ({ file: 'app.json', text: '', json });
    expect(expoStyle(config({ userInterfaceStyle: 'automatic' }))).toBe('automatic');
    expect(
      expoStyle(config({ userInterfaceStyle: 'light', ios: { userInterfaceStyle: 'dark' } })),
    ).toBe('dark');
    expect(expoStyle(config({}))).toBeNull();
    expect(
      expoStyle({
        file: 'app.config.ts',
        text: "export default { userInterfaceStyle: 'light' }",
        json: null,
      }),
    ).toBe('light');
  });

  it('reports a missing or light userInterfaceStyle of an app without ios/', async () => {
    const pkg = JSON.stringify({ dependencies: { expo: '~58.0.0' } });
    const missing = await hits({ 'package.json': pkg, 'app.json': '{"expo":{"name":"a"}}' });
    expect(missing).toEqual([
      [
        'A11Y201',
        'expo-config',
        null,
        'app.json does not set userInterfaceStyle, so Expo uses light: the app ignores Dark Mode and nothing in the code turns it dark.',
      ],
    ]);
    const light = await hits({
      'package.json': pkg,
      'app.json': '{\n  "expo": {\n    "userInterfaceStyle": "light"\n  }\n}\n',
    });
    expect(light.map(([rule, , line]) => [rule, line])).toEqual([['A11Y201', 3]]);
    const automatic = await hits({
      'package.json': pkg,
      'app.json': '{"expo":{"userInterfaceStyle":"automatic"}}',
    });
    expect(automatic).toEqual([]);
  });
});

describe('code', () => {
  it('finds light set in code, and leaves it alone when the app also sets dark', async () => {
    const view = `import SwiftUI
struct Root: View {
    var body: some View { Home().preferredColorScheme(.light) }
}
`;
    const found = await hits(native('', { 'App/Root.swift': view }));
    expect(found.map(([rule, variant, line]) => [rule, variant, line])).toEqual([
      ['A11Y203', 'swiftui', 3],
    ]);
    const toggle = `${view}struct Night: View { var body: some View { Home().preferredColorScheme(.dark) } }\n`;
    expect(await hits(native('', { 'App/Root.swift': toggle }))).toEqual([]);
  });

  it('sees React Native and Flutter forcing light', async () => {
    const rn = sourceFile('/a/App.tsx', "Appearance.setColorScheme('light');");
    const flutter = sourceFile(
      '/a/lib/main.dart',
      'MaterialApp(themeMode: ThemeMode.light, darkTheme: d)',
    );
    const app = {
      project: { root: '/a', expoConfig: null },
      targets: [],
      sources: [rn, flutter],
      colors: [],
    } as unknown as Parameters<typeof checkDarkInterface>[0];
    expect(checkDarkInterface(app).map((hit) => [hit.rule, hit.variant])).toEqual([
      ['A11Y203', 'react-native'],
      ['A11Y203', 'flutter'],
    ]);
    expect(
      darkInCode([sourceFile('/a/x.tsx', "Appearance.setColorScheme('dark')")]),
    ).not.toBeNull();
  });

  it('finds a MaterialApp without a dark theme', () => {
    const files = [
      'MaterialApp(theme: ThemeData(useMaterial3: true), home: Home())',
      'MaterialApp(home: Home())',
      'MaterialApp(theme: light, darkTheme: dark)',
      'MaterialApp(theme: ThemeData(brightness: Brightness.dark))',
      'MaterialApp(theme: settings.dark ? dark : light)',
      'MaterialApp.router(routerConfig: router)',
    ].map((text, index) => sourceFile(`/a/lib/m${index}.dart`, text));
    const app = {
      project: { root: '/a', expoConfig: null },
      targets: [],
      sources: files,
      colors: [],
    } as unknown as Parameters<typeof checkDarkInterface>[0];
    expect(checkDarkInterface(app).map((hit) => [hit.rule, hit.file, hit.message])).toEqual([
      [
        'A11Y204',
        '/a/lib/m0.dart',
        'MaterialApp has no darkTheme, so it shows its light theme in Dark Mode too.',
      ],
      [
        'A11Y204',
        '/a/lib/m1.dart',
        'MaterialApp has no darkTheme, so it shows its light theme in Dark Mode too.',
      ],
      [
        'A11Y204',
        '/a/lib/m5.dart',
        'MaterialApp.router has no darkTheme, so it shows its light theme in Dark Mode too.',
      ],
    ]);
  });
});
