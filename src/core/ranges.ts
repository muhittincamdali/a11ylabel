// Whether an offset lies in any of a file's ranges: the builder of a Flutter app, the
// defaultProps of React Native text, a Semantics call with a label. A file from a pull request
// can hold a hundred thousand of these ranges and as many hits to look up; checking every range
// for every hit took 5.6 s for one 3.6 MB Dart file, so the ranges are merged and sorted once and
// each lookup is a binary search.

/** A range of offsets that includes both `start` and `end`. */
export interface OffsetRange {
  start: number;
  end: number;
}

/** A test for whether an offset is in any of `ranges`: O(n log n) to build, O(log n) per call. */
export function inAnyRange(ranges: Iterable<OffsetRange>): (offset: number) => boolean {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  // Overlapping and nested ranges are merged, so at most one range can hold an offset: the last
  // one that starts at or before it.
  const starts: number[] = [];
  const ends: number[] = [];
  for (const { start, end } of sorted) {
    if (end < start) continue;
    const last = ends.length - 1;
    if (last >= 0 && start <= (ends[last] as number) + 1) {
      ends[last] = Math.max(ends[last] as number, end);
    } else {
      starts.push(start);
      ends.push(end);
    }
  }
  return (offset) => {
    let low = 0;
    let high = starts.length - 1;
    let found = -1;
    while (low <= high) {
      const middle = (low + high) >>> 1;
      if ((starts[middle] as number) <= offset) {
        found = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
    return found !== -1 && offset <= (ends[found] as number);
  };
}
