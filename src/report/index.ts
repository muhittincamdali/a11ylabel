import type { Report } from '../model.js';
import { renderMarkdown } from './markdown.js';
import { oneLine, withoutControlCharacters } from './text.js';
import { renderTty, type TtyOptions } from './tty.js';

/** `tty` adds colour in a terminal; `text` is the same report without it. */
export const FORMATS = ['tty', 'text', 'markdown', 'json'] as const;
export type Format = (typeof FORMATS)[number];

export type { TtyOptions } from './tty.js';

/**
 * Renders a report as terminal text, plain text, Markdown or JSON (the report object as-is). This is the one
 * way out for a report: every string in it has its control characters replaced here, whatever the
 * format, before it reaches a terminal, a file or a pull request comment. JSON.stringify escapes
 * only U+0000 to U+001F, so DEL and C1 controls would otherwise reach the JSON output raw. The
 * terminal and text reports also replace line breaks (oneLine()); Markdown keeps a file name in a
 * code span and JSON escapes the newline, so both keep the string as it is.
 */
export function render(
  input: Report,
  format: Format,
  options: TtyOptions = { color: false },
): string {
  switch (format) {
    case 'tty':
      return renderTty(withoutControlCharacters(input, oneLine), options);
    case 'text':
      return renderTty(withoutControlCharacters(input, oneLine), { ...options, color: false });
    case 'markdown':
      return renderMarkdown(withoutControlCharacters(input));
    case 'json':
      return `${JSON.stringify(withoutControlCharacters(input), null, 2)}\n`;
  }
}
