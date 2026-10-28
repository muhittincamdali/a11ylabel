import { describe, expect, it } from 'vitest';
import { clip, clipOrNull, PROJECT_TEXT_LIMIT } from '../../src/core/clip.js';

describe('clip', () => {
  it('keeps a string up to the limit as it is', () => {
    const text = 'x'.repeat(PROJECT_TEXT_LIMIT);
    expect(clip(text)).toBe(text);
    expect(clip('Pantry')).toBe('Pantry');
  });

  it('cuts a longer string to the limit, ending in an ellipsis', () => {
    const clipped = clip('a '.repeat(10_000_000));
    expect(clipped).toHaveLength(PROJECT_TEXT_LIMIT);
    expect(clipped.endsWith('…')).toBe(true);
  });

  it('never splits a surrogate pair', () => {
    const clipped = clip(`${'x'.repeat(PROJECT_TEXT_LIMIT - 2)}😀😀`);
    expect(clipped).toBe(`${'x'.repeat(PROJECT_TEXT_LIMIT - 2)}…`);
    expect(/[\uD800-\uDBFF]$/.test(clipped.slice(0, -1))).toBe(false);
  });

  it('passes null through', () => {
    expect(clipOrNull(null)).toBeNull();
    expect(clipOrNull('y'.repeat(300))).toHaveLength(PROJECT_TEXT_LIMIT);
  });
});
