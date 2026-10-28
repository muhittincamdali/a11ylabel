// The terminal report: the label table and the verdict first, then each finding with where it is
// and what it means, then each fix once, lettered, with its steps and guide. render() has already
// replaced the control characters in every string of the report.
import type { FixAdvice, Finding, LabelStatus, Report } from '../model.js';
import { labelById } from '../rules/data.js';
import {
  countsLine,
  countText,
  ECOSYSTEM_LABELS,
  OVERVIEW_URL,
  REPOSITORY_URL,
  STATUS_TEXT,
  targetLine,
  wrap,
} from './text.js';

export interface TtyOptions {
  color: boolean;
  /** Total width to wrap to (default 100, at least 60). */
  width?: number;
}

type Style = 'bold' | 'dim' | 'red' | 'yellow' | 'cyan' | 'green' | 'blue';
const CODES: Record<Style, [number, number]> = {
  bold: [1, 22],
  dim: [2, 22],
  red: [31, 39],
  yellow: [33, 39],
  green: [32, 39],
  cyan: [36, 39],
  blue: [34, 39],
};

const LABEL_WIDTH = 9;
const INDENT = ' '.repeat(LABEL_WIDTH);
const SEVERITY_STYLE = { error: 'red', warning: 'yellow', info: 'cyan' } as const;
const STATUS_STYLE: Record<LabelStatus, Style> = {
  blocked: 'red',
  review: 'yellow',
  'not-known': 'yellow',
  'no-blocker': 'green',
  manual: 'dim',
};
const VERDICT_STYLE = {
  blocked: 'red',
  'not-known': 'yellow',
  review: 'yellow',
  'no-blockers': 'green',
} as const;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/** "Differentiate Without Color Alone" is the longest label name. */
const NAME_WIDTH = 35;
const STATUS_WIDTH = 18;

type Paint = (style: Style, text: string) => string;

function painter(color: boolean): Paint {
  return (style, text) => {
    if (!color) return text;
    const [open, close] = CODES[style];
    return `\u001b[${open}m${text}\u001b[${close}m`;
  };
}

/** Each distinct fix of the report with its letter, in order of first appearance. */
function letterFixes(
  findings: readonly Finding[],
): Map<string, { letter: string; fix: FixAdvice }> {
  const result = new Map<string, { letter: string; fix: FixAdvice }>();
  for (const item of findings) {
    if (!item.fix || result.has(item.fix.id)) continue;
    result.set(item.fix.id, { letter: LETTERS[result.size] ?? '?', fix: item.fix });
  }
  return result;
}

function header(report: Report, paint: Paint, width: number): string[] {
  const { project, rules } = report;
  const dim = (text: string) => wrap(text, width).map((line) => paint('dim', line));
  const [name = '', ...rest] = wrap(
    `${project.name} · ${ECOSYSTEM_LABELS[project.ecosystem]} · ${project.path}`,
    width,
  );
  const nameLength = project.name.length;
  const lines = [
    ...dim(`a11ylabel ${report.tool.version} · rules ${rules.ruleSet}@${rules.dataVersion}`),
    '',
    `${paint('bold', name.slice(0, nameLength))}${name.slice(nameLength)}`,
    ...rest,
  ];
  for (const target of project.targets) lines.push(...dim(targetLine(target)));
  for (const version of project.versions) {
    lines.push(...dim(`${version.name} ${version.version ?? '(unknown)'} (${version.source})`));
  }
  return [...lines, ''];
}

function labelTable(report: Report, paint: Paint, width: number): string[] {
  const lines = [
    paint(
      'bold',
      `${'Label'.padEnd(NAME_WIDTH)}${'Status'.padEnd(STATUS_WIDTH)}${width >= 80 ? 'Findings' : ''}`,
    ),
  ];
  for (const label of report.labels) {
    const status = STATUS_TEXT[label.status];
    const counts = countText(label.counts);
    const shown = label.status === 'blocked' ? status.toUpperCase() : status;
    lines.push(
      `${label.name.padEnd(NAME_WIDTH)}${paint(STATUS_STYLE[label.status], shown)}${' '.repeat(Math.max(1, STATUS_WIDTH - shown.length))}${width >= 80 ? counts : ''}`.trimEnd(),
    );
  }
  const style = VERDICT_STYLE[report.verdict.code];
  lines.push(
    '',
    ...wrap(report.verdict.text, width).map((line) => paint('bold', paint(style, line))),
  );
  const signals = report.labels.flatMap((label) =>
    label.signals.map(
      (signal) =>
        `${label.name}: ${signal.text.toLowerCase()} (${signal.file}${signal.files > 1 ? ` and ${signal.files - 1} more` : ''})`,
    ),
  );
  if (signals.length > 0) {
    lines.push(
      ...wrap(`Already in the code: ${signals.join('; ')}`, width).map((line) =>
        paint('green', line),
      ),
    );
  }
  return [...lines, ''];
}

function fixSection(
  fixes: Map<string, { letter: string; fix: FixAdvice }>,
  paint: Paint,
  width: number,
) {
  const out = [paint('bold', 'How to fix'), ''];
  for (const { letter, fix } of fixes.values()) {
    out.push(`${paint('bold', `[${letter}]`.padEnd(LABEL_WIDTH))}${paint('bold', fix.title)}`);
    fix.steps.forEach((step, index) => {
      const marker = `${index + 1}. `;
      const [first = '', ...rest] = wrap(step, width - LABEL_WIDTH - marker.length);
      out.push(
        `${INDENT}${marker}${first}`,
        ...rest.map((line) => `${INDENT}${' '.repeat(marker.length)}${line}`),
      );
    });
    out.push(`${INDENT}${paint('dim', fix.guide)}`, '');
  }
  return out;
}

export function renderTty(report: Report, options: TtyOptions): string {
  const paint = painter(options.color);
  const width = Math.max(60, options.width ?? 100);
  const body = (text: string, style?: Style) =>
    wrap(text, width - LABEL_WIDTH).map((line) => `${INDENT}${style ? paint(style, line) : line}`);
  const fixes = letterFixes(report.findings);
  const out = [...header(report, paint, width), ...labelTable(report, paint, width)];

  for (const item of report.findings) {
    const label = item.severity.toUpperCase().padEnd(LABEL_WIDTH);
    const style = SEVERITY_STYLE[item.severity];
    const labels = item.labels.map((id) => labelById(id).name).join(', ');
    const [titleFirst = '', ...titleRest] = wrap(
      `${item.rule} ${item.title} · ${labels}`,
      width - LABEL_WIDTH,
    );
    out.push(
      `${paint('bold', paint(style, label))}${paint('bold', titleFirst)}`,
      ...titleRest.map((line) => `${INDENT}${paint('bold', line)}`),
      `${INDENT}${paint('blue', `${item.file}${item.line ? `:${item.line}` : ''}`)}`,
      ...body(item.message),
    );
    const fix = item.fix ? fixes.get(item.fix.id) : undefined;
    if (fix) out.push(...body(`Fix: [${fix.letter}] ${fix.fix.title}`, 'bold'));
    out.push('');
  }

  if (fixes.size > 0) out.push(...fixSection(fixes, paint, width));
  for (const note of report.notes) {
    out.push(...wrap(`Note: ${note}`, width).map((line) => paint('dim', line)));
  }
  if (report.notes.length) out.push('');
  out.push(
    paint('bold', countsLine(report)),
    ...wrap(
      'a11ylabel reads code. Before claiming a label, Apple asks that people can complete every common task of the app with the feature on.',
      width,
    ).map((line) => paint('dim', line)),
    paint('dim', `Criteria: ${OVERVIEW_URL}`),
  );
  if (report.findings.length === 0)
    out.push(paint('dim', `What is checked: ${REPOSITORY_URL}#what-a11ylabel-checks`));
  return `${out.join('\n')}\n`;
}
