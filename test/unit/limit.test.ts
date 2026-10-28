import { describe, expect, it } from 'vitest';
import type { Hit } from '../../src/rules/hit.js';
import { limitHits } from '../../src/rules/limit.js';

const hits = (rule: Hit['rule'], file: string, count: number): Hit[] =>
  Array.from({ length: count }, (_, index) => ({
    rule,
    file,
    line: index + 1,
    message: 'm',
    variant: 'swiftui',
  }));

describe('limitHits', () => {
  it('lists every hit under the limits', () => {
    const { listed, notListed } = limitHits([hits('A11Y104', '/a.swift', 3)]);
    expect(listed).toHaveLength(3);
    expect(notListed.size).toBe(0);
  });

  it('lists at most perFile hits of a rule in one file and counts the rest', () => {
    const { listed, notListed } = limitHits([hits('A11Y104', '/a.swift', 50)], {
      perFile: 20,
      perRule: 100,
    });
    expect(listed.map((hit) => hit.line)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    expect(notListed.get('A11Y104')).toBe(30);
  });

  it('lists at most perRule hits of a rule in the project, over files', () => {
    const groups = Array.from({ length: 10 }, (_, index) =>
      hits('A11Y301', `/f${index}.swift`, 20),
    );
    const { listed, notListed } = limitHits(groups, { perFile: 20, perRule: 100 });
    expect(listed).toHaveLength(100);
    expect(new Set(listed.map((hit) => hit.file))).toEqual(
      new Set(['/f0.swift', '/f1.swift', '/f2.swift', '/f3.swift', '/f4.swift']),
    );
    expect(notListed.get('A11Y301')).toBe(100);
  });

  it('keeps the limits of each rule apart, and always lists the first hit of a rule', () => {
    const { listed, notListed } = limitHits(
      [
        hits('A11Y104', '/a.swift', 5),
        hits('A11Y301', '/a.swift', 5),
        hits('A11Y401', '/b.swift', 1),
      ],
      { perFile: 2, perRule: 3 },
    );
    expect(listed.map((hit) => hit.rule)).toEqual([
      'A11Y104',
      'A11Y104',
      'A11Y301',
      'A11Y301',
      'A11Y401',
    ]);
    expect(Object.fromEntries(notListed)).toEqual({ A11Y104: 3, A11Y301: 3 });
  });
});
