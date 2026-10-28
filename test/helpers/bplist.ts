// Writes small binary property lists object by object, for tests that need a file no tool would
// write: shared references, deep nesting, hostile keys. References are 2 bytes, offsets 4 bytes.

export type BinaryObject =
  | { array: number[] }
  | { dict: [key: number, value: number][] }
  | { ascii: string }
  | { true: true };

const REF_SIZE = 2;
const OFFSET_SIZE = 4;

function lengthMarker(type: number, length: number): number[] {
  if (length < 15) return [(type << 4) | length];
  // 0xF in the low nibble, then an integer object with the length (2 bytes).
  return [(type << 4) | 0xf, 0x11, length >> 8, length & 0xff];
}

const ref = (index: number) => [index >> 8, index & 0xff];

function encode(object: BinaryObject): number[] {
  if ('true' in object) return [0x09];
  if ('ascii' in object) {
    return [...lengthMarker(0x5, object.ascii.length), ...Buffer.from(object.ascii, 'latin1')];
  }
  if ('array' in object)
    return [...lengthMarker(0xa, object.array.length), ...object.array.flatMap(ref)];
  const keys = object.dict.flatMap(([key]) => ref(key));
  const values = object.dict.flatMap(([, value]) => ref(value));
  return [...lengthMarker(0xd, object.dict.length), ...keys, ...values];
}

/** A bplist00 file whose top object is the first of `objects`. */
export function binaryPlist(objects: BinaryObject[]): Uint8Array {
  const magic = Buffer.from('bplist00', 'latin1');
  const bodies = objects.map((object) => Buffer.from(encode(object)));
  const offsets: number[] = [];
  let position = magic.length;
  for (const body of bodies) {
    offsets.push(position);
    position += body.length;
  }
  const table = Buffer.alloc(offsets.length * OFFSET_SIZE);
  offsets.forEach((offset, index) => {
    table.writeUInt32BE(offset, index * OFFSET_SIZE);
  });
  const trailer = Buffer.alloc(32);
  trailer[6] = OFFSET_SIZE;
  trailer[7] = REF_SIZE;
  trailer.writeBigUInt64BE(BigInt(objects.length), 8);
  trailer.writeBigUInt64BE(0n, 16);
  trailer.writeBigUInt64BE(BigInt(position), 24);
  return Uint8Array.from(Buffer.concat([magic, ...bodies, table, trailer]));
}

/**
 * The audit's amplification file: a dictionary {"k": a1} where each array a1 … a`depth` holds
 * `width` references to the next one. It is under 2 KB at depth 4 and width 200, and names
 * 200^4 = 1.6 billion values.
 */
export function sharedReferencePlist(depth: number, width: number): Uint8Array {
  const objects: BinaryObject[] = [{ dict: [[1, 2]] }, { ascii: 'k' }];
  for (let level = 0; level < depth; level++) {
    objects.push({ array: Array.from({ length: width }, () => 2 + level + 1) });
  }
  objects.push({ true: true });
  return binaryPlist(objects);
}
