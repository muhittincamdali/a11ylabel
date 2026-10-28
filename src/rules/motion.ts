// Reduced Motion: A11Y301 (motion in an app that never reads Reduce Motion), A11Y302 (motion in a
// file that does not read it), A11Y303 (Flutter reads only disableAnimations, which iOS Reduce
// Motion does not set) and A11Y304 (a Reanimated animation set to ignore the setting). Apple's
// criteria name the triggers: endless and multi-axis motion, spinning, parallax and other depth
// effects, and auto-advancing carousels.
import { shownPath } from '../collect/app.js';
import type { SourceFile } from '../collect/sources.js';
import {
  callArguments,
  hasAttribute,
  jsxElements,
  spanAt,
  topLevelArguments,
} from '../core/syntax.js';
import type { FixVariant } from './data.js';
import { appleVariant, type Hit, hitAt, matches } from './hit.js';

/** A place where the app starts motion that Reduce Motion should calm. */
export interface MotionTrigger {
  offset: number;
  /** What it is, for the message: "repeatForever, an animation that never stops". */
  what: string;
}

/** Code that reads the Reduce Motion setting, per language. Flutter's disableAnimations is not it on iOS. */
const READS_REDUCE_MOTION: Record<SourceFile['language'], RegExp> = {
  swift:
    /\baccessibilityReduceMotion\b|\bisReduceMotionEnabled\b|\breduceMotionStatusDidChange|\bUIAccessibilityIsReduceMotionEnabled\b/,
  objc: /\bUIAccessibilityIsReduceMotionEnabled\b|\bisReduceMotionEnabled\b|ReduceMotionStatusDidChange/,
  js: /\bisReduceMotionEnabled\b|\breduceMotionChanged\b|\buseReducedMotion\b/,
  dart: /\baccessibilityFeatures\s*\.\s*reduceMotion\b/,
};

export const readsReduceMotion = (file: SourceFile) =>
  READS_REDUCE_MOTION[file.language].test(file.code);

function appleTriggers(file: SourceFile): MotionTrigger[] {
  const found: MotionTrigger[] = [];
  const add = (pattern: RegExp, what: string) => {
    for (const match of matches(file, pattern)) found.push({ offset: match.index, what });
  };
  add(/\.\s*repeatForever\s*\(/g, 'repeatForever, an animation that never stops');
  add(/\.\s*rotation3DEffect\s*\(/g, 'rotation3DEffect, a rotation in depth');
  add(
    /\bTimelineView\s*\(\s*\.\s*animation\b/g,
    'TimelineView(.animation), motion redrawn every frame',
  );
  add(/\bUIInterpolatingMotionEffect\b/g, 'UIInterpolatingMotionEffect, a parallax effect');
  add(
    /\brepeatCount\s*=\s*(?:\.infinity|Float\s*\.\s*infinity|\.greatestFiniteMagnitude|Float\s*\.\s*greatestFiniteMagnitude|HUGE_VALF|INFINITY|FLT_MAX)\b/g,
    'repeatCount set to infinity, a Core Animation that never stops',
  );
  // UIView.animate(…, options: [.repeat, …]) or options: .repeat
  for (const match of matches(file, /\boptions\s*:\s*(?=\[|\.\s*repeat\b)/g)) {
    const start = match.index + match[0].length;
    const span = file.code[start] === '[' ? spanAt(file, start) : null;
    const value = span ? span.inner : file.code.slice(start, start + 12);
    if (/\.\s*repeat\b/.test(value)) {
      found.push({
        offset: match.index,
        what: 'the .repeat option, an animation that never stops',
      });
    }
  }
  return found;
}

const CAROUSELS = ['Carousel', 'PagerView', 'Swiper'];

function reactNativeTriggers(file: SourceFile): MotionTrigger[] {
  const found: MotionTrigger[] = [];
  for (const match of matches(file, /\bAnimated\s*\.\s*loop\s*\(/g)) {
    found.push({ offset: match.index, what: 'Animated.loop, an animation that never stops' });
  }
  for (const element of jsxElements(file, ['LottieView', ...CAROUSELS])) {
    if (element.name === 'LottieView') {
      if (!hasAttribute(element.attributes, 'autoPlay')) continue;
      if (/\bloop\s*=\s*\{\s*false\s*\}/.test(element.attributes)) continue;
      if (/\bautoPlay\s*=\s*\{\s*false\s*\}/.test(element.attributes)) continue;
      found.push({ offset: element.start, what: 'an auto-playing LottieView that loops' });
    } else if (/\bauto[pP]lay(?!\s*=\s*\{\s*false\s*\})(?=[\s=/>]|$)/.test(element.attributes)) {
      found.push({ offset: element.start, what: `an auto-advancing ${element.name}` });
    }
  }
  return found;
}

function flutterTriggers(file: SourceFile): MotionTrigger[] {
  const found: MotionTrigger[] = [];
  for (const match of matches(file, /(?:\.\.|\b\w*[cC]ontroller\s*!?\s*\.)\s*repeat\s*\(/g)) {
    found.push({ offset: match.index, what: 'repeat(), an animation that never stops' });
  }
  for (const match of matches(file, /\bLottie\s*\.\s*(?:asset|network|file|memory)(?=\s*\()/g)) {
    const args = callArguments(file, match.index + match[0].length);
    if (!args) continue;
    const named = topLevelArguments(file, args).map((arg) =>
      file.code.slice(arg.start, arg.end + 1).replace(/\s+/g, ''),
    );
    if (named.includes('animate:false') || named.includes('repeat:false')) continue;
    if (named.some((arg) => arg.startsWith('controller:'))) continue;
    found.push({ offset: match.index, what: 'a Lottie animation that plays and loops on its own' });
  }
  for (const match of matches(file, /\bautoPlay\s*:\s*true\b/g)) {
    found.push({ offset: match.index, what: 'autoPlay: true, an auto-advancing carousel' });
  }
  if (/\bTimer\s*\.\s*periodic\b/.test(file.code)) {
    for (const match of matches(file, /\.\s*(?:animateToPage|nextPage)\s*\(/g)) {
      found.push({
        offset: match.index,
        what: 'pages turned by a periodic timer, an auto-advancing carousel',
      });
    }
  }
  return found;
}

export function motionTriggers(file: SourceFile): MotionTrigger[] {
  if (file.language === 'js') return reactNativeTriggers(file);
  if (file.language === 'dart') return flutterTriggers(file);
  return appleTriggers(file);
}

const variantOf = (file: SourceFile): FixVariant =>
  file.language === 'js'
    ? 'react-native'
    : file.language === 'dart'
      ? 'flutter'
      : appleVariant(file);

function flutterAndroidOnly(files: readonly SourceFile[]): Hit[] {
  if (files.some((file) => file.language === 'dart' && readsReduceMotion(file))) return [];
  const hits: Hit[] = [];
  for (const file of files) {
    if (file.language !== 'dart') continue;
    const match = /\bdisableAnimations(?:Of)?\b/.exec(file.code);
    if (!match) continue;
    hits.push(
      hitAt(
        file,
        match.index,
        'A11Y303',
        'flutter',
        'The app reads disableAnimations but not accessibilityFeatures.reduceMotion, so an iPhone with Reduce Motion on still gets every animation.',
      ),
    );
  }
  return hits;
}

/** The Reduced Motion checks over all sources of a project (`root` names files in messages). */
export function checkMotion(files: readonly SourceFile[], root: string): Hit[] {
  const reader = files.find(readsReduceMotion) ?? null;
  const hits: Hit[] = [];
  for (const file of files) {
    const fileReads = readsReduceMotion(file);
    for (const trigger of motionTriggers(file)) {
      if (fileReads) continue;
      hits.push(
        reader
          ? hitAt(
              file,
              trigger.offset,
              'A11Y302',
              variantOf(file),
              `${trigger.what}, in a file that does not read Reduce Motion (the app reads it in ${shownPath(reader.path, root)}).`,
            )
          : hitAt(
              file,
              trigger.offset,
              'A11Y301',
              variantOf(file),
              `${trigger.what}, and nothing in the app reads Reduce Motion.`,
            ),
      );
    }
    if (file.language === 'js') {
      for (const match of matches(file, /\bReduceMotion\s*\.\s*Never\b/g)) {
        hits.push(
          hitAt(
            file,
            match.index,
            'A11Y304',
            'react-native',
            'ReduceMotion.Never: this Reanimated animation runs even when Reduce Motion is on.',
          ),
        );
      }
    }
  }
  hits.push(...flutterAndroidOnly(files));
  return hits;
}
