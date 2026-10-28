import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { ruleSchemaJson } from '../../scripts/rule-schema.ts';
import {
  LABEL_IDS,
  labelById,
  parseRuleData,
  RULE_DATA,
  RULE_IDS,
  ruleById,
} from '../../src/rules/data.js';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const raw = () => JSON.parse(readFileSync(`${ROOT}rules/nutrition-labels.json`, 'utf8'));

/** The first digit of a rule id names its label group. */
const GROUPS: Record<string, string[]> = {
  '1': ['larger-text'],
  '2': ['dark-interface'],
  '3': ['reduced-motion'],
  '4': ['voiceover', 'voice-control'],
  '5': ['sufficient-contrast'],
  '6': ['captions', 'audio-descriptions'],
};

describe('rules/nutrition-labels.json', () => {
  it('has every rule and every label once, in order', () => {
    expect(RULE_DATA.rules.map((rule) => rule.id)).toEqual([...RULE_IDS]);
    expect(RULE_DATA.labels.map((label) => label.id)).toEqual([...LABEL_IDS]);
  });

  it("links every label to Apple's evaluation criteria", () => {
    for (const label of RULE_DATA.labels) {
      expect(label.criteria).toBe(
        `https://developer.apple.com/help/app-store-connect/manage-app-accessibility/${label.id === 'differentiate-without-color' ? 'differentiate-without-color-alone' : label.id}-evaluation-criteria`,
      );
    }
  });

  it('cites a primary source over HTTPS for every rule', () => {
    const primary =
      /^https:\/\/(developer\.apple\.com|reactnative\.dev|react\.dev\/blog|docs\.expo\.dev|api\.flutter\.dev|docs\.swmansion\.com\/react-native-reanimated)\//;
    for (const rule of RULE_DATA.rules) {
      expect(rule.sources.length, rule.id).toBeGreaterThan(0);
      for (const source of rule.sources) expect(source.url, rule.id).toMatch(primary);
    }
  });

  it('links every fix to a guide section that exists', () => {
    // GitHub's heading anchors: lower case, punctuation dropped, spaces as hyphens.
    const slug = (heading: string) =>
      heading
        .toLowerCase()
        .replace(/[^\w\- ]/g, '')
        .replace(/ /g, '-');
    for (const rule of RULE_DATA.rules) {
      for (const fix of Object.values(rule.fixes)) {
        const [file = '', anchor] = fix.guide.split('#');
        expect(existsSync(`${ROOT}${file}`), `${rule.id} ${file}`).toBe(true);
        if (!anchor) continue;
        const headings = [...readFileSync(`${ROOT}${file}`, 'utf8').matchAll(/^#{2,3} (.+)$/gm)];
        expect(
          headings.map((match) => slug(match[1] as string)),
          `${rule.id} ${fix.guide}`,
        ).toContain(anchor);
      }
    }
  });

  it('puts each rule in the group of its labels', () => {
    for (const rule of RULE_DATA.rules) {
      const group = GROUPS[rule.id.charAt(4)] ?? [];
      for (const label of rule.labels) expect(group, rule.id).toContain(label);
    }
  });

  it('has a fix for every variant a check uses', () => {
    const native = ['swiftui', 'uikit'];
    const all = [...native, 'react-native', 'flutter'];
    const used: Record<string, string[]> = {
      A11Y101: all,
      A11Y102: all,
      A11Y103: all,
      A11Y104: native,
      A11Y201: ['info-plist', 'build-setting', 'expo-config'],
      A11Y202: ['info-plist'],
      A11Y203: all,
      A11Y204: ['flutter'],
      A11Y205: ['asset-catalog'],
      A11Y301: all,
      A11Y302: all,
      A11Y303: ['flutter'],
      A11Y304: ['react-native'],
      A11Y401: all,
      A11Y402: all,
      A11Y501: ['asset-catalog'],
      A11Y601: all,
    };
    for (const id of RULE_IDS) {
      expect(Object.keys(ruleById(id).fixes).sort(), id).toEqual([...(used[id] ?? [])].sort());
    }
  });

  it('keeps errors for what blocks a label for the whole app', () => {
    expect(
      RULE_DATA.rules.filter((rule) => rule.severity === 'error').map((rule) => rule.id),
    ).toEqual(['A11Y101', 'A11Y201']);
  });

  it('has signal patterns that compile, for labels that exist', () => {
    for (const signal of RULE_DATA.signals) {
      expect(() => new RegExp(signal.pattern)).not.toThrow();
      expect(LABEL_IDS).toContain(signal.label);
    }
  });

  it('matches the JSON Schema shipped for editors', () => {
    const committed = readFileSync(`${ROOT}rules/schema.json`, 'utf8');
    expect(committed, 'run node scripts/rule-schema.ts').toBe(ruleSchemaJson());
    expect(JSON.parse(committed).properties.rules.items.properties.id.enum).toEqual([...RULE_IDS]);
  });
});

describe('parseRuleData', () => {
  it('rejects a missing or repeated rule or label, an http source and an unknown variant', () => {
    const data = raw();
    expect(() => parseRuleData({ ...data, rules: data.rules.slice(1) })).toThrow(/no rule A11Y101/);
    expect(() => parseRuleData({ ...data, rules: [...data.rules, data.rules[0]] })).toThrow(
      /repeats rule A11Y101/,
    );
    expect(() => parseRuleData({ ...data, labels: data.labels.slice(1) })).toThrow(
      /no label voiceover/,
    );
    const http = structuredClone(data);
    http.rules[0].sources[0].url = 'http://developer.apple.com/x';
    expect(() => parseRuleData(http)).toThrow();
    const variant = structuredClone(data);
    variant.rules[0].fixes.android = variant.rules[0].fixes.flutter;
    expect(() => parseRuleData(variant)).toThrow();
  });

  it('throws for an unknown rule or label', () => {
    expect(() => ruleById('A11Y999' as never)).toThrow(/Unknown rule/);
    expect(() => labelById('haptics' as never)).toThrow(/Unknown label/);
  });
});
