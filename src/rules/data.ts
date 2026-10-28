// The rule data: the nine Accessibility Nutrition Labels, what each rule says, its sources and its
// fixes, from rules/nutrition-labels.json. The checks in this folder decide where a rule applies;
// the words come from the data file, so a rule's text and sources can be reviewed without code.
import { readFileSync } from 'node:fs';
import { z } from 'zod';

export const SEVERITIES = ['error', 'warning', 'info'] as const;
export type Severity = (typeof SEVERITIES)[number];

/** The labels App Store Connect asks about, in the order Apple recommends evaluating them. */
export const LABEL_IDS = [
  'voiceover',
  'voice-control',
  'larger-text',
  'dark-interface',
  'differentiate-without-color',
  'sufficient-contrast',
  'reduced-motion',
  'captions',
  'audio-descriptions',
] as const;
export type LabelId = (typeof LABEL_IDS)[number];

/**
 * How much of a label a11ylabel can see in code: `checked`, its blockers; `partial`, some of
 * them; `hint`, only whether it applies or a related setting; `manual`, nothing.
 */
export const COVERAGES = ['checked', 'partial', 'hint', 'manual'] as const;
export type Coverage = (typeof COVERAGES)[number];

export const RULE_IDS = [
  'A11Y101',
  'A11Y102',
  'A11Y103',
  'A11Y104',
  'A11Y201',
  'A11Y202',
  'A11Y203',
  'A11Y204',
  'A11Y205',
  'A11Y301',
  'A11Y302',
  'A11Y303',
  'A11Y304',
  'A11Y401',
  'A11Y402',
  'A11Y501',
  'A11Y601',
] as const;
export type RuleId = (typeof RULE_IDS)[number];

/** Which fix of a rule applies: by where the finding is, or what kind of code it is in. */
export const FIX_VARIANTS = [
  'info-plist',
  'build-setting',
  'expo-config',
  'asset-catalog',
  'uikit',
  'swiftui',
  'react-native',
  'flutter',
] as const;
export type FixVariant = (typeof FIX_VARIANTS)[number];

/** One source a rule cites. */
export const ruleSourceSchema = z.object({
  title: z.string().min(1),
  url: z.url({ protocol: /^https$/ }),
});
export type RuleSource = z.infer<typeof ruleSourceSchema>;

/** One fix of a rule: what to do, step by step, and the guide section. */
export const ruleFixSchema = z.object({
  title: z.string().min(1),
  steps: z.array(z.string().min(1)).min(1),
  guide: z.string().regex(/^docs\/guides\/[\w-]+\.md(?:#[\w-]+)?$/),
});
export type RuleFix = z.infer<typeof ruleFixSchema>;

/** One rule of the rule data. */
export const ruleSchema = z.object({
  id: z.enum(RULE_IDS),
  labels: z.array(z.enum(LABEL_IDS)).min(1),
  severity: z.enum(SEVERITIES),
  title: z.string().min(1),
  summary: z.string().min(1),
  sources: z.array(ruleSourceSchema).min(1),
  fixes: z.partialRecord(z.enum(FIX_VARIANTS), ruleFixSchema),
});
export type Rule = z.infer<typeof ruleSchema>;

/** One Accessibility Nutrition Label, with Apple's criteria page and what a11ylabel checks. */
export const labelSchema = z.object({
  id: z.enum(LABEL_IDS),
  name: z.string().min(1),
  criteria: z.url({ protocol: /^https$/ }),
  coverage: z.enum(COVERAGES),
  /** What a11ylabel looks for in code. */
  checked: z.string().min(1),
  /** What only a person using the app can check. */
  manual: z.string().min(1),
});
export type Label = z.infer<typeof labelSchema>;

/** A pattern that shows the app already does something for a label, e.g. reads Reduce Motion. */
export const signalSchema = z.object({
  label: z.enum(LABEL_IDS),
  text: z.string().min(1),
  pattern: z.string().min(1),
});
export type Signal = z.infer<typeof signalSchema>;

/** The shape of rules/nutrition-labels.json; rules/schema.json is generated from it. */
export const ruleDataSchema = z.object({
  $schema: z.string().optional(),
  ruleSet: z.literal('nutrition-labels'),
  dataVersion: z.string().regex(/^\d{4}\.\d{2}\.\d{2}$/),
  /** The day the cited pages were read. */
  read: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  labels: z.array(labelSchema),
  rules: z.array(ruleSchema),
  signals: z.array(signalSchema),
});
export type RuleData = z.infer<typeof ruleDataSchema>;

/** Parses and checks rule data: every rule and every label appears exactly once, in order. */
export function parseRuleData(json: unknown): RuleData {
  const data = ruleDataSchema.parse(json);
  const check = (kind: string, ids: readonly string[], expected: readonly string[]) => {
    const missing = expected.filter((id) => !ids.includes(id));
    const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (missing.length > 0) throw new Error(`Rule data has no ${kind} ${missing.join(', ')}.`);
    if (repeated.length > 0) throw new Error(`Rule data repeats ${kind} ${repeated.join(', ')}.`);
  };
  check(
    'rule',
    data.rules.map((item) => item.id),
    RULE_IDS,
  );
  check(
    'label',
    data.labels.map((item) => item.id),
    LABEL_IDS,
  );
  return data;
}

// src/ and dist/ are both one level below the package root.
export const RULE_DATA: RuleData = parseRuleData(
  JSON.parse(readFileSync(new URL('../../rules/nutrition-labels.json', import.meta.url), 'utf8')),
);

const RULES = new Map(RULE_DATA.rules.map((item) => [item.id, item]));
const LABELS = new Map(RULE_DATA.labels.map((item) => [item.id, item]));

export function ruleById(id: RuleId): Rule {
  const found = RULES.get(id);
  if (!found) throw new Error(`Unknown rule ${id}`);
  return found;
}

export function labelById(id: LabelId): Label {
  const found = LABELS.get(id);
  if (!found) throw new Error(`Unknown label ${id}`);
  return found;
}
