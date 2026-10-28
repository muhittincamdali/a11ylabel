// Runs a11ylabel from JavaScript on several apps and prints one row per project folder with the status of
// each Accessibility Nutrition Label: a quick view of which labels a team can work towards.
//
//   node examples/api/label-matrix.mjs [project ...]
//
// Without arguments it checks the fixtures in this repository. In your own code, install
// @mcamdali/a11ylabel and pass the folders of your apps.
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LABEL_IDS, scan } from '@mcamdali/a11ylabel';

const SHORT = {
  blocked: 'BLOCKED',
  review: 'review',
  'no-blocker': 'ok',
  'not-known': '?',
  manual: '·',
};
const COLUMNS = {
  voiceover: 'VO',
  'voice-control': 'VC',
  'larger-text': 'Text',
  'dark-interface': 'Dark',
  'differentiate-without-color': 'Color',
  'sufficient-contrast': 'Contr',
  'reduced-motion': 'Motion',
  captions: 'Capt',
  'audio-descriptions': 'AD',
};

const root = fileURLToPath(new URL('../../', import.meta.url));
const projects =
  process.argv.length > 2
    ? process.argv.slice(2)
    : [
        'native-swiftui-blocked',
        'native-swiftui-ready',
        'native-uikit',
        'flutter-tide',
        'rn-088-courier',
        'expo-58-default',
      ].map((name) => `${root}fixtures/${name}`);

const reports = await Promise.all(projects.map((path) => scan(path)));
// The folder names the app: two folders can hold apps of the same name.
const names = reports.map((report) => basename(report.project.path));
const width = Math.max(...names.map((name) => name.length), 'Project'.length) + 2;
console.log(
  ['Project'.padEnd(width), ...LABEL_IDS.map((id) => COLUMNS[id].padEnd(8))].join('').trimEnd(),
);
reports.forEach((report, index) => {
  const cells = report.labels.map((label) => SHORT[label.status].padEnd(8));
  console.log([(names[index] ?? '').padEnd(width), ...cells].join('').trimEnd());
});
console.log(
  '\nBLOCKED: an error in the code · review: warnings · ok: none found · ·: check by hand',
);
