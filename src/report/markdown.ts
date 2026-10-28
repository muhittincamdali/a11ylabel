// The Markdown report, for a pull request comment, a job summary or a file kept with the code as
// a record of what was checked. render() has already replaced the control characters in every
// string of the report.
import type { FixAdvice, Finding, Report } from '../model.js';
import { labelById } from '../rules/data.js';
import {
  countsLine,
  countText,
  ECOSYSTEM_LABELS,
  OVERVIEW_URL,
  REPOSITORY_URL,
  STATUS_TEXT,
  targetLine,
} from './text.js';

// Every character that can start Markdown or HTML markup inline: links and images ([ ] ( ) !),
// emphasis (* _ ~), code (`), headings (#), HTML and autolinks (< >), entities (&), table cells
// (|) and the backslash itself. A backslash in front makes each one plain text.
const MARKUP = /[\\`*_[\]()#!<>|~&]/g;
// GitHub turns bare URLs, www. addresses, e-mail addresses, @names and issue references (#1,
// owner/repo#1, GH-1) into links or mentions without any markup, also right after a letter or an
// underscore (x_https://...). A word joiner (U+2060, invisible) after the scheme, the www, the @,
// the # or the GH stops that and leaves the text as it reads.
const BARE_LINKS = /(?:https?|ftp)(?=:\/\/)|www(?=\.)|gh(?=-\d)|#(?=\d)|@/gi;
// A list marker ('- ', '+ ', '12. ') or the start of a rule ('---') at the start of a line.
const LIST_OR_RULE = /^(?:[-+](?=\s|$)|-(?=-))/;
const ORDERED_LIST = /^(\d+)\.(?=\s|$)/;
const WORD_JOINER = '\u2060';
const BACKTICK_RUNS = /`+/g;

/**
 * Text from the checked project (names, versions, paths, plist values) as plain text in a
 * paragraph, heading or table cell: no line breaks, markup or bare links. Notes and fix steps
 * start a line, so a leading list marker or `---` is escaped too (it would open a list or a rule),
 * and leading spaces are dropped (four of them would open a code block).
 */
const md = (text: string) =>
  text
    .replace(/\s*\n\s*/g, ' ')
    .trimStart()
    .replace(MARKUP, '\\$&')
    .replace(LIST_OR_RULE, '\\$&')
    .replace(ORDERED_LIST, '$1\\.')
    .replace(BARE_LINKS, `$&${WORD_JOINER}`);

/**
 * Inline code that the value cannot close early: the fence is one backtick longer than the
 * longest run of backticks in it, and a space pads a value that starts or ends with a backtick or
 * a space (Markdown strips one space from each side).
 */
const code = (text: string) => {
  const value = text.replace(/\n/g, ' ');
  if (!value) return '';
  const longestRun = (value.match(BACKTICK_RUNS) ?? []).reduce(
    (longest, run) => Math.max(longest, run.length),
    0,
  );
  const fence = '`'.repeat(longestRun + 1);
  const padding = /^[ `]|[ `]$/.test(value) && value.trim() !== '' ? ' ' : '';
  return `${fence}${padding}${value}${padding}${fence}`;
};
/** GitHub splits a table row on every `|` that has no backslash, inside code spans too. */
const cell = (text: string) => text.replace(/\|/g, '\\|');
/**
 * Adds `lines` to `out` one at a time: push(...lines) passes every line as an argument, and a
 * long list of them overflows the call stack.
 */
function append(out: string[], lines: readonly string[]): void {
  for (const line of lines) out.push(line);
}
const where = (item: Finding) => code(`${item.file}${item.line ? `:${item.line}` : ''}`);

function fixLines(fix: FixAdvice): string[] {
  return [
    `**Fix: ${md(fix.title)}** ([guide](${fix.guide}))`,
    '',
    ...fix.steps.map((step, index) => `${index + 1}. ${md(step)}`),
    '',
  ];
}

function facts(report: Report): string[] {
  const { project } = report;
  return [
    ...project.targets.map((target) => md(targetLine(target))),
    ...project.versions.map(
      (version) =>
        `${code(version.name)} ${md(version.version ?? 'unknown')} (${md(version.source)})`,
    ),
    ...report.labels.flatMap((label) =>
      label.signals.map(
        (signal) =>
          `${label.name}: ${md(signal.text)} (${code(signal.file)}${signal.files > 1 ? ` and ${signal.files - 1} more` : ''})`,
      ),
    ),
  ];
}

function labelTable(report: Report): string[] {
  const out = [
    '| Label | Status | Findings | What a11ylabel checks |',
    '| --- | --- | --- | --- |',
  ];
  for (const label of report.labels) {
    const status = STATUS_TEXT[label.status];
    out.push(
      `| [${label.name}](${label.criteria}) | ${label.status === 'blocked' ? `**${status}**` : status} | ${countText(label.counts) || '–'} | ${md(label.checked)} |`,
    );
  }
  out.push('');
  return out;
}

function details(findings: readonly Finding[]): string[] {
  const out = ['<details><summary>What each finding means and how to fix it</summary>', ''];
  const printed = new Set<string>();
  for (const item of findings) {
    const labels = item.labels.map((id) => labelById(id).name).join(', ');
    out.push(
      `### ${item.rule}: ${md(item.title)}`,
      '',
      `${where(item)}: ${md(item.message)} (${labels})`,
      '',
    );
    if (item.fix && printed.has(item.fix.id))
      out.push(`**Fix: ${md(item.fix.title)}** (steps above)`, '');
    else if (item.fix) append(out, fixLines(item.fix));
    if (item.fix) printed.add(item.fix.id);
    out.push(
      `Sources: ${item.sources.map((source) => `[${md(source.title)}](${source.url})`).join(', ')}`,
      '',
    );
  }
  out.push('</details>', '');
  return out;
}

function manualChecks(report: Report): string[] {
  const out = ['<details><summary>What to check by hand before claiming a label</summary>', ''];
  for (const label of report.labels) out.push(`- **${label.name}**: ${md(label.manual)}`);
  out.push('', '</details>', '');
  return out;
}

export function renderMarkdown(report: Report): string {
  const { project, rules } = report;
  const out = [
    `## a11ylabel: ${md(project.name)} (${ECOSYSTEM_LABELS[project.ecosystem]})`,
    '',
    `**${md(report.verdict.text)}**`,
    '',
    ...labelTable(report),
  ];
  const known = facts(report);
  if (known.length > 0) {
    for (const fact of known) out.push(`- ${fact}`);
    out.push('');
  }
  if (report.findings.length > 0) {
    out.push('| Rule | Severity | Where | Finding |', '| --- | --- | --- | --- |');
    for (const item of report.findings) {
      out.push(`| ${item.rule} | ${item.severity} | ${cell(where(item))} | ${md(item.message)} |`);
    }
    out.push('');
    append(out, details(report.findings));
  }
  append(out, manualChecks(report));
  for (const note of report.notes) out.push(`> ${md(note)}`, '');
  out.push(
    `${countsLine(report)}. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](${OVERVIEW_URL})).`,
    '',
    `<sub>[a11ylabel](${REPOSITORY_URL}) ${report.tool.version}, rules ${rules.ruleSet}@${rules.dataVersion} (sources read ${rules.read}). Reads the project's files; it does not build or run the app.</sub>`,
  );
  return `${out.join('\n')}\n`;
}
