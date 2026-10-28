// Text helpers shared by the terminal and Markdown reports.
import type { Ecosystem } from '../detect/project.js';
import type { LabelStatus, Report } from '../model.js';

export const REPOSITORY_URL = 'https://github.com/muhittincamdali/a11ylabel';

/** Apple's overview of the labels: what they are and how to plan the evaluation. */
export const OVERVIEW_URL =
  'https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels';

export const ECOSYSTEM_LABELS: Record<Ecosystem, string> = {
  native: 'native iOS',
  flutter: 'Flutter',
  'react-native': 'React Native',
  expo: 'Expo',
};

/** How each label status reads in a report. */
export const STATUS_TEXT: Record<LabelStatus, string> = {
  blocked: 'blocked',
  review: 'review',
  'no-blocker': 'no blocker found',
  'not-known': 'not known',
  manual: 'check by hand',
};

/** One line about the app targets: their appearance setting and deployment target. */
export function targetLine(target: Report['project']['targets'][number]): string {
  const parts = [`target ${target.name}`];
  if (target.interfaceStyle) parts.push(`UIUserInterfaceStyle ${target.interfaceStyle}`);
  if (target.deploymentTarget) parts.push(`iOS ${target.deploymentTarget}`);
  const plists = target.infoPlists.length > 0 ? ` (${target.infoPlists.join(', ')})` : '';
  return `${parts.join(' · ')}${plists}`;
}

/** "2 errors, 1 warning, 3 info" for a count; empty when all are zero. */
export function countText(counts: { errors: number; warnings: number; info: number }): string {
  return [
    counts.errors > 0 ? plural(counts.errors, 'error') : '',
    counts.warnings > 0 ? plural(counts.warnings, 'warning') : '',
    counts.info > 0 ? `${counts.info} info` : '',
  ]
    .filter(Boolean)
    .join(', ');
}

const UNSAFE_CHARACTERS =
  // biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point.
  /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

/**
 * Replaces control characters (C0 except tab and newline, DEL, C1), the bidirectional
 * embedding, override and isolate controls (U+202A to U+202E, U+2066 to U+2069) and the
 * direction marks (U+200E, U+200F, U+061C) with U+FFFD.
 * File names, versions and plist values come from the checked project; printed raw, an escape
 * sequence in one of them could rewrite the terminal, and a bidi control could make a file name
 * or a whole report line read in a different order than it is.
 */
export function clean(text: string): string {
  return text.replace(UNSAFE_CHARACTERS, '\uFFFD');
}

/** A copy of a report (or any part of one) with every string passed through clean(). */
export function withoutControlCharacters<T>(value: T): T {
  if (typeof value === 'string') return clean(value) as T;
  if (Array.isArray(value)) return value.map(withoutControlCharacters) as T;
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, withoutControlCharacters(item)]),
  ) as T;
}

/**
 * Adds `lines` to the end of `out` one at a time. push(...lines) passes every line as an argument,
 * and a long enough text wraps into more lines than the call stack holds arguments.
 */
export function append(out: string[], lines: Iterable<string>): void {
  for (const line of lines) out.push(line);
}

/** Splits text into lines of at most `width` columns (a longer word gets a line of its own). */
export function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line && line.length + 1 + word.length > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

/** The counts at the end of a report: "1 error, 5 warnings, 3 info". */
export function countsLine(report: Report): string {
  const { errors, warnings, info } = report.summary;
  return [plural(errors, 'error'), plural(warnings, 'warning'), `${info} info`].join(', ');
}
