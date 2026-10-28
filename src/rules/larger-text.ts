// Larger Text: A11Y101 (text size locked for the whole app), A11Y102 (text that does not scale),
// A11Y103 (text capped below 200%) and A11Y104 (fixed font sizes). Apple's criteria ask for text
// that grows to at least 200% or the system's largest size; on iOS, body text passes 200% at the
// AX3 size (DynamicTypeSize.accessibility3, UIContentSizeCategory.accessibilityExtraLarge).
import type { SourceFile } from '../collect/sources.js';
import {
  type Argument,
  callArguments,
  hasArgument,
  type Span,
  spanAt,
  topLevelArguments,
} from '../core/syntax.js';
import type { RuleId } from './data.js';
import { type Hit, hitAt, matches, quoted } from './hit.js';

/** Twice the size: the least Apple's Larger Text criteria accept. */
export const MIN_SCALE = 2;

/** SwiftUI DynamicTypeSize in order; .accessibility3 is the first above 200% for body text. */
export const DYNAMIC_TYPE_SIZES = [
  'xSmall',
  'small',
  'medium',
  'large',
  'xLarge',
  'xxLarge',
  'xxxLarge',
  'accessibility1',
  'accessibility2',
  'accessibility3',
  'accessibility4',
  'accessibility5',
] as const;

/** UIKit UIContentSizeCategory in the same order. */
export const CONTENT_SIZE_CATEGORIES = [
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge',
  'extraExtraLarge',
  'extraExtraExtraLarge',
  'accessibilityMedium',
  'accessibilityLarge',
  'accessibilityExtraLarge',
  'accessibilityExtraExtraLarge',
  'accessibilityExtraExtraExtraLarge',
] as const;

/** Index of the first size above 200% (AX3) in both lists. */
export const AX3 = 9;

const number = (text: string | undefined) => (text === undefined ? Number.NaN : Number(text));

/** A multiplier that stops text below 200%: from 1 up to 2 (0 means no limit in React Native). */
export const capsBelowTwice = (value: number) => value >= 1 && value < MIN_SCALE;

const percent = (value: number) => `${Math.round(value * 100)}%`;

// React Native ------------------------------------------------------------------------------

const RN_DEFAULT_PROPS =
  /\b(Text|TextInput)\.defaultProps(?:\s*\.\s*(allowFontScaling|maxFontSizeMultiplier)\s*=\s*([\w.]+)|\s*=\s*(?=\{|\(\s*\{))/g;

function reactNativeAppWide(file: SourceFile, hits: Hit[]): Span[] {
  const spans: Span[] = [];
  for (const match of matches(file, RN_DEFAULT_PROPS)) {
    const component = match[1] as string;
    let off = false;
    let cap = Number.NaN;
    if (match[2]) {
      if (match[2] === 'allowFontScaling') off = match[3] === 'false';
      else cap = number(match[3]);
    } else {
      const brace = file.code.indexOf('{', match.index + match[0].length);
      const span = brace === -1 ? null : spanAt(file, brace);
      if (!span) continue;
      spans.push(span);
      off = /\ballowFontScaling\s*:\s*false\b/.test(span.inner);
      cap = number(/\bmaxFontSizeMultiplier\s*:\s*([\d.]+)/.exec(span.inner)?.[1]);
    }
    if (off) {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y101',
          'react-native',
          `${component}.defaultProps turns allowFontScaling off: no ${component} in the app follows the system text size.`,
        ),
      );
    } else if (capsBelowTwice(cap)) {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y101',
          'react-native',
          `${component}.defaultProps sets maxFontSizeMultiplier to ${cap}: every ${component} stops at ${percent(cap)} of its size.`,
        ),
      );
    }
  }
  return spans;
}

const inside = (spans: Span[], offset: number) =>
  spans.some((span) => offset > span.open && offset < span.close);

function checkReactNative(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  const appWide = reactNativeAppWide(file, hits);
  for (const match of matches(file, /\ballowFontScaling\s*(?:=\s*\{\s*false\s*\}|:\s*false\b)/g)) {
    if (inside(appWide, match.index)) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y102',
        'react-native',
        'allowFontScaling is false: this text keeps its size when the system text size grows.',
      ),
    );
  }
  for (const match of matches(
    file,
    /\bmaxFontSizeMultiplier\s*(?:=\s*\{\s*([\d.]+)\s*\}|:\s*([\d.]+))/g,
  )) {
    const value = number(match[1] ?? match[2]);
    if (inside(appWide, match.index) || !capsBelowTwice(value)) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y103',
        'react-native',
        `maxFontSizeMultiplier is ${value}: this text stops at ${percent(value)} of its size.`,
      ),
    );
  }
  return hits;
}

// Flutter -----------------------------------------------------------------------------------

const FLUTTER_OFF =
  /\bTextScaler\s*\.\s*noScaling\b|\bMediaQuery\s*\.\s*withNoTextScaling\s*\(|\bTextScaler\s*\.\s*linear\s*\(\s*([\d.]+)\s*\)|\btextScaleFactor\s*:\s*([\d.]+)\b/g;

/** The `builder:` arguments of MaterialApp, CupertinoApp and WidgetsApp: what wraps every route. */
function appBuilders(file: SourceFile): Argument[] {
  const builders: Argument[] = [];
  for (const match of matches(
    file,
    /\b(?:MaterialApp|CupertinoApp|WidgetsApp)(?:\s*\.\s*router)?(?=\s*\()/g,
  )) {
    const args = callArguments(file, match.index + match[0].length);
    if (!args) continue;
    builders.push(...topLevelArguments(file, args).filter((arg) => arg.label === 'builder'));
  }
  return builders;
}

function checkFlutter(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  const builders = appBuilders(file);
  const appWide = (offset: number) =>
    builders.some((builder) => offset >= builder.start && offset <= builder.end);
  const push = (offset: number, rule: RuleId, what: string, effect: string) => {
    const wide = appWide(offset);
    hits.push(
      hitAt(
        file,
        offset,
        wide ? 'A11Y101' : rule,
        'flutter',
        wide
          ? `${what} in the app's builder: no text in the app follows the system text size${effect}.`
          : `${what}: this text keeps its size when the system text size grows${effect}.`,
      ),
    );
  };
  for (const match of matches(file, FLUTTER_OFF)) {
    const scale = match[1] ?? match[2];
    const what = scale === undefined ? match[0].replace(/\s+|\($/g, '') : quoted(match[0]);
    if (scale !== undefined && Number.isNaN(number(scale))) continue;
    const effect =
      scale !== undefined && number(scale) !== 1 ? ` (it is always ${percent(number(scale))})` : '';
    push(match.index, 'A11Y102', what, effect);
  }
  for (const match of matches(file, /\bwithClampedTextScaling(?=\s*\()|\.\s*clamp(?=\s*\()/g)) {
    const args = callArguments(file, match.index + match[0].length);
    const value = number(/\bmaxScaleFactor\s*:\s*([\d.]+)/.exec(args?.inner ?? '')?.[1]);
    if (!capsBelowTwice(value)) continue;
    const wide = appWide(match.index);
    hits.push(
      hitAt(
        file,
        match.index,
        wide ? 'A11Y101' : 'A11Y103',
        'flutter',
        wide
          ? `maxScaleFactor ${value} in the app's builder: all text stops at ${percent(value)} of its size.`
          : `maxScaleFactor is ${value}: this text stops at ${percent(value)} of its size.`,
      ),
    );
  }
  return hits;
}

// SwiftUI and UIKit -------------------------------------------------------------------------

/** The largest size a .dynamicTypeSize argument allows, as an index, or null for no limit. */
export function dynamicTypeLimit(argument: string): { fixed: boolean; max: number } | null {
  const size = '(?:DynamicTypeSize)?\\s*\\.\\s*(\\w+)';
  const text = argument.trim();
  const index = (name: string | undefined) =>
    DYNAMIC_TYPE_SIZES.indexOf(name as (typeof DYNAMIC_TYPE_SIZES)[number]);
  const fixed = new RegExp(`^${size}$`).exec(text);
  if (fixed) return index(fixed[1]) === -1 ? null : { fixed: true, max: index(fixed[1]) };
  const closed = new RegExp(`^(?:${size})?\\s*\\.\\.(\\.|<)\\s*${size}$`).exec(text);
  if (!closed) return null;
  const upper = index(closed[3]);
  if (upper === -1) return null;
  return { fixed: false, max: closed[2] === '<' ? upper - 1 : upper };
}

/** A SwiftUI app's file: what it sets on its scene applies to every view. */
const isAppFile = (file: SourceFile) =>
  /:\s*App\s*\{/.test(file.code) && /\bWindowGroup\b/.test(file.code);

function checkDynamicTypeSize(file: SourceFile, hits: Hit[]) {
  const appWide = isAppFile(file);
  for (const match of matches(file, /\.\s*dynamicTypeSize(?=\s*\()/g)) {
    const args = callArguments(file, match.index + match[0].length);
    const limit = args ? dynamicTypeLimit(args.inner) : null;
    if (!limit || limit.max >= AX3) continue;
    const size = DYNAMIC_TYPE_SIZES[limit.max] as string;
    const shown = quoted(`.dynamicTypeSize(${args?.inner.trim()})`);
    if (appWide) {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y101',
          'swiftui',
          `${shown} on the app's scene: no text grows past ${size}, below 200%.`,
        ),
      );
    } else if (limit.fixed) {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y102',
          'swiftui',
          `${shown}: these views stay at ${size} whatever the system text size is.`,
        ),
      );
    } else {
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y103',
          'swiftui',
          `${shown}: text in these views stops at ${size}, below 200%.`,
        ),
      );
    }
  }
}

function checkUIKitSizes(file: SourceFile, hits: Hit[]) {
  for (const match of matches(file, /\badjustsFontForContentSizeCategory\s*=\s*(?:false|NO)\b/g)) {
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y102',
        'uikit',
        'adjustsFontForContentSizeCategory is false: this text keeps its size when the system text size changes.',
      ),
    );
  }
  for (const match of matches(
    file,
    /\bmaximumContentSizeCategory\s*=\s*(?:UIContentSizeCategory)?\s*\.\s*(\w+)/g,
  )) {
    const max = CONTENT_SIZE_CATEGORIES.indexOf(
      match[1] as (typeof CONTENT_SIZE_CATEGORIES)[number],
    );
    if (max === -1 || max >= AX3) continue;
    const lineStart = file.code.lastIndexOf('\n', match.index) + 1;
    const receiver = file.code.slice(lineStart, match.index);
    const wide = /window/i.test(receiver);
    hits.push(
      hitAt(
        file,
        match.index,
        wide ? 'A11Y101' : 'A11Y103',
        'uikit',
        wide
          ? `The window's maximumContentSizeCategory is .${match[1]}: no text in it grows past that size, below 200%.`
          : `maximumContentSizeCategory is .${match[1]}: text in this view stops there, below 200%.`,
      ),
    );
  }
}

const SWIFTUI_FIXED_FONTS = /\.\s*system\s*\(\s*size\s*:|\.\s*custom(?=\s*\()/g;
const UIKIT_FIXED_FONTS =
  /\b(?:bold|italic|monospacedDigit|monospaced)?[sS]ystemFont\s*\(\s*ofSize\b|\bUIFont\s*\(\s*name\s*:|\b(?:bold|italic)?[sS]ystemFontOfSize\s*:|\bfontWithName\s*:/g;

/** How a message names the font call it found: "systemFont(ofSize:)", "UIFont(name:size:)". */
export function fontCall(found: string): string {
  const call = found.replace(/\s+/g, '');
  if (call.endsWith('(ofSize')) return `${call})`.replace('(ofSize)', '(ofSize:)');
  if (call === 'UIFont(name:') return 'UIFont(name:size:)';
  if (call === 'fontWithName:') return 'fontWithName:size:';
  return call;
}

function checkFixedFonts(file: SourceFile, hits: Hit[]) {
  if (file.language === 'swift') {
    for (const match of matches(file, SWIFTUI_FIXED_FONTS)) {
      const isCustom = /custom/.test(match[0]);
      if (isCustom) {
        const args = callArguments(file, match.index + match[0].length);
        if (!args || !hasArgument(args.inner, 'fixedSize')) continue;
      }
      hits.push(
        hitAt(
          file,
          match.index,
          'A11Y104',
          'swiftui',
          isCustom
            ? 'Font.custom(_:fixedSize:) keeps its size whatever the system text size is.'
            : '.system(size:) is a fixed point size: Dynamic Type does not scale it.',
        ),
      );
    }
  }
  // A file that scales its fonts with UIFontMetrics may wrap these; it is left to that file.
  if (/\bUIFontMetrics\b|scaledFont/.test(file.code)) return;
  for (const match of matches(file, UIKIT_FIXED_FONTS)) {
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y104',
        'uikit',
        `${fontCall(match[0])} gives a fixed point size, and this file never scales a font with UIFontMetrics.`,
      ),
    );
  }
}

/** The Larger Text checks for one source file. */
export function checkLargerText(file: SourceFile): Hit[] {
  if (file.language === 'js') return checkReactNative(file);
  if (file.language === 'dart') return checkFlutter(file);
  const hits: Hit[] = [];
  if (file.language === 'swift') checkDynamicTypeSize(file, hits);
  checkUIKitSizes(file, hits);
  checkFixedFonts(file, hits);
  return hits;
}
