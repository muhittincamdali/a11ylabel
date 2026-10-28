// VoiceOver and Voice Control: A11Y401 (icon-only buttons without an accessibility label) and
// A11Y402 (labels that name the control type). A button whose only content is an image has no
// text for VoiceOver to read or for Voice Control to show and match; the fix is a short label
// that names the action.
import type { SourceFile } from '../collect/sources.js';
import {
  callArguments,
  chainedModifiers,
  hasArgument,
  jsxChildren,
  jsxElements,
  type Span,
  skipSpace,
  spanAt,
  topLevelArguments,
} from '../core/syntax.js';
import type { FixVariant } from './data.js';
import { type Hit, hitAt, matches, quoted, stringAt } from './hit.js';

// SwiftUI -----------------------------------------------------------------------------------

/** The label closure of a SwiftUI Button at `match`, and where the button expression ends. */
function swiftUIButtonLabel(file: SourceFile, after: number): { label: Span; end: number } | null {
  const { code } = file;
  let index = skipSpace(code, after);
  let hasAction = false;
  if (code[index] === '(') {
    const args = spanAt(file, index);
    if (!args) return null;
    const list = topLevelArguments(file, args);
    // Button("Title") / Button(title) / Button(LocalizedStringKey): a button with text.
    if (list[0] && list[0].label === null) return null;
    const label = list.find((arg) => arg.label === 'label');
    if (label) {
      const brace = code.indexOf('{', label.start);
      const span = brace === -1 || brace > label.end ? null : spanAt(file, brace);
      return span ? { label: span, end: args.close } : null;
    }
    hasAction = list.some((arg) => arg.label === 'action');
    index = skipSpace(code, args.close + 1);
  }
  if (code[index] !== '{') return null;
  const first = spanAt(file, index);
  if (!first) return null;
  if (hasAction) return { label: first, end: first.close };
  const keyword = /^\s*label\s*:\s*\{/.exec(code.slice(first.close + 1, first.close + 40));
  if (!keyword) return null;
  const second = spanAt(file, first.close + keyword[0].length);
  return second ? { label: second, end: second.close } : null;
}

/** What VoiceOver has to go on for an Image(…) call, for the message. */
function imageName(file: SourceFile, image: Span): string {
  const args = topLevelArguments(file, image);
  const first = args[0];
  if (!first) return 'an image without a name';
  const literal = stringAt(file, first.start, first.end + 1);
  if (first.label === 'systemName') {
    return literal === null
      ? 'an SF Symbol'
      : `the SF Symbol "${quoted(literal)}", whose name is not a label you chose`;
  }
  if (first.label === 'decorative') return 'an image marked decorative, which VoiceOver skips';
  if (first.label === null && literal !== null) {
    return `the image "${quoted(literal)}", whose asset name becomes the label`;
  }
  return 'an image without a name';
}

function checkSwiftUI(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  for (const match of matches(file, /\bButton\b(?=\s*[({])/g)) {
    const button = swiftUIButtonLabel(file, match.index + match[0].length);
    if (!button) continue;
    const content = button.label.inner.trim();
    const image = /^Image\s*\(/.exec(content);
    if (!image) continue;
    const imageOpen =
      button.label.open + 1 + button.label.inner.indexOf(content) + image[0].length - 1;
    const imageArgs = spanAt(file, imageOpen);
    if (!imageArgs || hasArgument(imageArgs.inner, 'label')) continue;
    const inner = chainedModifiers(file, imageArgs.close);
    // Anything after the image's own modifiers is more content (a Text, another view).
    if (file.code.slice(inner.end + 1, button.label.close).trim() !== '') continue;
    const outer = chainedModifiers(file, button.end);
    const named = [...inner.names, ...outer.names];
    if (named.includes('accessibilityLabel') || named.includes('accessibilityInputLabels'))
      continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y401',
        'swiftui',
        `A Button whose label is only ${imageName(file, imageArgs)}, with no accessibilityLabel.`,
      ),
    );
  }
  return hits;
}

// UIKit -------------------------------------------------------------------------------------

/** Receivers that get `what` somewhere in the file, found in one pass. */
function receivers(file: SourceFile, what: RegExp): Set<string> {
  const pattern = new RegExp(`\\b(\\w+)\\s*[?!]?\\s*\\.\\s*(?:${what.source})`, 'g');
  return new Set([...matches(file, pattern)].map((match) => match[1] as string));
}

function checkUIKit(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  if (!/setImage|UIBarButtonItem/.test(file.code)) return hits;
  const named = receivers(file, /setTitle\s*\(|accessibilityLabel\s*=|setAttributedTitle\s*\(/);
  for (const match of matches(file, /\b(\w+)\s*[?!]?\s*\.\s*setImage\s*\(/g)) {
    const name = match[1] as string;
    if (named.has(name)) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y401',
        'uikit',
        `${name} gets an image and no title or accessibilityLabel in this file.`,
      ),
    );
  }
  for (const match of matches(file, /\bUIBarButtonItem\s*\(\s*image\s*:/g)) {
    const lineStart = file.code.lastIndexOf('\n', match.index) + 1;
    const before = file.code.slice(lineStart, match.index);
    const assigned = /(\w+)\s*(?::\s*[\w.<>?!]+\s*)?=\s*$/.exec(before)?.[1];
    if (assigned && named.has(assigned)) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y401',
        'uikit',
        `A UIBarButtonItem with an image and no accessibilityLabel${assigned ? ` (${assigned})` : ''}.`,
      ),
    );
  }
  return hits;
}

// React Native ------------------------------------------------------------------------------

const TOUCHABLES = [
  'Pressable',
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
];
const ICON =
  /^(?:Image|ImageBackground|Svg|Icon|[A-Z]\w*Icons?|Ionicons|MaterialIcons|MaterialCommunityIcons|FontAwesome\d?|Feather|AntDesign|Entypo|EvilIcons|Octicons|SimpleLineIcons|Foundation|Fontisto|Zocial)$/;
/** The longest body of a touchable that is still read as a possible icon-only button. */
const MAX_BUTTON_BODY = 1_000;
const LABELLED =
  /(?:^|\s)(?:accessibilityLabel|aria-label|aria-labelledby|accessibilityLabelledBy|alt)\s*=|\{\s*\.\.\./;

/** Whether JSX children show only icons: no text, no other component, no expression. */
export function onlyIcons(children: string): boolean {
  const tags = [...children.matchAll(/<\/?([A-Za-z][\w.]*)/g)].map((match) => match[1] as string);
  if (!tags.some((name) => ICON.test(name))) return false;
  if (!tags.every((name) => ICON.test(name) || name === 'View')) return false;
  if (LABELLED.test(children)) return false;
  // What is left outside the tags is text or an expression; either may carry a label.
  const outside = children.replace(/<[^<>]*>/g, '').trim();
  return outside === '';
}

function checkReactNative(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  const paper = /react-native-paper/.test(file.text);
  const names = paper ? [...TOUCHABLES, 'IconButton'] : TOUCHABLES;
  for (const element of jsxElements(file, names)) {
    if (LABELLED.test(element.attributes)) continue;
    if (/\baccessible\s*=\s*\{\s*false\s*\}/.test(element.attributes)) continue;
    if (element.name === 'IconButton') {
      hits.push(
        hitAt(
          file,
          element.start,
          'A11Y401',
          'react-native',
          'A react-native-paper IconButton without accessibilityLabel.',
        ),
      );
      continue;
    }
    // An icon-only button is short; a long body has text or other content, and skipping it keeps
    // deeply nested touchables from costing quadratic time.
    if (element.close === null || element.close - element.openEnd > MAX_BUTTON_BODY) continue;
    const children = jsxChildren(file, element);
    if (children === null || !onlyIcons(children)) continue;
    hits.push(
      hitAt(
        file,
        element.start,
        'A11Y401',
        'react-native',
        `A ${element.name} that shows only an icon or image, without accessibilityLabel.`,
      ),
    );
  }
  return hits;
}

// Flutter -----------------------------------------------------------------------------------

/**
 * The ranges of the file inside a Semantics(label: …) call, merged and sorted, so that whether
 * an offset is covered is a binary search, not a scan of every wrapper.
 */
function semanticsWithLabel(file: SourceFile): [number, number][] {
  const spans: [number, number][] = [];
  for (const match of matches(file, /\bSemantics(?=\s*\()/g)) {
    const args = callArguments(file, match.index + match[0].length);
    if (args && topLevelArguments(file, args).some((arg) => arg.label === 'label')) {
      spans.push([args.open, args.close]);
    }
  }
  spans.sort((left, right) => left[0] - right[0]);
  const merged: [number, number][] = [];
  for (const span of spans) {
    const last = merged.at(-1);
    if (last && span[0] <= last[1]) last[1] = Math.max(last[1], span[1]);
    else merged.push([...span]);
  }
  return merged;
}

/** Whether `offset` falls strictly inside one of the merged, sorted `ranges`. */
export function covered(ranges: readonly [number, number][], offset: number): boolean {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const [start, end] = ranges[middle] as [number, number];
    if (offset <= start) high = middle - 1;
    else if (offset >= end) low = middle + 1;
    else return true;
  }
  return false;
}

const FLUTTER_BUTTONS =
  /\b(IconButton(?:\s*\.\s*(?:filled|filledTonal|outlined))?|FloatingActionButton(?:\s*\.\s*(?:small|large))?|CupertinoButton(?:\s*\.\s*filled)?)(?=\s*\()/g;

function checkFlutter(file: SourceFile): Hit[] {
  const hits: Hit[] = [];
  const labelled = semanticsWithLabel(file);
  for (const match of matches(file, FLUTTER_BUTTONS)) {
    const args = callArguments(file, match.index + match[0].length);
    if (!args) continue;
    if (covered(labelled, match.index)) continue;
    const name = (match[1] as string).replace(/\s+/g, '');
    const has = (label: string) => hasArgument(args.inner, label);
    if (has('tooltip') || has('semanticLabel') || has('semanticsLabel')) continue;
    if (/\bText\s*\(/.test(args.inner)) continue;
    if (name.startsWith('CupertinoButton') && !/\bIcon\s*\(/.test(args.inner)) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y401',
        'flutter',
        name.startsWith('CupertinoButton')
          ? 'A CupertinoButton with only an Icon, without a semanticLabel or Semantics label.'
          : `${/^[AEIOU]/.test(name) ? 'An' : 'A'} ${name} without a tooltip, which Flutter uses as its accessibility label.`,
      ),
    );
  }
  return hits;
}

// A11Y402 -----------------------------------------------------------------------------------

const LABEL_SITES: Record<SourceFile['language'], RegExp> = {
  swift: /\.\s*accessibilityLabel\s*\(|\baccessibilityLabel\s*=/g,
  objc: /\baccessibilityLabel\s*=/g,
  js: /\b(?:accessibilityLabel|aria-label)\s*=/g,
  dart: /\b(?:tooltip|semanticLabel|semanticsLabel)\s*:/g,
};

/** A control type, or a state, at the end of a label, which VoiceOver says on its own. */
export const CONTROL_TYPE =
  /(?:^|[\s,])(button|btn|checkbox|check box|radio button|switch|toggle|slider|tab|link|checked|unchecked|selected)\s*[.!]?$/i;

function checkControlTypeNames(file: SourceFile, variant: FixVariant): Hit[] {
  const hits: Hit[] = [];
  for (const match of matches(file, LABEL_SITES[file.language])) {
    const from = match.index + match[0].length;
    // The literal right after the call or the equals sign (Text("…"), NSLocalizedString("…"), {'…'}).
    const window = file.code.slice(from, from + 40);
    const quote = window.search(/["'`]/);
    if (quote === -1 || /[;,)}]/.test(window.slice(0, quote))) continue;
    const label = stringAt(file, from + quote, from + quote + 1);
    const type = label === null ? null : CONTROL_TYPE.exec(label.trim());
    if (!label || !type) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y402',
        variant,
        `The label "${quoted(label.trim())}" ends with "${type[1]}", which VoiceOver already says from the element's traits.`,
      ),
    );
  }
  return hits;
}

/** The VoiceOver and Voice Control checks for one source file. */
export function checkLabels(file: SourceFile): Hit[] {
  switch (file.language) {
    case 'swift': {
      const variant = /^\s*import\s+SwiftUI\b/m.test(file.code) ? 'swiftui' : 'uikit';
      return [...checkSwiftUI(file), ...checkUIKit(file), ...checkControlTypeNames(file, variant)];
    }
    case 'objc':
      return checkControlTypeNames(file, 'uikit');
    case 'js':
      return [...checkReactNative(file), ...checkControlTypeNames(file, 'react-native')];
    case 'dart':
      return [...checkFlutter(file), ...checkControlTypeNames(file, 'flutter')];
  }
}
