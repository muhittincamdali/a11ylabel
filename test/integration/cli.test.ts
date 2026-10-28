import { mkdirSync, readFileSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EXIT, PACKAGE_NAME, parseLabels, RELEASE_TARBALL_URL } from '../../src/cli/run.js';
import type { Report } from '../../src/model.js';
import { VERSION } from '../../src/version.js';
import { a11ylabel } from '../helpers/cli.js';
import { CLEAN_VIEW, LIGHT, nativeApp } from '../helpers/projects.js';
import { scratchDir } from '../helpers/scratch.js';
import { infoPlist, minimalPbxproj, tree } from '../helpers/tree.js';

const LIGHT_APP = nativeApp(LIGHT, {
  'Total.swift': 'import SwiftUI\nlet t = Text("Total").font(.system(size: 17))\n',
});
const WARNING_APP = nativeApp('', {
  'Total.swift': 'import SwiftUI\nlet t = Text("Total").font(.system(size: 17))\n',
});
const CLEAN_APP = nativeApp('', { 'CleanApp.swift': CLEAN_VIEW });
const json = async (args: string[]) => JSON.parse((await a11ylabel(args)).stdout) as Report;

describe('exit codes', () => {
  it('is 1 for findings at or above --fail-on (default warning) and 0 below it', async () => {
    expect((await a11ylabel([LIGHT_APP])).code).toBe(EXIT.findings);
    expect((await a11ylabel([WARNING_APP])).code).toBe(EXIT.findings);
    expect((await a11ylabel([WARNING_APP, '--fail-on', 'error'])).code).toBe(EXIT.ok);
    expect((await a11ylabel([LIGHT_APP, '--fail-on', 'error'])).code).toBe(EXIT.findings);
    expect((await a11ylabel([LIGHT_APP, '--fail-on', 'none'])).code).toBe(EXIT.ok);
    expect((await a11ylabel([CLEAN_APP, '--fail-on', 'info'])).code).toBe(EXIT.ok);
  });

  it('checks only the labels named with --labels', async () => {
    const report = await json([LIGHT_APP, '--json', '--labels', 'larger-text,voiceover']);
    expect(report.scope).toEqual(['voiceover', 'larger-text']);
    expect(report.labels.map((label) => [label.id, label.status])).toEqual([
      ['voiceover', 'no-blocker'],
      ['larger-text', 'review'],
    ]);
    expect(report.findings.map((item) => item.rule)).toEqual(['A11Y104']);
    expect((await a11ylabel([LIGHT_APP, '--labels', 'dark-interface'])).code).toBe(EXIT.findings);
    expect((await a11ylabel([LIGHT_APP, '--labels', 'voiceover'])).code).toBe(EXIT.ok);
  });

  it('rejects an unknown label with exit code 2', async () => {
    const result = await a11ylabel([CLEAN_APP, '--labels', 'larger-text,haptics']);
    expect(result.code).toBe(EXIT.error);
    expect(result.stderr).toContain('unknown label haptics');
    expect(() => parseLabels(' , ')).toThrow(/no label/);
    expect(parseLabels('captions, captions')).toEqual(['captions']);
  });

  describe('when the Info.plist that decides Dark Interface is not read', () => {
    const PBXPROJ = minimalPbxproj();
    const conflict = tree({
      'App.xcodeproj/project.pbxproj': PBXPROJ,
      'App/Info.plist': infoPlist('<<<<<<< HEAD\n<key>A</key><string>b</string>'),
    });
    const outside = tree({ 'Info.plist': infoPlist(LIGHT) });
    const linked = tree({ 'App.xcodeproj/project.pbxproj': PBXPROJ });
    mkdirSync(join(linked, 'App'));
    symlinkSync(join(outside, 'Info.plist'), join(linked, 'App', 'Info.plist'));

    it.each([
      ['an Info.plist with a conflict marker', conflict],
      ['an Info.plist linked outside the project', linked],
    ])('says Dark Interface is not known and fails for %s', async (_, root) => {
      const result = await a11ylabel([root, '--json']);
      const report = JSON.parse(result.stdout) as Report;
      expect(report.labels.find((label) => label.id === 'dark-interface')?.status).toBe(
        'not-known',
      );
      expect(report.verdict.code).toBe('not-known');
      expect(report.verdict.text).toMatch(/^Not known for Dark Interface: /);
      expect(result.code).toBe(EXIT.findings);
      expect((await a11ylabel([root, '--fail-on', 'none'])).code).toBe(EXIT.ok);
    });
  });

  it('is 2 for a bad option, a missing folder or a folder without an iOS app', async () => {
    const bad = await a11ylabel([CLEAN_APP, '--format', 'xml']);
    expect(bad.code).toBe(EXIT.error);
    expect(bad.stderr).toContain("argument 'xml' is invalid");
    const missing = await a11ylabel(['does/not/exist']);
    expect(missing.code).toBe(EXIT.error);
    expect(missing.stderr).toMatch(/^a11ylabel: \/.*does\/not\/exist does not exist\.\n$/);
    const empty = await a11ylabel([tree({ 'README.md': '' })]);
    expect(empty.code).toBe(EXIT.error);
    expect(empty.stderr).toMatch(/^a11ylabel: No iOS project found in /);
    expect(empty.stderr).not.toContain('bug');
  });
});

describe('output', () => {
  it('uses the current folder by default and names it as given', async () => {
    const result = await a11ylabel(['--json'], { cwd: CLEAN_APP });
    expect((JSON.parse(result.stdout) as Report).project.path).toBe('.');
  });

  it('--json is the JSON format', async () => {
    const short = await a11ylabel([LIGHT_APP, '--json']);
    const long = await a11ylabel([LIGHT_APP, '--format', 'json']);
    expect(short.stdout).toBe(long.stdout);
    expect(JSON.parse(short.stdout)).toMatchObject({
      schemaVersion: 0,
      tool: { name: 'a11ylabel', version: VERSION },
      verdict: { code: 'blocked' },
    });
  });

  it('writes the report to a file with --output and says so on stderr', async () => {
    const file = join(scratchDir('output'), 'accessibility.md');
    const result = await a11ylabel([LIGHT_APP, '--format', 'markdown', '--output', file]);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain(`Wrote ${file}: 1 label blocked by the code (Dark Interface)`);
    expect(readFileSync(file, 'utf8')).toContain('## a11ylabel: App (native iOS)');
  });

  it('colours a terminal unless NO_COLOR is set, and FORCE_COLOR colours a pipe', async () => {
    expect((await a11ylabel([LIGHT_APP], { tty: true })).stdout).toContain('\u001b[');
    expect(
      (await a11ylabel([LIGHT_APP], { tty: true, env: { NO_COLOR: '1' } })).stdout,
    ).not.toContain('\u001b[');
    expect((await a11ylabel([LIGHT_APP, '--no-color'], { tty: true })).stdout).not.toContain(
      '\u001b[',
    );
    expect((await a11ylabel([LIGHT_APP], { env: { FORCE_COLOR: '1' } })).stdout).toContain(
      '\u001b[',
    );
    expect((await a11ylabel([LIGHT_APP, '--format', 'text'], { tty: true })).stdout).not.toContain(
      '\u001b[',
    );
  });

  it('prints the version and a help text with the labels, exit codes and package name', async () => {
    expect((await a11ylabel(['--version'])).stdout).toBe(`${VERSION}\n`);
    const help = await a11ylabel(['--help']);
    expect(help.code).toBe(EXIT.ok);
    expect(help.stdout).toContain('Exit codes:');
    expect(help.stdout).toContain('voiceover, voice-control, larger-text, dark-interface');
    expect(help.stdout).toContain(`npx ${PACKAGE_NAME}`);
    expect(help.stdout).toContain(RELEASE_TARBALL_URL);
    expect(help.stdout).toContain('--labels <ids>');
  });

  it('never prints a file name of the checked project raw', async () => {
    const root = nativeApp(LIGHT, {
      'Bad\u001b[31mName.swift': 'import SwiftUI\nlet f = Font.system(size: 9)\n',
    });
    const result = await a11ylabel([root, '--format', 'text']);
    expect(result.stdout).not.toContain('\u001b');
    expect(result.stdout).toContain('Bad�[31mName.swift');
  });
});
