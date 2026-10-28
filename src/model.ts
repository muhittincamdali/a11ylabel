// The report a11ylabel produces: one project, the status of each Accessibility Nutrition Label,
// and what was found. The JSON output is this structure as-is (schemaVersion 0, which may change
// before 1.0).
import type { Ecosystem } from './detect/project.js';
import type { Coverage, LabelId, RuleId, RuleSource, Severity } from './rules/data.js';

export const SCHEMA_VERSION = 0;

/** The fix a11ylabel suggests for a finding, from the rule data. */
export interface FixAdvice {
  /** The rule and the variant of its fix, e.g. "A11Y102/swiftui"; the same fix has the same id. */
  id: string;
  title: string;
  steps: string[];
  /** Link to the a11ylabel guide section for this kind of code. */
  guide: string;
}

export interface Finding {
  rule: RuleId;
  /** The labels this finding stands in the way of. */
  labels: LabelId[];
  severity: Severity;
  title: string;
  /** What was found at this place, in one sentence. */
  message: string;
  /** Path relative to the checked folder, with forward slashes. */
  file: string;
  line: number | null;
  /** The app target the finding belongs to, when it is about one target's Info.plist. */
  target: string | null;
  fix: FixAdvice | null;
  sources: RuleSource[];
}

/**
 * What the code says about claiming a label:
 * - `blocked`: an error, which keeps the label from being claimed for the whole app;
 * - `review`: warnings, places that may stop people from completing a task;
 * - `no-blocker`: nothing found in the code a11ylabel checks for this label;
 * - `not-known`: a file that decides the label could not be read;
 * - `manual`: a label code cannot decide (info findings and signals may still help).
 *
 * None of them replaces testing the app's common tasks with the feature on, which Apple asks for
 * before a label is claimed.
 */
export type LabelStatus = 'blocked' | 'review' | 'no-blocker' | 'not-known' | 'manual';

/** Code that shows the app already does something for a label. */
export interface SignalSummary {
  text: string;
  /** The first file, by path, that shows it. */
  file: string;
  /** How many files show it. */
  files: number;
}

export interface LabelSummary {
  id: LabelId;
  name: string;
  status: LabelStatus;
  coverage: Coverage;
  /** Apple's evaluation criteria for the label. */
  criteria: string;
  counts: { errors: number; warnings: number; info: number };
  signals: SignalSummary[];
  /** What a11ylabel looks for in code, and what only a person can check. */
  checked: string;
  manual: string;
}

export interface TargetSummary {
  name: string;
  /** Info.plist paths relative to the checked folder that a11ylabel read. */
  infoPlists: string[];
  /** UIUserInterfaceStyle from the Info.plist or build settings, as written; null when unset. */
  interfaceStyle: string | null;
  /** IPHONEOS_DEPLOYMENT_TARGET, the lowest over the target's configurations. */
  deploymentTarget: string | null;
}

/** The verdict over the labels in scope, most serious first. */
export type VerdictCode = 'blocked' | 'not-known' | 'review' | 'no-blockers';

export interface Verdict {
  code: VerdictCode;
  text: string;
}

export interface VersionInfo {
  name: string;
  version: string | null;
  /** installed, lockfile, declared (lowest version the range allows) or pinned (Flutter). */
  source: string;
}

export interface Report {
  schemaVersion: typeof SCHEMA_VERSION;
  tool: { name: 'a11ylabel'; version: string };
  /** The rule data, and the day its sources were read. */
  rules: { ruleSet: string; dataVersion: string; read: string };
  project: {
    /** The folder as given on the command line. */
    path: string;
    name: string;
    ecosystem: Ecosystem;
    versions: VersionInfo[];
    targets: TargetSummary[];
  };
  /** The labels checked: all nine unless --labels names fewer. */
  scope: LabelId[];
  verdict: Verdict;
  labels: LabelSummary[];
  findings: Finding[];
  /** Things a11ylabel could not check or that the reader should know. */
  notes: string[];
  summary: { errors: number; warnings: number; info: number };
}
