import { describe, expect, it } from 'vitest';
import { inAnyRange } from '../../src/core/ranges.js';

/** The same answer as checking every range, the way the rules did before. */
const naive =
  (ranges: { start: number; end: number }[]) =>
  (offset: number): boolean =>
    ranges.some((range) => offset >= range.start && offset <= range.end);

describe('inAnyRange', () => {
  it('finds nothing in no ranges', () => {
    expect(inAnyRange([])(0)).toBe(false);
  });

  it('includes both ends of a range', () => {
    const inside = inAnyRange([{ start: 10, end: 20 }]);
    expect([9, 10, 15, 20, 21].map(inside)).toEqual([false, true, true, true, false]);
  });

  it('reads unsorted, nested, overlapping and adjacent ranges', () => {
    const ranges = [
      { start: 50, end: 60 },
      { start: 0, end: 30 },
      { start: 5, end: 8 },
      { start: 25, end: 40 },
      { start: 61, end: 62 },
      { start: 70, end: 70 },
      { start: 80, end: 79 },
    ];
    const inside = inAnyRange(ranges);
    for (let offset = -1; offset < 90; offset++) {
      expect(inside(offset), `offset ${offset}`).toBe(naive(ranges)(offset));
    }
  });

  it('agrees with checking every range on random ranges', () => {
    let seed = 7;
    const random = (limit: number) => {
      seed = (seed * 1_103_515_245 + 12_345) % 2_147_483_648;
      return seed % limit;
    };
    for (let round = 0; round < 50; round++) {
      const ranges = Array.from({ length: random(12) }, () => {
        const start = random(200);
        return { start, end: start + random(30) - 3 };
      });
      const inside = inAnyRange(ranges);
      for (let offset = 0; offset < 240; offset++) {
        expect(inside(offset)).toBe(naive(ranges)(offset));
      }
    }
  });
});
