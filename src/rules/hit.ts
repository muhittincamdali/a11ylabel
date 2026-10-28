// What a check returns before the report turns it into a finding: the rule, where, and what was
// seen there. The rule's title, severity, labels, sources and fix text come from the rule data.
import type { SourceFile } from '../collect/sources.js';
import type { FixVariant, RuleId } from './data.js';

export interface Hit {
  rule: RuleId;
  /** Absolute path of the file. */
  file: string;
  line: number | null;
  message: string;
  /** Which of the rule's fixes applies. */
  variant: FixVariant;
  target?: string;
}

/** All matches of `pattern` (which must have the g flag) in the blanked code of a file. */
export function* matches(file: SourceFile, pattern: RegExp): Generator<RegExpExecArray> {
  pattern.lastIndex = 0;
  for (let match = pattern.exec(file.code); match; match = pattern.exec(file.code)) {
    yield match;
    if (match[0].length === 0) pattern.lastIndex++;
  }
}

/** A hit at the line of `offset` in `file`. */
export function hitAt(
  file: SourceFile,
  offset: number,
  rule: RuleId,
  variant: FixVariant,
  message: string,
): Hit {
  return { rule, file: file.path, line: file.lineAt(offset), message, variant };
}

/** The longest string a message quotes from the code; longer ones are cut with an ellipsis. */
export const MAX_QUOTED = 60;

/** A value from the checked code, shortened for a message. */
export const quoted = (text: string) =>
  text.length > MAX_QUOTED ? `${text.slice(0, MAX_QUOTED - 1)}…` : text;

/**
 * The text of the string literal whose opening quote is the first quote at or after `from` in
 * the blanked code (read from the original), or null when there is none before `to`.
 */
export function stringAt(file: SourceFile, from: number, to = file.code.length): string | null {
  for (let index = from; index < to; index++) {
    const open = file.code[index];
    if (open !== '"' && open !== "'" && open !== '`') continue;
    const close = file.code.indexOf(open, index + 1);
    return close === -1 ? null : file.text.slice(index + 1, close);
  }
  return null;
}

/**
 * SwiftUI or UIKit, by what the Swift file imports; Objective-C is always UIKit. It reads the
 * whole file, so a check calls it once per file. Only spaces and tabs may come before `import`:
 * with \s* every line start of a run of blank lines would scan the rest of the run again.
 */
export function appleVariant(file: SourceFile): 'swiftui' | 'uikit' {
  return file.language === 'swift' && /^[ \t]*import\s+SwiftUI\b/m.test(file.code)
    ? 'swiftui'
    : 'uikit';
}
