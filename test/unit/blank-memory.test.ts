// Blanking a long block comment with a regular expression replace held about 32 bytes per character
// for as long as the blanked file was kept: 32 source files of 3.9 MB, inside the 128 MB source
// budget, took 4 GB of heap and ended in a fatal out-of-memory error (exit code 134) at a heap
// limit near that of a 7 GB CI runner. The heap is measured in a child process, where gc() can
// be called.
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const BLANK_MODULE = new URL('../../src/collect/blank.ts', import.meta.url).href;
const KEPT = 4;
const MEGABYTE = 1_000_000;
/** One byte per character for the blanked file, and as much again for slack. */
const MAX_BYTES_PER_CHARACTER = 2;

/** Heap bytes held per character of `unit` repeated to 3.9 MB, blanked as Swift and kept. */
function heldPerCharacter(unit: string): number {
  const script = `
    const { blankCommentsAndStrings } = await import(${JSON.stringify(BLANK_MODULE)});
    const text = ${JSON.stringify(unit)}.repeat(Math.floor(3.9 * ${MEGABYTE} / ${unit.length}));
    const used = () => { globalThis.gc(); return process.memoryUsage().heapUsed; };
    const kept = [];
    const before = used();
    for (let i = 0; i < ${KEPT}; i++) kept.push(blankCommentsAndStrings(text, 'swift'));
    console.log((used() - before) / ${KEPT} / text.length);
  `;
  const output = execFileSync(
    process.execPath,
    ['--expose-gc', '--input-type=module', '-e', script],
    {
      encoding: 'utf8',
    },
  );
  return Number(output.trim());
}

describe('blankCommentsAndStrings memory', () => {
  it.each([
    ['a comment of nested openings', '/*'],
    ['a comment over many lines', '/* a\n'],
    ['a string literal', '"aaaa'],
  ])('holds about one byte per character of %s', (_, unit) => {
    expect(heldPerCharacter(unit)).toBeLessThan(MAX_BYTES_PER_CHARACTER);
  });
});
