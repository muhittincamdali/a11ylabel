import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CLEAN_VIEW, LIGHT, nativeApp } from '../helpers/projects.js';
import { tree } from '../helpers/tree.js';

// The compiled entry point, as the installed `a11ylabel` command runs it (test/setup/build.ts
// builds it first).
const BIN = fileURLToPath(new URL('../../dist/cli/main.js', import.meta.url));

function a11ylabel(cwd: string, ...args: string[]) {
  return spawnSync(process.execPath, [BIN, ...args], {
    cwd,
    encoding: 'utf8',
    env: { PATH: process.env.PATH },
  });
}

describe('dist/cli/main.js', () => {
  it('starts with a node shebang so npx and Homebrew can run it', () => {
    expect(readFileSync(BIN, 'utf8').startsWith('#!/usr/bin/env node\n')).toBe(true);
  });

  it('prints the version from package.json', () => {
    const { version } = JSON.parse(
      readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
    ) as { version: string };
    const result = a11ylabel(process.cwd(), '--version');
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(version);
  });

  it('reads the bundled rule data and exits 1 for an app that forces a light appearance', () => {
    const result = a11ylabel(nativeApp(LIGHT), '--json');
    expect(result.status).toBe(1);
    const report = JSON.parse(result.stdout);
    expect(report.rules.ruleSet).toBe('nutrition-labels');
    expect(report.verdict.code).toBe('blocked');
  });

  it('exits 0 for an app with nothing to report', () => {
    expect(a11ylabel(nativeApp('', { 'CleanApp.swift': CLEAN_VIEW })).status).toBe(0);
  });

  it('exits 2 with a one-line message for a folder without an iOS project', () => {
    const result = a11ylabel(tree({ 'notes.txt': 'x' }));
    expect(result.status).toBe(2);
    expect(result.stdout).toBe('');
    expect(result.stderr.trim().split('\n')).toHaveLength(1);
  });
});
