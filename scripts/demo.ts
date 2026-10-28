// Records the README and guide demos as terminal SVGs (light and dark) in docs/media/:
//
// - CLI demos run the built a11ylabel on a fixture from the repository root, as a reader would.
//   The typed command is `a11ylabel`, the command Homebrew and the release tarball install; it
//   runs the same dist/cli/main.js this script runs.
// - Simulator sessions replay docs/media/simulator/<name>.txt, the output that
//   scripts/simulator-compare.sh printed on a Mac; they cannot be recorded in CI.
//
// Run with `npm run demo` (builds first).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { type Session, terminalSvg } from './terminal-svg.ts';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const MEDIA = `${ROOT}docs/media/`;

export interface Demo {
  name: string;
  fixture: string;
  /** Arguments after the fixture path. */
  args: string[];
  title: string;
  comment: string;
}

export const DEMOS: Demo[] = [
  {
    name: 'summary',
    fixture: 'native-swiftui-blocked',
    args: ['--summary'],
    title: 'a11ylabel · SwiftUI app, label table',
    comment: '# fixtures/native-swiftui-blocked: light appearance and a Dynamic Type limit',
  },
  {
    name: 'swiftui',
    fixture: 'native-swiftui-blocked',
    args: ['--labels', 'larger-text,dark-interface'],
    title: 'a11ylabel · SwiftUI app, Larger Text and Dark Interface',
    comment: '# the two blocked labels, with each finding and its fix',
  },
  {
    name: 'ready',
    fixture: 'native-swiftui-ready',
    args: [],
    title: 'a11ylabel · the same SwiftUI app after the fixes',
    comment: '# fixtures/native-swiftui-ready: no blockers; the video still needs a manual check',
  },
  {
    name: 'flutter',
    fixture: 'flutter-tide',
    args: ['--labels', 'larger-text,dark-interface,reduced-motion'],
    title: 'a11ylabel · Flutter app',
    comment: '# fixtures/flutter-tide: Flutter 3.47.5 app with a clamped text scale',
  },
  {
    name: 'react-native',
    fixture: 'rn-088-courier',
    args: ['--labels', 'voiceover,voice-control,dark-interface'],
    title: 'a11ylabel · React Native 0.88 app',
    comment: '# fixtures/rn-088-courier: icon-only Pressable, forced light scheme',
  },
];

/** Recorded scripts/simulator-compare.sh runs: docs/media/simulator/<name>.txt. */
export const SIMULATOR_SESSIONS = [
  { name: 'native-swiftui-blocked-27.0', fixture: 'native-swiftui-blocked', runtime: '27.0' },
  { name: 'native-swiftui-ready-27.0', fixture: 'native-swiftui-ready', runtime: '27.0' },
] as const;

/** Runs the CLI for one demo and returns what a terminal would have shown. */
export function record(demo: Demo): Session {
  const env: NodeJS.ProcessEnv = { ...process.env, FORCE_COLOR: '1' };
  delete env.NO_COLOR;
  const args = [`fixtures/${demo.fixture}`, ...demo.args];
  let output: string;
  try {
    output = execFileSync(process.execPath, [`${ROOT}dist/cli/main.js`, ...args], {
      cwd: ROOT,
      env,
      encoding: 'utf8',
    });
  } catch (error) {
    // Exit code 1 means findings; the report is still on stdout.
    output = (error as { stdout?: string }).stdout ?? '';
  }
  return {
    title: demo.title,
    comment: demo.comment,
    command: `a11ylabel ${args.join(' ')}`,
    output,
  };
}

/** The recorded output of scripts/simulator-compare.sh for one fixture and runtime, as a session. */
export function simulatorSession(session: (typeof SIMULATOR_SESSIONS)[number]): Session {
  return {
    title: `iOS ${session.runtime} Simulator · ${session.fixture}`,
    comment: '# recorded on a Mac (Apple silicon) with Xcode 27.1 on 28 October 2026',
    command: `scripts/simulator-compare.sh ${session.fixture} ${session.runtime}`,
    output: readFileSync(`${MEDIA}simulator/${session.name}.txt`, 'utf8'),
  };
}

export const mediaPath = (name: string, theme: 'light' | 'dark') =>
  `${MEDIA}demo-${name}-${theme}.svg`;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(MEDIA, { recursive: true });
  const sessions: [string, Session][] = [
    ...DEMOS.map((demo): [string, Session] => [demo.name, record(demo)]),
    ...SIMULATOR_SESSIONS.map((session): [string, Session] => [
      `simulator-${session.name}`,
      simulatorSession(session),
    ]),
  ];
  for (const [name, session] of sessions) {
    for (const theme of ['light', 'dark'] as const) {
      writeFileSync(mediaPath(name, theme), terminalSvg(session, theme));
    }
    console.log(`docs/media/demo-${name}-{light,dark}.svg`);
  }
}
