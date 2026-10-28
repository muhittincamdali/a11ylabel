// Source files from a pull request can be written to make a pattern slow. Each case here must
// finish well within the limit at 1 MB; the limit leaves room for a slow CI runner.
import { describe, expect, it } from 'vitest';
import { blankCommentsAndStrings, sourceFile } from '../../src/collect/sources.js';
import { checkLabels } from '../../src/rules/labels.js';
import { checkLargerText } from '../../src/rules/larger-text.js';
import { motionTriggers } from '../../src/rules/motion.js';
import { isFlutterPlugin } from '../../src/detect/project.js';

const SIZE = 1_000_000;
const LIMIT_MS = 2_000;

const repeat = (unit: string) => unit.repeat(Math.ceil(SIZE / unit.length));

function timed(run: () => unknown): number {
  const started = performance.now();
  run();
  return performance.now() - started;
}

describe('isFlutterPlugin', () => {
  it.each([
    ['a plugin', 'name: x\nflutter:\n  plugin:\n    platforms:\n', true],
    ['a plugin after blank lines', 'flutter:\n\n  assets:\n\n  plugin:\n', true],
    ['an app', 'name: x\nflutter:\n  uses-material-design: true\n', false],
    ['plugin: outside the flutter section', 'flutter:\n  assets:\nother:\n  plugin:\n', false],
    ['a nested flutter key', 'dependencies:\n  flutter:\n    plugin:\n', false],
  ])('%s', (_, pubspec, expected) => {
    expect(isFlutterPlugin(pubspec)).toBe(expected);
  });

  it('reads a pubspec of blank lines in linear time', () => {
    expect(timed(() => isFlutterPlugin(`flutter:\n${repeat(' \n')}`))).toBeLessThan(LIMIT_MS);
  });
});

describe('blankCommentsAndStrings', () => {
  it('blanks Swift raw strings with many hashes', () => {
    expect(blankCommentsAndStrings('let a = ##"x"## + b', 'swift')).toBe('let a = ##" "## + b');
  });

  it('reads a file of raw string openings in linear time', () => {
    expect(timed(() => blankCommentsAndStrings(repeat('#"'), 'swift'))).toBeLessThan(LIMIT_MS);
  });
});

describe('rules on hostile sources', () => {
  it.each([
    ['unclosed Swift buttons', 'swift', repeat('Button(action: x) { Image(')],
    ['unclosed dynamicTypeSize calls', 'swift', repeat('.dynamicTypeSize(...')],
    ['unclosed UIView.animate options', 'swift', repeat('options: [.repeat, ')],
    ['many setImage calls', 'swift', repeat('b.setImage(i)\n')],
    ['unclosed JSX touchables', 'js', repeat('<Pressable onPress={() => {')],
    ['JSX tags without an end', 'js', repeat('<Pressable a ')],
    ['nested touchables', 'js', `${repeat('<Pressable>')}${repeat('</Pressable>')}`],
    ['unclosed Flutter apps', 'dart', repeat('MaterialApp(builder: (c, w) => MediaQuery(')],
    ['unclosed IconButtons', 'dart', repeat('IconButton(icon: Icon(')],
    [
      'many Semantics wrappers',
      'dart',
      repeat('Semantics(label: x, child: IconButton(icon: i)), '),
    ],
  ])('%s', (_, language, text) => {
    const extension = { swift: 'swift', js: 'tsx', dart: 'dart' }[language as 'swift'];
    const file = sourceFile(`/app/lib/File.${extension}`, `import SwiftUI\n${text}`);
    expect(
      timed(() => [checkLargerText(file), checkLabels(file), motionTriggers(file)]),
    ).toBeLessThan(LIMIT_MS);
  });
});
