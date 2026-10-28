import { describe, expect, it } from 'vitest';
import { sourceFile } from '../../src/collect/sources.js';
import {
  bracketPairs,
  callArguments,
  chainedModifiers,
  hasAttribute,
  jsxChildren,
  jsxElements,
  topLevelArguments,
} from '../../src/core/syntax.js';

describe('bracketPairs', () => {
  it('matches nested brackets and skips a stray closing one', () => {
    const pairs = bracketPairs('f(a[1], { b })');
    expect(pairs.get(1)).toBe(13);
    expect(pairs.get(3)).toBe(5);
    expect(pairs.get(8)).toBe(12);
    expect(bracketPairs('(]').size).toBe(0);
    expect(bracketPairs('( [ )').get(0)).toBe(4);
  });

  it('reads the right file when calls alternate between files', () => {
    const one = sourceFile('/a.swift', 'f(a)');
    const two = sourceFile('/b.swift', 'g(bb, c)');
    for (let round = 0; round < 3; round++) {
      expect(callArguments(one, 1)?.inner).toBe('a');
      expect(callArguments(two, 1)?.inner).toBe('bb, c');
    }
  });

  it('ignores brackets in strings and comments', () => {
    const file = sourceFile('/a.swift', 'f(")", /* ( */ x)');
    expect(callArguments(file, 1)?.inner).toBe('" ",         x');
  });
});

describe('topLevelArguments', () => {
  it('splits at top-level commas and reads labels', () => {
    const file = sourceFile(
      '/a.dart',
      'MaterialApp(theme: t(a, b), builder: (c, w) => w, home: const Home())',
    );
    const span = callArguments(file, 11);
    if (!span) throw new Error('no span');
    expect(topLevelArguments(file, span).map((arg) => arg.label)).toEqual([
      'theme',
      'builder',
      'home',
    ]);
    const swift = sourceFile('/a.swift', 'Button("Save", action: save)');
    const args = callArguments(swift, 6);
    if (!args) throw new Error('no args');
    expect(topLevelArguments(swift, args).map((arg) => arg.label)).toEqual([null, 'action']);
  });
});

describe('chainedModifiers', () => {
  it('reads a chain with arguments and trailing closures', () => {
    const text =
      'Image(x)\n  .padding(8)\n  .onTapGesture { tap() }\n  .accessibilityLabel("A")\nnext';
    const file = sourceFile('/a.swift', text);
    const chain = chainedModifiers(file, 7);
    expect(chain.names).toEqual(['padding', 'onTapGesture', 'accessibilityLabel']);
    expect(text.slice(chain.end, chain.end + 1)).toBe(')');
  });
});

describe('jsxElements', () => {
  it('matches nested elements of the same name', () => {
    const text =
      '<Pressable a={() => b > c}><Pressable /><Pressable><Icon /></Pressable></Pressable>';
    const file = sourceFile('/a.tsx', text);
    const elements = jsxElements(file, ['Pressable']);
    expect(elements.map((element) => [element.start, element.selfClosing, element.close])).toEqual([
      [0, false, 71],
      [27, true, null],
      [40, false, 59],
    ]);
    expect(jsxChildren(file, elements[2] as (typeof elements)[number])).toBe('<Icon />');
    expect(jsxElements(file, ['PressableX'])).toEqual([]);
  });

  it('reads attributes', () => {
    expect(hasAttribute(' source={a} autoPlay ', 'autoPlay')).toBe(true);
    expect(hasAttribute(' autoPlay={true}', 'autoPlay')).toBe(true);
    expect(hasAttribute(' autoPlayback', 'autoPlay')).toBe(false);
    expect(hasAttribute(' aria-label="x"', 'aria-label')).toBe(true);
  });
});
