/**
 * a11ylabel shows which App Store Accessibility Nutrition Labels a native iOS, Flutter or React
 * Native/Expo app can claim, what in its code blocks each one, and how to fix it.
 *
 * ```js
 * import { render, scan } from '@mcamdali/a11ylabel';
 *
 * const report = await scan('path/to/app');
 * for (const label of report.labels) console.log(label.name, label.status);
 * console.log(render(report, 'markdown'));
 * ```
 *
 * The command-line tool is `a11ylabel`; this module is the same scan for scripts.
 *
 * @packageDocumentation
 */
export {
  type CliEnvironment,
  EXIT,
  FAIL_ON,
  failsOn,
  PACKAGE_NAME,
  parseLabels,
  run,
} from './cli/run.js';
export { type Ecosystem, ProjectError } from './detect/project.js';
export type {
  Finding,
  FixAdvice,
  LabelStatus,
  LabelSummary,
  Report,
  SignalSummary,
  TargetSummary,
  Verdict,
  VerdictCode,
  VersionInfo,
} from './model.js';
export { SCHEMA_VERSION } from './model.js';
export { FORMATS, type Format, render, type TtyOptions } from './report/index.js';
export {
  COVERAGES,
  type Coverage,
  FIX_VARIANTS,
  type FixVariant,
  LABEL_IDS,
  type Label,
  type LabelId,
  labelSchema,
  RULE_DATA,
  RULE_IDS,
  type Rule,
  type RuleData,
  type RuleFix,
  type RuleId,
  type RuleSource,
  ruleDataSchema,
  ruleFixSchema,
  ruleSchema,
  ruleSourceSchema,
  SEVERITIES,
  type Severity,
  type Signal,
  signalSchema,
} from './rules/data.js';
export { labelStatus, type ScanOptions, scan, verdictOf } from './scan.js';
export { VERSION } from './version.js';
