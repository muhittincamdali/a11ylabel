// Reads files of the checked project. Their names and symbolic links come from the project, so a
// file is read only when it is a regular file and, unless the caller says otherwise, inside the
// project folder: a link to /dev/zero or a FIFO would never end, and a link out of the project
// would read a file the user did not ask to check.
import { constants } from 'node:fs';
import { type FileHandle, open, realpath, stat } from 'node:fs/promises';
import { isAbsolute, relative, sep } from 'node:path';

export type ProjectFile =
  | { found: true; bytes: Buffer }
  | { found: false; reason: 'missing' | 'outside' | 'not-file' | 'too-large' };

/**
 * The largest project file a11ylabel reads: Info.plist, project.pbxproj, package.json and the
 * lock files. A large app's pbxproj or package-lock.json is a few MB; the limit keeps a file from
 * a pull request from costing more memory and time than a real project would.
 */
export const MAX_PROJECT_FILE_BYTES = 32_000_000;

/** A byte count for a report: 32000000 is "32 MB". */
export const megabytes = (bytes: number) => `${Math.round(bytes / 1_000_000)} MB`;

/** How a report says why a file was not read, after the file's name. */
export const NOT_READ = {
  missing: 'does not exist.',
  outside: 'is outside the project; it was not read.',
  'not-file': 'is not a file; it was not read.',
  'too-large': `is larger than ${megabytes(MAX_PROJECT_FILE_BYTES)}; it was not read.`,
} as const;

/** Whether `path` is `folder` or inside it (both already resolved with realpath). */
export function isInside(path: string, folder: string): boolean {
  const rest = relative(folder, path);
  return rest !== '..' && !rest.startsWith(`..${sep}`) && !isAbsolute(rest);
}

/**
 * Reads `path` when it is a regular file inside `root` of at most `maxBytes`. With `root` null
 * only the regular-file check applies, for files a package manager may link from outside the
 * project (node_modules).
 */
export async function readProjectFile(
  path: string,
  root: string | null,
  maxBytes = MAX_PROJECT_FILE_BYTES,
): Promise<ProjectFile> {
  let real: string;
  try {
    real = await realpath(path);
  } catch {
    return { found: false, reason: 'missing' };
  }
  if (root !== null && !isInside(real, await realpath(root).catch(() => root))) {
    return { found: false, reason: 'outside' };
  }
  let handle: FileHandle | undefined;
  try {
    // stat before open: opening a FIFO for reading waits for a writer.
    if (!(await stat(real)).isFile()) return { found: false, reason: 'not-file' };
    // The path may have been replaced since; O_NONBLOCK keeps a FIFO put there from blocking,
    // and the checks below are on the file actually opened.
    handle = await open(real, constants.O_RDONLY | (constants.O_NONBLOCK ?? 0));
    const info = await handle.stat();
    if (!info.isFile()) return { found: false, reason: 'not-file' };
    if (info.size > maxBytes) return { found: false, reason: 'too-large' };
    // The file may grow after the size check: read one byte past the limit at most, never more.
    const bytes = await readAtMost(handle, info.size, maxBytes + 1);
    if (bytes.length > maxBytes) return { found: false, reason: 'too-large' };
    return { found: true, bytes };
  } catch {
    return { found: false, reason: 'missing' };
  } finally {
    await handle?.close().catch(() => undefined);
  }
}

/** Bytes read after the expected size, per read, when a file has grown. */
const GROWTH_CHUNK = 65_536;

/**
 * The first `limit` bytes of the file at most. It asks for one byte more than `expected` (the size
 * from fstat) first, so a file that has not grown takes one read.
 */
export async function readAtMost(
  handle: FileHandle,
  expected: number,
  limit: number,
): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;
  let size = Math.min(expected + 1, limit);
  while (total < limit) {
    const chunk = Buffer.allocUnsafe(Math.min(size, limit - total));
    const { bytesRead } = await handle.read(chunk, 0, chunk.length, total);
    chunks.push(chunk.subarray(0, bytesRead));
    total += bytesRead;
    // A regular file reads short only at its end.
    if (bytesRead < chunk.length) break;
    size = GROWTH_CHUNK;
  }
  return Buffer.concat(chunks, total);
}

/** The text of `path` (see readProjectFile), or null when it is not read. */
export async function readProjectText(path: string, root: string | null): Promise<string | null> {
  const file = await readProjectFile(path, root);
  return file.found ? file.bytes.toString('utf8') : null;
}
