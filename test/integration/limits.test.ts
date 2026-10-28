// A project whose sources hold a finding on every line: the report must stay a few MB at most in
// every format, list what the limits allow and still count everything.
import { beforeAll, describe, expect, it } from 'vitest';
import type { Report } from '../../src/model.js';
import { FORMATS, render } from '../../src/report/index.js';
import { HIT_LIMITS } from '../../src/rules/limit.js';
import { scan } from '../../src/scan.js';
import { a11ylabel } from '../helpers/cli.js';
import { LIGHT, nativeApp } from '../helpers/projects.js';

const LINES = 5_000;
// More files than perRule / perFile, so the project limit is reached too.
const FILES = 6;
// Each line holds two findings: endless motion (A11Y301) and a fixed font size (A11Y104).
const HOSTILE = `import SwiftUI\n${'let a = x.repeatForever(); let f = Font.system(size: 9)\n'.repeat(LINES)}`;
const MAX_OUTPUT = 4_000_000;

const project = () =>
  nativeApp(
    LIGHT,
    Object.fromEntries(
      Array.from({ length: FILES }, (_, index) => [`View${index}.swift`, HOSTILE]),
    ),
  );

describe('a report of a project with a finding on every line', () => {
  let report: Report;
  let root: string;

  beforeAll(async () => {
    root = project();
    report = await scan(root);
  });

  it('lists findings within the limits and counts the rest', () => {
    const perRule = new Map<string, number>();
    const perFile = new Map<string, number>();
    for (const item of report.findings) {
      perRule.set(item.rule, (perRule.get(item.rule) ?? 0) + 1);
      perFile.set(`${item.rule} ${item.file}`, (perFile.get(`${item.rule} ${item.file}`) ?? 0) + 1);
    }
    expect(Math.max(...perRule.values())).toBe(HIT_LIMITS.perRule);
    expect(Math.max(...perFile.values())).toBe(HIT_LIMITS.perFile);
    const motion = report.labels.find((label) => label.id === 'reduced-motion');
    expect(motion?.status).toBe('review');
    expect(motion?.counts.warnings).toBe(LINES * FILES);
    const { errors, warnings, info } = report.summary;
    expect(errors + warnings + info).toBeGreaterThanOrEqual(2 * LINES * FILES);
    expect(report.notes.join('\n')).toMatch(
      /^\d+ more findings are not listed \(A11Y104: \d+, A11Y301: \d+\): a report lists at most 20 findings of a rule per file and 100 per project\. The counts include them\.$/m,
    );
  });

  it.each(FORMATS)('renders a bounded %s report', (format) => {
    const output = render(report, format, { color: format === 'tty', width: 100 });
    expect(output.length).toBeLessThan(MAX_OUTPUT);
    if (format === 'json') {
      expect((JSON.parse(output) as Report).findings).toHaveLength(report.findings.length);
    }
  });

  it('exits with findings, not an error, in every format from the command line', async () => {
    for (const format of FORMATS) {
      const result = await a11ylabel([root, '--format', format], { tty: format === 'tty' });
      expect(result.code, `${format}: ${result.stderr}`).toBe(1);
      expect(result.stdout.length).toBeLessThan(MAX_OUTPUT);
      expect(result.stdout).toContain('more findings are not listed');
    }
  });
});
