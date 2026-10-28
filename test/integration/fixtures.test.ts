import { describe, expect, it } from 'vitest';
import type { LabelId } from '../../src/rules/data.js';
import type { Report, VerdictCode } from '../../src/model.js';
import { a11ylabel } from '../helpers/cli.js';

interface Expected {
  verdict: VerdictCode;
  exitCode: number;
  /** rule, file:line (or file), fix id. */
  findings: string[];
  blocked: LabelId[];
  review: LabelId[];
}

const EXPECTED: Record<string, Expected> = {
  'native-swiftui-blocked': {
    verdict: 'blocked',
    exitCode: 1,
    findings: [
      'A11Y101 Pantry/PantryApp.swift:9 A11Y101/swiftui',
      'A11Y201 Pantry.xcodeproj/project.pbxproj:194 A11Y201/build-setting',
      'A11Y104 Pantry/PantryListView.swift:25 A11Y104/swiftui',
      'A11Y104 Pantry/PantryListView.swift:28 A11Y104/swiftui',
      'A11Y104 Pantry/RecipeView.swift:15 A11Y104/swiftui',
      'A11Y301 Pantry/PantryListView.swift:48 A11Y301/swiftui',
      'A11Y401 Pantry/PantryListView.swift:58 A11Y401/swiftui',
      'A11Y401 Pantry/PantryListView.swift:63 A11Y401/swiftui',
      'A11Y205 Pantry/Assets.xcassets/Brand.colorset/Contents.json A11Y205/asset-catalog',
      'A11Y402 Pantry/PantryListView.swift:38 A11Y402/swiftui',
      'A11Y501 Pantry/Assets.xcassets/Brand.colorset/Contents.json A11Y501/asset-catalog',
      'A11Y601 Pantry/RecipeView.swift:10 A11Y601/swiftui',
    ],
    blocked: ['larger-text', 'dark-interface'],
    review: ['voiceover', 'voice-control', 'reduced-motion'],
  },
  'native-swiftui-ready': {
    verdict: 'no-blockers',
    exitCode: 0,
    findings: ['A11Y601 Pantry/RecipeView.swift:10 A11Y601/swiftui'],
    blocked: [],
    review: [],
  },
  'native-uikit': {
    verdict: 'blocked',
    exitCode: 1,
    findings: [
      'A11Y101 Ledger/SceneDelegate.swift:15 A11Y101/uikit',
      'A11Y102 Ledger/BalanceViewController.swift:20 A11Y102/uikit',
      'A11Y104 Ledger/BalanceViewController.swift:19 A11Y104/uikit',
      'A11Y301 Ledger/BalanceViewController.swift:28 A11Y301/uikit',
      'A11Y401 Ledger/BalanceViewController.swift:22 A11Y401/uikit',
      'A11Y401 Ledger/BalanceViewController.swift:50 A11Y401/uikit',
      'A11Y202 Ledger/Info.plist:48 A11Y202/info-plist',
      'A11Y402 Ledger/BalanceViewController.swift:64 A11Y402/uikit',
      'A11Y601 Ledger/TutorialViewController.swift:9 A11Y601/uikit',
    ],
    blocked: ['larger-text'],
    review: ['voiceover', 'voice-control', 'reduced-motion'],
  },
  'flutter-tide': {
    verdict: 'blocked',
    exitCode: 1,
    findings: [
      'A11Y101 lib/main.dart:16 A11Y101/flutter',
      'A11Y102 lib/main.dart:86 A11Y102/flutter',
      'A11Y204 lib/main.dart:10 A11Y204/flutter',
      'A11Y301 lib/main.dart:50 A11Y301/flutter',
      'A11Y303 lib/main.dart:60 A11Y303/flutter',
      'A11Y401 lib/main.dart:65 A11Y401/flutter',
      'A11Y401 lib/main.dart:90 A11Y401/flutter',
    ],
    blocked: ['larger-text'],
    review: ['voiceover', 'voice-control', 'dark-interface', 'reduced-motion'],
  },
  'rn-088-courier': {
    verdict: 'review',
    exitCode: 1,
    findings: [
      'A11Y102 App.tsx:63 A11Y102/react-native',
      'A11Y103 App.tsx:48 A11Y103/react-native',
      'A11Y203 App.tsx:22 A11Y203/react-native',
      'A11Y301 App.tsx:35 A11Y301/react-native',
      'A11Y401 App.tsx:52 A11Y401/react-native',
      'A11Y402 App.tsx:66 A11Y402/react-native',
    ],
    blocked: [],
    review: ['voiceover', 'voice-control', 'larger-text', 'dark-interface', 'reduced-motion'],
  },
  'expo-58-no-style': {
    verdict: 'blocked',
    exitCode: 1,
    findings: ['A11Y201 app.json A11Y201/expo-config'],
    blocked: ['dark-interface'],
    review: [],
  },
  'expo-58-default': {
    verdict: 'no-blockers',
    exitCode: 0,
    findings: [],
    blocked: [],
    review: [],
  },
};

const summarize = (report: Report) =>
  report.findings.map((item) =>
    [item.rule, `${item.file}${item.line ? `:${item.line}` : ''}`, item.fix?.id].join(' '),
  );

describe.each(Object.entries(EXPECTED))('fixtures/%s', (name, expected) => {
  const path = `fixtures/${name}`;

  it('has the expected findings, label statuses, verdict and exit code', async () => {
    const { code, stdout } = await a11ylabel([path, '--json']);
    const report = JSON.parse(stdout) as Report;
    expect(summarize(report)).toEqual(expected.findings);
    const withStatus = (status: string) =>
      report.labels.filter((label) => label.status === status).map((label) => label.id);
    expect(withStatus('blocked')).toEqual(expected.blocked);
    expect(withStatus('review')).toEqual(expected.review);
    expect(report.verdict.code).toBe(expected.verdict);
    expect(code).toBe(expected.exitCode);
  });

  it.each(['text', 'markdown', 'json'] as const)(
    'matches the recorded %s report',
    async (format) => {
      const extension = { text: 'txt', markdown: 'md', json: 'json' }[format];
      const { stdout } = await a11ylabel([path, '--format', format]);
      await expect(stdout).toMatchFileSnapshot(`../__snapshots__/fixtures/${name}.${extension}`);
    },
  );
});

it('covers native UIKit and SwiftUI, Flutter, React Native and Expo, blocked and clear', () => {
  const names = Object.keys(EXPECTED);
  for (const prefix of ['native-uikit', 'native-swiftui', 'flutter', 'rn-', 'expo-']) {
    expect(
      names.some((name) => name.startsWith(prefix)),
      prefix,
    ).toBe(true);
  }
  const verdicts = Object.values(EXPECTED).map((item) => item.verdict);
  expect(verdicts).toContain('blocked');
  expect(verdicts).toContain('review');
  expect(verdicts).toContain('no-blockers');
});

it('reads the template apps exactly as their tools wrote them', async () => {
  // The React Native app keeps Text.defaultProps from an older version; React 19 ignores it.
  const report = JSON.parse(
    (await a11ylabel(['fixtures/rn-088-courier', '--json'])).stdout,
  ) as Report;
  expect(report.findings.some((item) => item.file === 'index.js')).toBe(false);
  expect(report.project.versions).toEqual([
    { name: 'react-native', version: '0.88.1', source: 'declared' },
  ]);
});
