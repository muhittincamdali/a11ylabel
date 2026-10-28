<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI status"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Latest version: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Language version: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="License: MIT"></picture></a>
</p>

<p align="center">
<a href="#quick-start"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-en-light.svg" alt="Get started"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-en-light.svg" alt="Documentation"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-en-light.svg" alt="Guides"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-en-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-en-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-en-light.svg" alt="Examples"></picture></a>
</p>

<!-- brand:end -->

App Store Connect asks every app which of nine Accessibility Nutrition Labels it supports: voluntary
today, and Apple says it will become required for new apps and updates (no date had been given on
28 October 2026). a11ylabel reads a native iOS, Flutter or React Native/Expo project and shows, for
each label, whether something in the code already blocks it, what to review, and what only a person
can check, with the fix for each finding and the Apple page behind it. It reads your project's
files; it does not build, run or change anything.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary on a SwiftUI app: VoiceOver, Voice Control and Reduced Motion to review, Larger Text and Dark Interface blocked, four labels to check by hand; 2 errors, 6 warnings, 4 info"></picture>

<sub>Recorded from the real CLI on the <a href="fixtures/native-swiftui-blocked">native-swiftui-blocked
fixture</a>, a SwiftUI app written for the tests (<code>npm run demo</code>).</sub>

## Highlights

- **One table for the nine labels.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions and Audio
  Descriptions, each **blocked**, **review**, **no blocker found** or **check by hand**, linked to
  Apple's evaluation criteria.
- **Finds what blocks a label for the whole app.** `UIUserInterfaceStyle` Light in an Info.plist,
  a build setting or an Expo config (Expo uses light when the key is missing); text scaling locked
  in `Text.defaultProps`, a Flutter `MaterialApp.builder`, a SwiftUI scene or a UIKit window.
- **And the places to review.** Text that does not scale or stops below 200%, fixed font sizes,
  icon-only buttons without a label, endless, parallax and auto-playing motion in code that never
  reads Reduce Motion, and the Flutter check iOS never sets.
- **Knows the platforms.** React Native 0.78 and later ignore `Text.defaultProps` (React 19), so
  a11ylabel does not report it there; Flutter's `disableAnimations` does not follow iOS Reduce
  Motion; Reanimated follows it by default.
- **Every rule has a source.** The rules are data ([rules/nutrition-labels.json](rules/nutrition-labels.json))
  citing Apple's, React Native's, Expo's, Flutter's and Reanimated's own pages; the tests fail if a
  rule has none.
- **Checked in the simulator.** At the largest text size in Dark Mode on iOS 27.0, the blocked
  fixture stays light with capped text and the fixed one turns dark with text at AX5.
- **Made for CI.** `--labels` checks only the labels you claim; terminal, plain text, Markdown and
  JSON reports; exit code 0 clean, 1 findings, 2 usage error.

## Quick start

**1. Install a11ylabel.** With [Homebrew](https://brew.sh/), which also installs Node.js:

```sh
brew install muhittincamdali/tap/a11ylabel
```

Or with npm, which needs [Node.js](https://nodejs.org/) 22.12 or later (`node --version` prints it):

```sh
npm i -g @mcamdali/a11ylabel
```

To run it without installing, use `npx @mcamdali/a11ylabel`.

**2. Open a terminal in your app's folder**, the one with the `.xcodeproj`, `pubspec.yaml` or
`package.json`:

```sh
cd path/to/YourApp
```

**3. Run a11ylabel:**

```sh
a11ylabel
```

**4. Read the table at the top.** A **blocked** label has an error that stops it for the whole app:
fix that first. **review** lists places that may stop a common task; look at each one with the
feature on. **check by hand** labels depend on design or media that code does not show. Each finding
names its fix from the "How to fix" list, and [Before you claim a label](docs/guides/claiming-labels.md)
walks through the rest.

## What a11ylabel checks

Apple's [overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
asks that people can complete all of an app's common tasks with a feature on before it claims the
label. Code can show some of what stops them:

| Label                             | In code | What a11ylabel looks for                                                                                                               |
| --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | in part | Icon-only buttons without a label; labels that name the control type                                                                   |
| Voice Control                     | in part | Icon-only buttons without a name to show and say                                                                                       |
| Larger Text                       | yes     | Scaling turned off or capped below 200%, for the app or one view; fixed font sizes                                                     |
| Dark Interface                    | yes     | A light appearance forced in Info.plist, build settings, the Expo config or code; no Flutter `darkTheme`; colours without a dark value |
| Differentiate Without Color Alone | no      | Nothing: a question of design                                                                                                          |
| Sufficient Contrast               | a hint  | Asset colours without a high contrast value                                                                                            |
| Reduced Motion                    | yes     | Endless, rotating, parallax and auto-playing motion where Reduce Motion is not read                                                    |
| Captions                          | a hint  | Whether the app plays video                                                                                                            |
| Audio Descriptions                | a hint  | Whether the app plays video                                                                                                            |

| Rule    | Severity | Finding                                                                                 | Code                            |
| ------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | Text size locked for the whole app (below 200%)                                         | all                             |
| A11Y102 | warning  | One text or view that does not scale                                                    | all                             |
| A11Y103 | warning  | One text or view capped below 200%                                                      | all                             |
| A11Y104 | warning  | A fixed point size: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | Light appearance forced for the whole app, with no way to turn it dark                  | Info.plist, build setting, Expo |
| A11Y202 | info     | Light by default, dark through an in-app setting                                        | Info.plist, build setting, Expo |
| A11Y203 | warning  | A light colour scheme set in code                                                       | all                             |
| A11Y204 | warning  | A `MaterialApp` without `darkTheme`                                                     | Flutter                         |
| A11Y205 | info     | Asset colours without a dark variant                                                    | asset catalog                   |
| A11Y301 | warning  | Motion in an app that never reads Reduce Motion                                         | all                             |
| A11Y302 | info     | Motion in a file that does not read Reduce Motion                                       | all                             |
| A11Y303 | warning  | Flutter reads `disableAnimations`, which iOS Reduce Motion does not set                 | Flutter                         |
| A11Y304 | warning  | A Reanimated animation set to `ReduceMotion.Never`                                      | React Native, Expo              |
| A11Y401 | warning  | Icon-only button without an accessibility label                                         | all                             |
| A11Y402 | info     | Accessibility label that names the control type                                         | all                             |
| A11Y501 | info     | Asset colours without a high contrast variant                                           | asset catalog                   |
| A11Y601 | info     | The app plays video                                                                     | all                             |

Rule data `nutrition-labels@2026.10.28`, its sources read on 28 October 2026. An error blocks a
label; a warning makes it "review"; info findings never change a label's status.

## What the simulator shows

The same SwiftUI app before and after the fixes, built with Xcode 27.1 (iOS 27.1 SDK) and launched
on an iPhone 17 simulator with iOS 27.0, first at the default text size in light, then at the
largest accessibility size (AX5) in Dark Mode
([how](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="The Pantry app on an iPhone 17 simulator with iOS 27.0. From left: native-swiftui-blocked at the default size in light, the same at AX5 in Dark Mode (still light, text barely larger), native-swiftui-ready at the default size, and at AX5 in Dark Mode (dark, large text, quantities under the names)"></p>

| Fixture (iOS 27.0 Simulator) | Brightness, default → AX5 Dark Mode | Pixels changed | a11ylabel                              |
| ---------------------------- | ----------------------------------- | -------------- | -------------------------------------- |
| native-swiftui-blocked       | 0.97 → 0.97                         | 7%             | Larger Text and Dark Interface blocked |
| native-swiftui-ready         | 0.97 → 0.57                         | 99%            | no blockers                            |

Brightness is the mean of the greyscale screenshot (0 black, 1 white) above the home indicator;
the recordings are in [docs/media/simulator](docs/media/simulator). The
[Flutter fixture](docs/media/simulator/flutter-tide-ax5-dark.png) under the same settings stays
light (no `darkTheme`) with its text at 130%.

## Installation

The commands under Quick start install the `a11ylabel` command from the npm registry. To pin a version in a project:

```sh
npm install --save-dev @mcamdali/a11ylabel
```

`npx a11ylabel` then runs that copy. The package installs under the name `@mcamdali/a11ylabel`, the name the JavaScript API below imports. Each [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) also carries the package as `a11ylabel-<version>.tgz` with a `SHA256SUMS` file, to pin or verify an exact release:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

## Usage

```text
a11ylabel [path] [options]
```

| Option                  | What it does                                                               |
| ----------------------- | -------------------------------------------------------------------------- |
| `path`                  | Project folder or `.xcodeproj`; default is the current folder              |
| `-f, --format <format>` | `tty` (default), `text`, `markdown` or `json`                              |
| `--json`                | Same as `--format json`                                                    |
| `-o, --output <file>`   | Write the report to a file instead of the terminal                         |
| `-l, --labels <ids>`    | Check only these labels, comma-separated (default: all nine)               |
| `-s, --summary`         | Only the label table and the verdict (terminal and text formats)           |
| `--fail-on <severity>`  | `warning` (default), `error`, `info` or `none`: when the exit code is 1    |
| `--no-color`            | Plain text even in a terminal (`NO_COLOR` and `FORCE_COLOR` are respected) |

Label ids: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Exit codes: `0` nothing at or above `--fail-on`, `1` findings at or above it, `2` bad arguments, no
iOS project found, or an unexpected error. When the Info.plist or Xcode project that decides Dark
Interface cannot be read, that label is "not known" and the exit code is also `1` unless
`--fail-on none`.

a11ylabel finds the iOS app on its own: an `.xcodeproj` at the root or one folder down for native
apps, `ios/` for Flutter, React Native and Expo apps (`example/ios/` for a Flutter plugin). It reads
every iOS app target's Info.plist (XML or binary) and build settings, the colour sets of its asset
catalogs, the Swift and Objective-C files of the app, the JavaScript and TypeScript of a React
Native or Expo app and the Dart files in `lib/`, skipping dependencies, build output and tests. An
Expo app without `ios/` is checked from its config.

### Check only the labels you claim

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

The table, the findings and the exit code then cover those labels only, so CI fails when a change
would break a label you show on the App Store.

### Keep a Markdown report with the code

```sh
a11ylabel --format markdown --output accessibility.md
```

The report names the a11ylabel and rule data versions and the date the sources were read, and
lists for each label what only a person can check: a dated record of what the code showed.

### Use the JSON report in scripts

```sh
a11ylabel --json > a11ylabel.json
```

Each label has `id`, `name`, `status`, `coverage`, `criteria`, `counts` and `signals`; each finding
has `rule`, `labels`, `severity`, `title`, `message`, `file`, `line`, `target`, the `fix` with its
steps and guide, and `sources`. The layout is `schemaVersion` 0 and may change before 1.0.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) filters it with `jq`.

### Run it in CI

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) checks the labels an
app claims on every pull request that touches the app, adds the report to the job summary and fails
the job on warnings. `--fail-on error` fails only when a label is blocked.

### From JavaScript

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

A runnable version is [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs).

## Demo

The terminal recordings come from the CLI on the [fixtures](fixtures/README.md), projects made with
each toolchain:

| Project                                                       | Recording                                                                                                                                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI app, label table (`--summary`)                        | top of this page                                                                                                                                    |
| The same app, Larger Text and Dark Interface with their fixes | [light](docs/media/demo-swiftui-light.svg) · [dark](docs/media/demo-swiftui-dark.svg)                                                               |
| The same app after the fixes                                  | [light](docs/media/demo-ready-light.svg) · [dark](docs/media/demo-ready-dark.svg)                                                                   |
| Flutter 3.47.5 app with a clamped text scale                  | [light](docs/media/demo-flutter-light.svg) · [dark](docs/media/demo-flutter-dark.svg)                                                               |
| React Native 0.88.1 app                                       | [light](docs/media/demo-react-native-light.svg) · [dark](docs/media/demo-react-native-dark.svg)                                                     |
| `scripts/simulator-compare.sh` on the two SwiftUI apps        | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

Measured on 28 October 2026 on a Mac (Apple silicon, M5 Max) with Node.js 26.12.1: five rounds
of three sets of 100 runs of `node dist/cli/main.js --json` over the seven fixtures, Node.js
start-up included. The fixtures were in the file cache (warm runs). The medians of the 15 sets
were 0.11 to 0.12 seconds. Single runs vary more: the slowest run of a round took 0.15 to 0.38
seconds. A generated SwiftUI project of 5,000 files (33.4 MB of Swift, 10,000 findings, 200 of
them listed) took 1.05 to 1.11 seconds in three runs, with at most 230 MB (220 MiB) of memory.

## Status

| Feature                                                                                    | Status        |
| ------------------------------------------------------------------------------------------ | ------------- |
| Native, Flutter (app and plugin example), React Native and Expo project detection          | works         |
| The nine labels with a status each; A11Y101 to A11Y601                                     | works         |
| Terminal, text, Markdown and JSON reports; `--labels`, `--summary`, `--fail-on` exit codes | works         |
| `.xcconfig` build settings and the sources of local Swift packages                         | planned (0.2) |
| SARIF output and a GitHub Action                                                           | planned (0.3) |
| Contrast ratios from colour pairs in code and asset catalogs                               | planned (0.4) |
| Swift, Dart and TypeScript syntax trees instead of patterns                                | planned (0.5) |
| Stable rule schema and JSON layout                                                         | planned (1.0) |

## Limits

- **Code, not the running app.** Apple asks that every common task works with the feature on;
  a11ylabel cannot tell which tasks are common or how screens look. "No blocker found" means none
  of its rules matched, not that the label can be claimed.
- **Patterns, not a compiler.** The rules are regular expressions and bracket matching over source
  text whose comments and strings are blanked. Code that is generated, wrapped in your own
  components (a `MyText` that turns scaling off), built at run time or written in an unusual shape
  can be missed or matched by mistake.
- **Only the app's own sources.** Pods, Swift packages outside the app folder, `node_modules` and
  Flutter plugins are not read; from `node_modules`, only the `package.json` of the packages whose
  version a11ylabel reports.
- **Build settings from project.pbxproj only.** `.xcconfig` files are not read. When a target's
  Info.plist or the Xcode project cannot be read, Dark Interface is "not known" and the report says
  why.
- **Expo config as text.** `app.config.js` and `app.config.ts` are not run, so a
  `userInterfaceStyle` set through a variable or a config plugin is not seen.
- **Bounded input.** A project can come from a pull request, so a11ylabel reads at most 32 MB per
  project file and, of the sources, 4 MB per file, 20,000 files and 128 MB in total, and at most
  5,000 colour sets; what it leaves out is listed in the report's notes. Plists and JSON files may
  nest 64 levels.
- **Bounded output.** A report lists at most 20 findings of a rule per file and 100 per project,
  so 1,700 at most. The findings over these limits are still counted in the label counts and the
  summary, and a note says how many of each rule were left out.
  Names and values from the project, such as target names, versions and Info.plist values, are cut to 200 characters.

## Documentation

API reference and guides: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Guides

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Sources

Read on 28 October 2026:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels),
  and the evaluation criteria of each label, linked from the report and from
  [rules/nutrition-labels.json](rules/nutrition-labels.json) with the API pages each rule cites.
- React Native: [Text](https://reactnative.dev/docs/text), [Accessibility](https://reactnative.dev/docs/accessibility),
  [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo), [Appearance](https://reactnative.dev/docs/appearance);
  React: [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide);
  Reanimated: [Accessibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/).
- Expo: [app config `userInterfaceStyle`](https://docs.expo.dev/versions/latest/config/app/).
- Flutter: [TextScaler](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html),
  [MaterialApp.darkTheme](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html),
  [MediaQueryData.disableAnimations](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html),
  [AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html),
  [IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html).

## Requirements

Node.js 22.12 or later on macOS, Linux or Windows. Reading a project needs nothing else: no Xcode,
Flutter or React Native toolchain. The simulator scripts need a Mac with Xcode, XcodeGen, Flutter
(for the Flutter fixture) and ImageMagick.

## Architecture

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- The rule data is separate from the code and versioned (`nutrition-labels@2026.10.28`); the tests
  fail when a rule has no source or links a guide section that does not exist.
- The CLI (`src/cli/`) only parses arguments, picks colours and widths, and sets the exit code.

## Related

[glassready](https://github.com/muhittincamdali/glassready) shows what Liquid Glass changes in an
app built with the iOS 27 SDK, and [sdkbump](https://github.com/muhittincamdali/sdkbump) whether it
will launch. a11ylabel answers who can use it.

## FAQ

**a11ylabel says "no blocker found" for Larger Text. Can I claim it?** Not on that alone. It means
none of the rules found anything; claim the label when the common tasks work at the largest text
size without overlapping or cut-off text, as Apple's criteria describe.

**Is every A11Y102 or A11Y401 warning a problem?** No. A tab bar label that stays small is
acceptable to Apple when it has another way to be read, such as the Large Content Viewer, and a
button may get its label in a way a11ylabel does not see. Look at the place with the feature on and
decide.

**Does a11ylabel change my project?** No. It reads it and writes only the report you ask for.

## Contributing

Contributions are welcome: read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[code of conduct](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) before
opening a pull request, and report security issues as described in [SECURITY.md](SECURITY.md).

## License

Released under the MIT license. See [LICENSE](LICENSE).
