// Source files as large as a11ylabel reads (just under SOURCE_LIMITS.fileBytes) can hold more hits,
// or more call arguments, than the call stack holds arguments: a check that spreads a list into
// push() throws "Maximum call stack size exceeded" and the scan ends with exit code 2.
import { describe, expect, it } from 'vitest';
import { SOURCE_LIMITS } from '../../src/collect/sources.js';
import { scan } from '../../src/scan.js';
import { LIGHT, nativeApp } from '../helpers/projects.js';
import { minimalPbxproj, tree } from '../helpers/tree.js';

/** `unit` repeated to fill a file just under the size limit. */
const fill = (head: string, unit: string, tail = '') =>
  `${head}${unit.repeat(Math.floor((SOURCE_LIMITS.fileBytes - head.length - tail.length) / unit.length))}${tail}`;

const FLUTTER_PUBSPEC = 'name: tide\ndependencies:\n  flutter:\n    sdk: flutter\n';

describe('sources with more hits than the call stack holds arguments', () => {
  it('reports a Swift file with a light appearance on every line', async () => {
    const line = 'v.preferredColorScheme(.light)\n';
    const text = fill('import SwiftUI\n', line);
    const report = await scan(nativeApp(LIGHT, { 'Light.swift': text }));
    const dark = report.labels.find((label) => label.id === 'dark-interface');
    expect(dark?.status).toBe('blocked');
    expect(report.findings.filter((item) => item.rule === 'A11Y203')).toHaveLength(20);
    expect(report.notes.join('\n')).toMatch(/A11Y203: \d{6}/);
  });

  it('reads a MaterialApp call with more builder arguments than the stack holds', async () => {
    const text = fill(
      'void f() { MaterialApp(',
      'builder: a, ',
      ');\n}\nvar s = TextScaler.noScaling;\n',
    );
    const report = await scan(
      tree({
        'pubspec.yaml': FLUTTER_PUBSPEC,
        'lib/main.dart': text,
        'ios/Runner.xcodeproj/project.pbxproj': minimalPbxproj('Runner'),
      }),
    );
    const rules = new Set(report.findings.map((item) => item.rule));
    expect(rules).toContain('A11Y102');
    expect(rules).toContain('A11Y204');
  });
});
