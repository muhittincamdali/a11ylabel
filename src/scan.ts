// Scans one project: detects it, reads it, runs the rules and builds the report with a status for
// each Accessibility Nutrition Label.
import { type AppModel, collectApp, STYLE_KEY, shownPath } from './collect/app.js';
import { detectProject } from './detect/project.js';
import type {
  Finding,
  LabelStatus,
  LabelSummary,
  Report,
  TargetSummary,
  Verdict,
  VersionInfo,
} from './model.js';
import { SCHEMA_VERSION } from './model.js';
import { REPOSITORY_URL } from './report/text.js';
import { checkApp, findSignals } from './rules/check.js';
import {
  LABEL_IDS,
  type LabelId,
  labelById,
  RULE_DATA,
  type RuleId,
  ruleById,
  type Severity,
} from './rules/data.js';
import type { Hit } from './rules/hit.js';
import { HIT_LIMITS } from './rules/limit.js';
import { VERSION } from './version.js';

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warning: 1, info: 2 };

export interface ScanOptions {
  /** The labels to check; all nine when left out. */
  labels?: readonly LabelId[];
}

function toFinding(hit: Hit, root: string): Finding {
  const rule = ruleById(hit.rule);
  const variant = rule.fixes[hit.variant] ? hit.variant : Object.keys(rule.fixes)[0];
  const fix = variant ? rule.fixes[variant as keyof typeof rule.fixes] : undefined;
  return {
    rule: hit.rule,
    labels: rule.labels,
    severity: rule.severity,
    title: rule.title,
    message: hit.message,
    file: shownPath(hit.file, root),
    line: hit.line,
    target: hit.target ?? null,
    fix: fix
      ? {
          id: `${hit.rule}/${variant}`,
          title: fix.title,
          steps: fix.steps,
          guide: `${REPOSITORY_URL}/blob/main/${fix.guide}`,
        }
      : null,
    sources: rule.sources,
  };
}

function byPlace(left: Finding, right: Finding): number {
  return (
    SEVERITY_ORDER[left.severity] - SEVERITY_ORDER[right.severity] ||
    left.rule.localeCompare(right.rule) ||
    left.file.localeCompare(right.file) ||
    (left.line ?? 0) - (right.line ?? 0)
  );
}

const count = (findings: readonly Finding[], severity: Severity) =>
  findings.filter((item) => item.severity === severity).length;

const COUNT_KEY = { error: 'errors', warning: 'warnings', info: 'info' } as const;

/**
 * Errors, warnings and info of the listed findings and the hits not listed (counted by rule),
 * for the label `id`, or for all labels when it is left out.
 */
function countsOf(
  findings: readonly Finding[],
  notListed: ReadonlyArray<readonly [RuleId, number]>,
  id?: LabelId,
): Report['summary'] {
  const totals = { errors: 0, warnings: 0, info: 0 };
  const add = (severity: Severity, labels: readonly LabelId[], amount: number) => {
    if (id === undefined || labels.includes(id)) totals[COUNT_KEY[severity]] += amount;
  };
  for (const item of findings) add(item.severity, item.labels, 1);
  for (const [rule, amount] of notListed) {
    const { severity, labels } = ruleById(rule);
    add(severity, labels, amount);
  }
  return totals;
}

/** The note that says how many findings the report leaves out; null when it lists them all. */
function notListedNote(notListed: ReadonlyArray<readonly [RuleId, number]>): string | null {
  const total = notListed.reduce((sum, [, amount]) => sum + amount, 0);
  if (total === 0) return null;
  const byRule = [...notListed]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([rule, amount]) => `${rule}: ${amount}`)
    .join(', ');
  return `${total === 1 ? '1 more finding is' : `${total} more findings are`} not listed (${byRule}): a report lists at most ${HIT_LIMITS.perFile} findings of a rule per file and ${HIT_LIMITS.perRule} per project. The counts include them.`;
}

/** The status of one label from its findings; see LabelStatus. */
export function labelStatus(
  id: LabelId,
  findings: readonly Finding[],
  notKnown: ReadonlySet<LabelId> = new Set(),
): LabelStatus {
  const own = findings.filter((item) => item.labels.includes(id));
  if (count(own, 'error') > 0) return 'blocked';
  if (count(own, 'warning') > 0) return 'review';
  const { coverage } = labelById(id);
  if (coverage === 'manual' || coverage === 'hint') return 'manual';
  return notKnown.has(id) ? 'not-known' : 'no-blocker';
}

const names = (labels: readonly LabelSummary[]) => labels.map((label) => label.name).join(', ');
const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

/** The one-line verdict over the labels in scope. */
export function verdictOf(labels: readonly LabelSummary[]): Verdict {
  const blocked = labels.filter((label) => label.status === 'blocked');
  const review = labels.filter((label) => label.status === 'review');
  const notKnown = labels.filter((label) => label.status === 'not-known');
  const clear = labels.filter((label) => label.status === 'no-blocker');
  const rest = [
    review.length > 0 ? `${review.length} to review` : '',
    notKnown.length > 0 ? `${notKnown.length} not known` : '',
    clear.length > 0 ? `no blocker found for ${clear.length}` : '',
  ].filter(Boolean);
  const tail = rest.length > 0 ? `; ${rest.join(', ')}` : '';
  if (blocked.length > 0) {
    return {
      code: 'blocked',
      text: `${blocked.length === 1 ? '1 label' : `${blocked.length} labels`} blocked by the code (${names(blocked)})${tail}`,
    };
  }
  if (notKnown.length > 0) {
    return {
      code: 'not-known',
      text: `Not known for ${names(notKnown)}: a file that decides it was not read (see the notes)${review.length > 0 ? `; ${review.length} to review` : ''}`,
    };
  }
  if (review.length > 0) {
    return {
      code: 'review',
      text: `No label blocked; ${plural(review.length, 'label')} to review (${names(review)})`,
    };
  }
  const manual = labels.length - clear.length;
  return {
    code: 'no-blockers',
    text: `No blockers found in the code${clear.length > 0 ? ` for ${names(clear)}` : ''}${manual > 0 ? `; ${manual} more to check by hand` : ''}`,
  };
}

function targetsOf(app: AppModel): TargetSummary[] {
  return app.targets.map((target) => {
    const fromPlist = target.infoPlists
      .map((plist) => plist.dict[STYLE_KEY])
      .find((value) => typeof value === 'string');
    return {
      name: target.name,
      infoPlists: target.infoPlists.map((plist) => shownPath(plist.path, app.project.root)),
      interfaceStyle: (fromPlist as string | undefined) ?? target.styleSetting?.value ?? null,
      deploymentTarget: target.deploymentTarget,
    };
  });
}

/** Scans the project at `path` (absolute) and returns the report. */
export async function scan(path: string, options: ScanOptions = {}): Promise<Report> {
  const project = await detectProject(path);
  const app = await collectApp(project);
  const scope = LABEL_IDS.filter((id) => !options.labels || options.labels.includes(id));
  const inScope = (rule: RuleId) => ruleById(rule).labels.some((label) => scope.includes(label));
  const hits = checkApp(app);
  const findings = hits.listed
    .filter((hit) => inScope(hit.rule))
    .map((hit) => toFinding(hit, project.root))
    .sort(byPlace);
  const notListed = [...hits.notListed].filter(([rule]) => inScope(rule));
  const signals = findSignals(app.sources);
  const notKnown = new Set<LabelId>();
  const unreadPlist = app.targets.some((target) => target.unreadInfoPlist);
  if (unreadPlist || app.appNotChecked) notKnown.add('dark-interface');
  const labels: LabelSummary[] = scope.map((id) => {
    const label = labelById(id);
    return {
      id,
      name: label.name,
      status: labelStatus(id, findings, notKnown),
      coverage: label.coverage,
      criteria: label.criteria,
      counts: countsOf(findings, notListed, id),
      signals: signals
        .filter((signal) => signal.label === id)
        .map((signal) => ({
          text: signal.text,
          file: shownPath(signal.file, project.root),
          files: signal.files,
        })),
      checked: label.checked,
      manual: label.manual,
    };
  });
  const versions: VersionInfo[] = [...project.packages.values()].map((item) => ({
    name: item.name,
    version: item.version,
    source: item.source,
  }));
  if (project.flutter?.version) {
    versions.push({ name: 'flutter', version: project.flutter.version, source: 'pinned' });
  }
  const notes = [...app.notes];
  if (project.expoConfig && project.expoConfig.json === null) {
    notes.push(
      `${project.expoConfig.file} is read as text, not run: a userInterfaceStyle set through a variable or a config plugin is not seen.`,
    );
  }
  if (unreadPlist) {
    notes.push("An Info.plist could not be read, so the app's UIUserInterfaceStyle is not known.");
  }
  const leftOut = notListedNote(notListed);
  if (leftOut) notes.push(leftOut);
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { name: 'a11ylabel', version: VERSION },
    rules: { ruleSet: RULE_DATA.ruleSet, dataVersion: RULE_DATA.dataVersion, read: RULE_DATA.read },
    project: {
      path,
      name: project.name,
      ecosystem: project.ecosystem,
      versions,
      targets: targetsOf(app),
    },
    scope,
    verdict: verdictOf(labels),
    labels,
    findings,
    notes,
    summary: countsOf(findings, notListed),
  };
}
