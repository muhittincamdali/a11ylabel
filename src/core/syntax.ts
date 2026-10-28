// Just enough structure for the rules: matching brackets, the arguments of a call and the
// elements of JSX, read from blanked code (comments and string contents are spaces, so brackets
// inside them never count). Everything is computed in one pass per file and cached, so a file from
// a pull request full of unclosed brackets or tags costs linear time, not quadratic.
import type { SourceFile } from '../collect/sources.js';

const OPEN: Record<string, string> = { '(': ')', '{': '}', '[': ']' };
const CLOSE = new Set([')', '}', ']']);

/** For each opening bracket offset, the offset of its closing bracket; unmatched ones are absent. */
export function bracketPairs(code: string): ReadonlyMap<number, number> {
  const pairs = new Map<number, number>();
  const stack: number[] = [];
  for (let index = 0; index < code.length; index++) {
    const char = code[index] as string;
    if (OPEN[char]) {
      stack.push(index);
    } else if (CLOSE.has(char)) {
      // A closing bracket that does not match the innermost opening one ends nothing; dropping the
      // openings it skips keeps one broken bracket from mismatching the rest of the file.
      while (stack.length > 0) {
        const open = stack.pop() as number;
        if (OPEN[code[open] as string] === char) {
          pairs.set(open, index);
          break;
        }
      }
    }
  }
  return pairs;
}

// The pairs of the last file asked about. The rules check one file at a time, so one entry is
// enough; keeping the pairs of every file held a map entry per bracket pair of the whole project
// until the scan ended, about 220 MB for 32 Swift files of 3.9 MB.
let cached: { file: SourceFile; pairs: ReadonlyMap<number, number> } | null = null;

function pairsOf(file: SourceFile): ReadonlyMap<number, number> {
  if (cached?.file !== file) cached = { file, pairs: bracketPairs(file.code) };
  return cached.pairs;
}

/** The offset of the bracket that closes the one at `open`, or null when it is never closed. */
export function closingBracket(file: SourceFile, open: number): number | null {
  return pairsOf(file).get(open) ?? null;
}

/** The first offset at or after `from` that is not whitespace. */
export function skipSpace(code: string, from: number): number {
  let index = from;
  while (index < code.length && /\s/.test(code[index] as string)) index++;
  return index;
}

/** A bracketed span: the offsets of its brackets and the code between them. */
export interface Span {
  open: number;
  close: number;
  inner: string;
}

/** The bracketed span that starts at `open`, or null when it is never closed. */
export function spanAt(file: SourceFile, open: number): Span | null {
  const close = closingBracket(file, open);
  return close === null ? null : { open, close, inner: file.code.slice(open + 1, close) };
}

/**
 * The argument list of the call whose name ends just before `from` (the first non-space
 * character from there must be `(`), or null.
 */
export function callArguments(file: SourceFile, from: number): Span | null {
  const open = skipSpace(file.code, from);
  return file.code[open] === '(' ? spanAt(file, open) : null;
}

/** One argument of a call at the top level of its list: its label (if any) and where it is. */
export interface Argument {
  label: string | null;
  /** Offsets of the argument in the file, from its first to its last character. */
  start: number;
  end: number;
}

/**
 * The top-level arguments of a bracketed list (a Swift or Dart call, a JavaScript object): split
 * at the commas outside nested brackets, each with its `label:` when it has one.
 */
export function topLevelArguments(file: SourceFile, span: Span): Argument[] {
  const args: Argument[] = [];
  let start = span.open + 1;
  const push = (end: number) => {
    const text = file.code.slice(start, end);
    const first = start + (text.length - text.trimStart().length);
    if (first < end) {
      const label = /^\s*([A-Za-z_]\w*)\s*:(?!:)/.exec(text)?.[1] ?? null;
      args.push({ label, start: first, end: end - 1 });
    }
    start = end + 1;
  };
  for (let index = span.open + 1; index < span.close; index++) {
    const char = file.code[index] as string;
    if (OPEN[char]) {
      index = closingBracket(file, index) ?? span.close;
    } else if (char === ',') {
      push(index);
    }
  }
  push(span.close);
  return args;
}

/** Whether `inner` names the argument `label` at its top level or deeper (`label:` in Swift or Dart). */
export const hasArgument = (inner: string, label: string) =>
  new RegExp(`(?:^|[^\\w.])${label}\\s*:`).test(inner);

/**
 * The modifiers chained after offset `end` (the last character of an expression), e.g. the
 * `.accessibilityLabel(…)` and `.padding()` after a SwiftUI view: their names in order, and the
 * offset of the last character of the chain (`end` itself when there is none).
 */
export function chainedModifiers(file: SourceFile, end: number): { names: string[]; end: number } {
  const names: string[] = [];
  let last = end;
  for (;;) {
    const dot = skipSpace(file.code, last + 1);
    if (file.code[dot] !== '.') return { names, end: last };
    const name = /^\.\s*([A-Za-z_]\w*)/.exec(file.code.slice(dot, dot + 200));
    if (!name?.[1]) return { names, end: last };
    names.push(name[1]);
    last = dot + name[0].length - 1;
    // Arguments and trailing closures: .onTapGesture { … }, .padding(8), .sheet(…) { … }.
    for (;;) {
      const bracket = skipSpace(file.code, last + 1);
      const char = file.code[bracket];
      if (char !== '(' && char !== '{') break;
      const close = closingBracket(file, bracket);
      if (close === null) return { names, end: last };
      last = close;
    }
  }
}

/** One JSX element: where its opening tag starts and ends, and its closing tag when it has one. */
export interface JsxElement {
  name: string;
  /** Offset of the `<`. */
  start: number;
  /** Offset of the `>` that ends the opening tag. */
  openEnd: number;
  selfClosing: boolean;
  /** Offset of the `<` of `</Name>`, or null for a self-closing or unclosed element. */
  close: number | null;
  /** The attributes as written in the blanked code. */
  attributes: string;
}

/**
 * The end of the opening tag that starts at `from` (just after the name): the offset of its `>`,
 * skipping `{…}` attribute values. A `<` outside braces cannot be inside an opening tag, so the
 * search stops there: a file of unclosed tags is read once, not once per tag.
 */
function openingTagEnd(file: SourceFile, from: number): number | null {
  const { code } = file;
  let index = from;
  while (index < code.length) {
    const char = code[index];
    if (char === '{') {
      const close = closingBracket(file, index);
      if (close === null) return null;
      index = close + 1;
      continue;
    }
    if (char === '>') return index;
    if (char === '<') return null;
    index++;
  }
  return null;
}

/** Every element named in `names` in a JavaScript file, with closing tags matched by nesting. */
export function jsxElements(file: SourceFile, names: readonly string[]): JsxElement[] {
  if (names.length === 0) return [];
  const pattern = new RegExp(`<(/?)(${names.join('|')})(?![\\w.])`, 'g');
  const elements: JsxElement[] = [];
  const open = new Map<string, JsxElement[]>();
  for (let match = pattern.exec(file.code); match; match = pattern.exec(file.code)) {
    const name = match[2] as string;
    if (match[1]) {
      const stack = open.get(name);
      const element = stack?.pop();
      if (element) element.close = match.index;
      continue;
    }
    const afterName = match.index + match[0].length;
    const end = openingTagEnd(file, afterName);
    if (end === null) continue;
    const selfClosing = file.code[end - 1] === '/';
    const element: JsxElement = {
      name,
      start: match.index,
      openEnd: end,
      selfClosing,
      close: null,
      attributes: file.code.slice(afterName, selfClosing ? end - 1 : end),
    };
    elements.push(element);
    if (!selfClosing) {
      const stack = open.get(name) ?? [];
      stack.push(element);
      open.set(name, stack);
    }
    pattern.lastIndex = end + 1;
  }
  return elements;
}

/** The code between an element's tags, or null for a self-closing or unclosed element. */
export const jsxChildren = (file: SourceFile, element: JsxElement): string | null =>
  element.close === null ? null : file.code.slice(element.openEnd + 1, element.close);

/** Whether a JSX attribute list sets `name` (`name=`, or `name` alone for a true boolean). */
export const hasAttribute = (attributes: string, name: string) =>
  new RegExp(`(?:^|\\s)${name.replace(/[-]/g, '\\-')}(?=\\s*=|\\s|$)`).test(attributes);
