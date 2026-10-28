import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { EXTENSIONS } from '../../src/collect/sources.js';
import { scratchDir } from '../helpers/scratch.js';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const hasJq = spawnSync('jq', ['--version']).status === 0;

describe('examples/api/label-matrix.mjs', () => {
  it('imports the built package by name and prints a row per fixture', () => {
    const output = execFileSync(process.execPath, ['examples/api/label-matrix.mjs'], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    const rows = output.trim().split('\n').slice(1, 7);
    expect(rows.map((row) => row.split(/\s+/).slice(0, 5).join(' '))).toEqual([
      'native-swiftui-blocked review review BLOCKED BLOCKED',
      'native-swiftui-ready ok ok ok ok',
      'native-uikit review review BLOCKED ok',
      'flutter-tide review review BLOCKED review',
      'rn-088-courier review review review review',
      'expo-58-default ok ok ok ok',
    ]);
  });
});

describe.skipIf(!hasJq)('examples/shell/blocked-labels.sh', () => {
  const run = (fixture: string) =>
    execFileSync('sh', ['examples/shell/blocked-labels.sh', fixture], {
      cwd: ROOT,
      encoding: 'utf8',
    });

  it('lists each blocked label with the errors that block it', () => {
    expect(run('fixtures/native-swiftui-blocked').split('\n').filter(Boolean)).toEqual([
      "Larger Text: Pantry/PantryApp.swift:9 .dynamicTypeSize(...DynamicTypeSize.xLarge) on the app's scene: no text grows past xLarge, below 200%.",
      'Dark Interface: Pantry.xcodeproj/project.pbxproj:194 Pantry: INFOPLIST_KEY_UIUserInterfaceStyle is Light: the app ignores Dark Mode and nothing in the code turns it dark.',
    ]);
  });

  it('prints nothing when no label is blocked', () => {
    expect(run('fixtures/native-swiftui-ready')).toBe('');
  });
});

describe('examples/github-actions/a11ylabel.yml', () => {
  // The shell of the "Check the claimed accessibility labels" step, with the release tarball
  // replaced by the local build and the checked folder passed as $CHECK. GitHub runs it with
  // `bash -e`.
  const workflow = readFileSync(join(ROOT, 'examples/github-actions/a11ylabel.yml'), 'utf8');
  const block = workflow
    .split('- name: Check the claimed accessibility labels')[1]
    ?.split('\n\n')[0];
  const script = (block ?? '')
    .split('\n')
    .slice(2)
    .map((line) => line.replace(/^ {10}/, ''))
    .join('\n')
    .replace(
      /npx --yes --package=\S+ \\\n\s+a11ylabel/,
      `node ${JSON.stringify(join(ROOT, 'dist/cli/main.js'))} "$CHECK"`,
    );

  const runStep = (check: string, labels = 'larger-text,dark-interface,reduced-motion') => {
    const cwd = scratchDir('action');
    const summary = join(cwd, 'summary.md');
    const result = spawnSync('bash', ['-e', '-c', script], {
      cwd,
      encoding: 'utf8',
      env: { ...process.env, CHECK: check, GITHUB_STEP_SUMMARY: summary, LABELS: labels },
    });
    return { status: result.status, summary: readFileSync(summary, 'utf8') };
  };

  it('runs when any file a11ylabel reads changes', () => {
    const section = workflow.split('    paths:\n')[1]?.split('  workflow_dispatch:')[0] ?? '';
    const paths = [...section.matchAll(/^ {6}- '([^']+)'$/gm)].map((match) => match[1]);
    const sources = Object.keys(EXTENSIONS).map((extension) => `**/*${extension}`);
    expect(paths).toEqual(
      expect.arrayContaining([
        ...sources,
        '**/*.xcodeproj/**',
        '**/*.xcassets/**',
        '**/Info.plist',
        'package.json',
        'app.json',
        'app.config.*',
        'pubspec.yaml',
      ]),
    );
  });

  it('limits how long the job may run and names the labels in one place', () => {
    expect(workflow).toMatch(/^ {4}timeout-minutes: 10$/m);
    expect(workflow).toMatch(/^ {2}LABELS: larger-text,dark-interface,reduced-motion$/m);
  });

  it('replaces only the tarball command', () => {
    expect(script).not.toContain('npx');
    expect(script).toContain(
      '"$CHECK" --labels "$LABELS" --format markdown --output a11ylabel.md || status=$?',
    );
    expect(script).toContain('exit "$status"');
  });

  it('adds the report to the summary and fails the job when a claimed label is at risk', () => {
    const { status, summary } = runStep(join(ROOT, 'fixtures/native-swiftui-blocked'));
    expect(status).toBe(1);
    expect(summary).toMatch(/^## a11ylabel: Pantry \(native iOS\)/);
  });

  it('passes the fixed app, and an app whose problems are in labels it does not claim', () => {
    expect(runStep(join(ROOT, 'fixtures/native-swiftui-ready')).status).toBe(0);
    expect(runStep(join(ROOT, 'fixtures/native-uikit'), 'dark-interface').status).toBe(0);
  });

  it('keeps exit code 2 when a11ylabel writes no report', () => {
    const { status, summary } = runStep(scratchDir('empty'));
    expect(status).toBe(2);
    expect(summary).toBe('a11ylabel exited with 2 and wrote no report; see the step log.\n');
  });
});
