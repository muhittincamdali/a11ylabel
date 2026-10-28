// Runs every rule on a collected project, and finds the signals: code showing that the app
// already does something for a label (reads Reduce Motion, uses text styles, …).
import type { AppModel } from '../collect/app.js';
import type { SourceFile } from '../collect/sources.js';
import { checkDarkInterface } from './dark-interface.js';
import { type LabelId, RULE_DATA } from './data.js';
import type { Hit } from './hit.js';
import { checkLabels } from './labels.js';
import { checkLargerText } from './larger-text.js';
import { type LimitedHits, limitHits } from './limit.js';
import { checkContrastVariants, checkVideo } from './media.js';
import { checkFlutterMotionSetting, checkMotionIn, readsReduceMotion } from './motion.js';

/** The hits of each check, one file at a time, so that no more than one file's hits are held. */
function* hitGroups(app: AppModel): Generator<readonly Hit[]> {
  const { sources } = app;
  const { root } = app.project;
  const reactNative = app.project.packages.get('react-native')?.version ?? null;
  const reader = sources.find(readsReduceMotion) ?? null;
  yield checkDarkInterface(app);
  yield checkContrastVariants(app.colors);
  yield checkFlutterMotionSetting(sources);
  for (const file of sources) {
    yield checkLargerText(file, { reactNative });
    yield checkMotionIn(file, reader, root);
    yield checkLabels(file);
    yield checkVideo(file);
  }
}

/** Runs every rule on a collected project; see limitHits for what the report lists. */
export function checkApp(app: AppModel): LimitedHits {
  return limitHits(hitGroups(app));
}

const SIGNALS = RULE_DATA.signals.map((item) => ({
  label: item.label,
  text: item.text,
  pattern: new RegExp(item.pattern),
}));

/** A signal found in the code: what it shows, the first file (by path) and how many files. */
export interface SignalHit {
  label: LabelId;
  text: string;
  file: string;
  files: number;
}

export function findSignals(sources: readonly SourceFile[]): SignalHit[] {
  const found: SignalHit[] = [];
  for (const { label, text, pattern } of SIGNALS) {
    const files = sources.filter((source) => pattern.test(source.code));
    const first = files[0];
    if (first) found.push({ label, text, file: first.path, files: files.length });
  }
  return found;
}
