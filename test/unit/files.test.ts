import { writeFileSync } from 'node:fs';
import { open } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MAX_PROJECT_FILE_BYTES,
  NOT_READ,
  readAtMost,
  readProjectFile,
} from '../../src/core/files.js';
import { tree } from '../helpers/tree.js';

describe('readProjectFile', () => {
  it('reads a regular file inside the project up to the limit', async () => {
    const root = tree({ 'Info.plist': 'x'.repeat(10) });
    const file = await readProjectFile(join(root, 'Info.plist'), root, 10);
    expect(file.found && file.bytes.length).toBe(10);
  });

  it('does not read a file over the limit', async () => {
    const root = tree({ 'Info.plist': 'x'.repeat(11) });
    expect(await readProjectFile(join(root, 'Info.plist'), root, 10)).toEqual({
      found: false,
      reason: 'too-large',
    });
  });

  it('uses the project file limit by default and says it in the note', async () => {
    const root = tree({});
    const path = join(root, 'Info.plist');
    writeFileSync(path, Buffer.alloc(MAX_PROJECT_FILE_BYTES + 1));
    expect(await readProjectFile(path, root)).toEqual({ found: false, reason: 'too-large' });
    expect(NOT_READ['too-large']).toBe('is larger than 32 MB; it was not read.');
  });
});

describe('readAtMost', () => {
  const read = async (size: number, expected: number, limit: number) => {
    const root = tree({ 'Info.plist': 'x'.repeat(size) });
    const handle = await open(join(root, 'Info.plist'));
    try {
      return (await readAtMost(handle, expected, limit)).length;
    } finally {
      await handle.close();
    }
  };

  it('reads a file of the expected size whole', async () => {
    expect(await read(10, 10, 11)).toBe(10);
    expect(await read(0, 0, 11)).toBe(0);
  });

  it('stops one byte past the limit when the file grew after its size was read', async () => {
    // fstat said 10 bytes; the file now holds 200 000. Only limit bytes reach memory.
    expect(await read(200_000, 10, 11)).toBe(11);
    expect(await read(200_000, 10, 100_001)).toBe(100_001);
  });

  it('reads all of a file that grew but stays under the limit', async () => {
    expect(await read(70_000, 10, 100_001)).toBe(70_000);
  });
});
