// A project file may be tens of megabytes, and so may a target name, a build setting or an
// Info.plist value in it. A 20 MB target name made the terminal and text reports overflow the call
// stack (exit code 2) and the Markdown and JSON reports 60 MB long.
import { describe, expect, it } from 'vitest';
import { PROJECT_TEXT_LIMIT } from '../../src/core/clip.js';
import { FORMATS } from '../../src/report/index.js';
import { scan } from '../../src/scan.js';
import { a11ylabel } from '../helpers/cli.js';
import { infoPlist, minimalPbxproj, tree } from '../helpers/tree.js';

const NAME = 'a '.repeat(2_000_000);
const DEPLOYMENT_TARGET = `${'1.'.repeat(500_000)}1`;
const STYLE = 'x'.repeat(1_000_000);
// The whole report of this small project is a few kilobytes once the long strings are clipped.
const MAX_OUTPUT = 20_000;

function project(): string {
  const pbxproj = minimalPbxproj(`"${NAME}"`, 'App/Info.plist').replace(
    'INFOPLIST_FILE =',
    `IPHONEOS_DEPLOYMENT_TARGET = "${DEPLOYMENT_TARGET}"; INFOPLIST_FILE =`,
  );
  return tree({
    'App.xcodeproj/project.pbxproj': pbxproj,
    'App/Info.plist': infoPlist(`\t<key>UIUserInterfaceStyle</key>\n\t<string>${STYLE}</string>`),
  });
}

describe('a project with megabytes-long names and values', () => {
  it('clips them in the report', async () => {
    const report = await scan(project());
    const [target] = report.project.targets;
    expect(target?.name).toHaveLength(PROJECT_TEXT_LIMIT);
    expect(target?.name.startsWith('a a a')).toBe(true);
    expect(target?.deploymentTarget).toHaveLength(PROJECT_TEXT_LIMIT);
    expect(target?.interfaceStyle).toHaveLength(PROJECT_TEXT_LIMIT);
  });

  it.each(FORMATS)('prints a short %s report', async (format) => {
    const root = project();
    const result = await a11ylabel([root, '--format', format]);
    expect(result.stderr).toBe('');
    expect(result.code).not.toBe(2);
    expect(result.stdout.length).toBeLessThan(MAX_OUTPUT);
    expect(result.stdout).toContain('a a a');
  });
});
