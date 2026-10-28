// How many findings a report lists. Sources can come from a pull request: a 4 MB file with a
// trigger on every line gives about 100,000 hits, and listing each one made a report of hundreds
// of MB that the Markdown and JSON output could not even build. The hits over the limits are
// counted by rule, so the label counts and the summary still include them.
import type { RuleId } from './data.js';
import type { Hit } from './hit.js';

export interface HitLimits {
  /** Hits of one rule listed for one file. */
  perFile: number;
  /** Hits of one rule listed for the whole project. */
  perRule: number;
}

/** With 17 rules, a report lists at most 1,700 findings. */
export const HIT_LIMITS: Readonly<HitLimits> = { perFile: 20, perRule: 100 };

export interface LimitedHits {
  /** The hits the report lists, in the order they were found. */
  listed: Hit[];
  /** How many hits of each rule were over the limits and are not listed. */
  notListed: Map<RuleId, number>;
}

/**
 * Keeps the hits within `limits`, reading the groups one at a time so that only one group (the
 * hits of one check on one file) is held in full. The first hit of a rule is always listed, so a
 * label's status is the same from the listed hits as from all of them.
 */
export function limitHits(
  groups: Iterable<readonly Hit[]>,
  limits: Readonly<HitLimits> = HIT_LIMITS,
): LimitedHits {
  const listed: Hit[] = [];
  const notListed = new Map<RuleId, number>();
  const perRule = new Map<RuleId, number>();
  const perFile = new Map<string, number>();
  for (const group of groups) {
    for (const hit of group) {
      const key = `${hit.rule}\u0000${hit.file}`;
      const inFile = perFile.get(key) ?? 0;
      const inRule = perRule.get(hit.rule) ?? 0;
      if (inFile >= limits.perFile || inRule >= limits.perRule) {
        notListed.set(hit.rule, (notListed.get(hit.rule) ?? 0) + 1);
        continue;
      }
      perFile.set(key, inFile + 1);
      perRule.set(hit.rule, inRule + 1);
      listed.push(hit);
    }
  }
  return { listed, notListed };
}
