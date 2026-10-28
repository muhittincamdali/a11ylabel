import { describe, expect, it } from 'vitest';
import type { Finding, LabelSummary, Report } from '../../src/model.js';
import { render } from '../../src/report/index.js';
import { clean, countText, wrap } from '../../src/report/text.js';
import { LABEL_IDS, labelById, RULE_DATA } from '../../src/rules/data.js';
import { labelStatus, scan, verdictOf } from '../../src/scan.js';
import { CLEAN_VIEW, LIGHT, nativeApp } from '../helpers/projects.js';

const finding = (overrides: Partial<Finding>): Finding => ({
  rule: 'A11Y102',
  labels: ['larger-text'],
  severity: 'warning',
  title: 'Text that does not scale',
  message: 'allowFontScaling is false.',
  file: 'App.tsx',
  line: 3,
  target: null,
  fix: {
    id: 'A11Y102/react-native',
    title: 'Let this text scale',
    steps: ['Remove allowFontScaling={false}.'],
    guide: 'https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md',
  },
  sources: [{ title: 'Text', url: 'https://reactnative.dev/docs/text' }],
  ...overrides,
});

const summary = (id: (typeof LABEL_IDS)[number], status: LabelSummary['status']): LabelSummary => {
  const label = labelById(id);
  return {
    id,
    name: label.name,
    status,
    coverage: label.coverage,
    criteria: label.criteria,
    counts: { errors: 0, warnings: 0, info: 0 },
    signals: [],
    checked: label.checked,
    manual: label.manual,
  };
};

function report(findings: Finding[], overrides: Partial<Report> = {}): Report {
  const labels = LABEL_IDS.map((id) => {
    const own = findings.filter((item) => item.labels.includes(id));
    const counted = (severity: Finding['severity']) =>
      own.filter((item) => item.severity === severity).length;
    return {
      ...summary(id, labelStatus(id, findings)),
      counts: { errors: counted('error'), warnings: counted('warning'), info: counted('info') },
    };
  });
  return {
    schemaVersion: 0,
    tool: { name: 'a11ylabel', version: '0.0.0' },
    rules: {
      ruleSet: 'nutrition-labels',
      dataVersion: RULE_DATA.dataVersion,
      read: RULE_DATA.read,
    },
    project: { path: 'app', name: 'Atlas', ecosystem: 'react-native', versions: [], targets: [] },
    scope: [...LABEL_IDS],
    verdict: verdictOf(labels),
    labels,
    findings,
    notes: [],
    summary: { errors: 0, warnings: findings.length, info: 0 },
    ...overrides,
  };
}

describe('labelStatus and verdictOf', () => {
  it('reads errors as blocked, warnings as review and info as no blocker', () => {
    const findings = [
      finding({ rule: 'A11Y201', labels: ['dark-interface'], severity: 'error' }),
      finding({}),
      finding({ rule: 'A11Y302', labels: ['reduced-motion'], severity: 'info' }),
      finding({ rule: 'A11Y601', labels: ['captions', 'audio-descriptions'], severity: 'info' }),
    ];
    expect(LABEL_IDS.map((id) => [id, labelStatus(id, findings)])).toEqual([
      ['voiceover', 'no-blocker'],
      ['voice-control', 'no-blocker'],
      ['larger-text', 'review'],
      ['dark-interface', 'blocked'],
      ['differentiate-without-color', 'manual'],
      ['sufficient-contrast', 'manual'],
      ['reduced-motion', 'no-blocker'],
      ['captions', 'manual'],
      ['audio-descriptions', 'manual'],
    ]);
    expect(labelStatus('dark-interface', [], new Set(['dark-interface']))).toBe('not-known');
  });

  it('words the verdict by the most serious status', () => {
    const of = (statuses: [(typeof LABEL_IDS)[number], LabelSummary['status']][]) =>
      verdictOf(statuses.map(([id, status]) => summary(id, status)));
    expect(
      of([
        ['larger-text', 'blocked'],
        ['dark-interface', 'blocked'],
        ['voiceover', 'review'],
        ['reduced-motion', 'no-blocker'],
      ]),
    ).toEqual({
      code: 'blocked',
      text: '2 labels blocked by the code (Larger Text, Dark Interface); 1 to review, no blocker found for 1',
    });
    expect(
      of([
        ['voiceover', 'review'],
        ['voice-control', 'review'],
      ]),
    ).toEqual({
      code: 'review',
      text: 'No label blocked; 2 labels to review (VoiceOver, Voice Control)',
    });
    expect(
      of([
        ['larger-text', 'no-blocker'],
        ['captions', 'manual'],
      ]),
    ).toEqual({
      code: 'no-blockers',
      text: 'No blockers found in the code for Larger Text; 1 more to check by hand',
    });
    expect(of([['dark-interface', 'not-known']]).code).toBe('not-known');
  });
});

describe('render', () => {
  it('prints the label table, findings, lettered fixes and the reminder in tty and text', () => {
    const text = render(report([finding({}), finding({ line: 9 })]), 'text');
    expect(text).toContain('Larger Text                        review            2 warnings');
    expect(text).toContain('Differentiate Without Color Alone  check by hand');
    expect(text).toContain('WARNING  A11Y102 Text that does not scale · Larger Text');
    expect(text.match(/Fix: \[A\] Let this text scale/g)).toHaveLength(2);
    expect(text.match(/^\[A\]/gm)).toHaveLength(1);
    expect(text).toContain('Apple asks that people can complete every common task');
    expect(render(report([finding({})]), 'tty', { color: true })).toContain('\u001b[33m');
  });

  it('drops the findings column below 80 columns and wraps long lines', () => {
    const narrow = render(report([finding({})]), 'text', { color: false, width: 60 });
    for (const line of narrow.split('\n')) {
      if (!line.includes('https://')) expect(line.length).toBeLessThanOrEqual(60);
    }
    expect(narrow).not.toContain('Findings');
  });

  it('escapes Markdown and bare links in values from the project', () => {
    const hostile = finding({
      file: 'src/[x](https://evil.example)|`.tsx',
      message: 'Text by @someone #1 at www.evil.example\n- list',
    });
    const markdown = render(
      report([hostile], { project: { ...report([]).project, name: '**Atlas**' } }),
      'markdown',
    );
    expect(markdown).toContain('## a11ylabel: \\*\\*Atlas\\*\\* (React Native)');
    // The path stays inside a code span, where Markdown makes no link of it.
    expect(markdown).toContain('``src/[x](https://evil.example)\\|`.tsx:3``');
    expect(markdown).toContain('www\u2060.evil.example - list');
    expect(markdown).not.toMatch(/(?<!⁠)@someone/);
    expect(markdown).toContain('| [Larger Text](https://developer.apple.com/help/');
    expect(markdown).toContain('What to check by hand before claiming a label');
  });

  it('replaces control and bidi characters in every format', () => {
    const hostile = report([finding({ file: 'a\u001b]8;;x\u0007b‮c.tsx', message: 'm\u009b' })]);
    for (const format of ['tty', 'text', 'markdown', 'json'] as const) {
      // biome-ignore lint/suspicious/noControlCharactersInRegex: the point of the test.
      expect(render(hostile, format)).not.toMatch(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f‮]/);
    }
  });

  it('replaces direction marks as well as bidi controls', () => {
    expect(clean('a\u200Eb\u200Fc\u061Cd\u202Ee\u2066f')).toBe(
      'a\uFFFDb\uFFFDc\uFFFDd\uFFFDe\uFFFDf',
    );
    expect(clean('tab\tand\nnewline stay')).toBe('tab\tand\nnewline stay');
  });

  it('counts and wraps', () => {
    expect(countText({ errors: 1, warnings: 2, info: 3 })).toBe('1 error, 2 warnings, 3 info');
    expect(countText({ errors: 0, warnings: 0, info: 0 })).toBe('');
    expect(wrap('a bb ccc', 4)).toEqual(['a bb', 'ccc']);
  });
});

describe('scan', () => {
  it('reports signals, targets and a clean app', async () => {
    const result = await scan(
      nativeApp('', {
        'CleanApp.swift': CLEAN_VIEW,
        'Motion.swift': 'import SwiftUI\n@Environment(\\.accessibilityReduceMotion) var reduce\n',
      }),
    );
    expect(result.verdict.code).toBe('no-blockers');
    expect(result.findings).toEqual([]);
    const motion = result.labels.find((label) => label.id === 'reduced-motion');
    expect(motion?.signals).toEqual([
      { text: 'Reads the Reduce Motion setting', file: 'App/Motion.swift', files: 1 },
    ]);
    expect(result.project.targets).toEqual([
      { name: 'App', infoPlists: ['App/Info.plist'], interfaceStyle: null, deploymentTarget: null },
    ]);
  });

  it('keeps only the findings of the labels in scope', async () => {
    const root = nativeApp(LIGHT, { 'A.swift': 'import SwiftUI\nlet f = Font.system(size: 9)\n' });
    const all = await scan(root);
    expect(all.findings.map((item) => item.rule)).toEqual(['A11Y201', 'A11Y104']);
    expect(all.project.targets[0]?.interfaceStyle).toBe('Light');
    const some = await scan(root, { labels: ['dark-interface'] });
    expect(some.scope).toEqual(['dark-interface']);
    expect(some.labels).toHaveLength(1);
    expect(some.findings.map((item) => item.rule)).toEqual(['A11Y201']);
    expect(some.summary).toEqual({ errors: 1, warnings: 0, info: 0 });
  });
});
