// Runs every rule on a collected project, and finds the signals: code showing that the app
// already does something for a label (reads Reduce Motion, uses text styles, …).
import type { AppModel } from '../collect/app.js';
import type { SourceFile } from '../collect/sources.js';
import { checkDarkInterface } from './dark-interface.js';
import { type LabelId, RULE_DATA } from './data.js';
import type { Hit } from './hit.js';
import { checkLabels } from './labels.js';
import { checkLargerText } from './larger-text.js';
import { checkContrastVariants, checkVideo } from './media.js';
import { checkMotion } from './motion.js';

export function checkApp(app: AppModel): Hit[] {
  const { sources } = app;
  return [
    ...sources.flatMap(checkLargerText),
    ...checkDarkInterface(app),
    ...checkMotion(sources, app.project.root),
    ...sources.flatMap(checkLabels),
    ...checkContrastVariants(app.colors),
    ...sources.flatMap(checkVideo),
  ];
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
