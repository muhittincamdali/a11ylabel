# Changelog

All notable changes to a11ylabel are listed here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The rule data in `rules/` has its own
`dataVersion` (the date of its last change), shown in every report.

## [Unreleased]

## [0.1.0] - 2026-10-28

First release.

### Added

- The `a11ylabel` command (npm package `@mcamdali/a11ylabel`) for native iOS, Flutter (app and
  plugin example), React Native and Expo projects: a status for each of the nine Accessibility
  Nutrition Labels (blocked, review, no blocker found, not known, check by hand), terminal, plain
  text, Markdown and JSON reports, `--labels` to check only the labels an app claims, `--summary`
  for the label table alone, and exit codes 0 (nothing at or above `--fail-on`), 1 (findings) and
  2 (usage error).
- Rule data `nutrition-labels@2026.10.28` with sources for every rule:
  - A11Y101 to A11Y104 (Larger Text): scaling locked or capped below 200% for the whole app or one
    view, and fixed font sizes. `Text.defaultProps` is reported only before React Native 0.78.
  - A11Y201 to A11Y205 (Dark Interface): a forced light appearance in Info.plist, build settings,
    the Expo config (light when the key is missing) or code, an in-app dark mode to check, a
    Flutter `MaterialApp` without `darkTheme`, asset colours without a dark value.
  - A11Y301 to A11Y304 (Reduced Motion): endless, rotating, parallax and auto-playing motion where
    Reduce Motion is not read, Flutter's `disableAnimations` that iOS never sets, and Reanimated's
    `ReduceMotion.Never`.
  - A11Y401 and A11Y402 (VoiceOver, Voice Control): icon-only buttons without a label and labels
    that name the control type.
  - A11Y501 and A11Y601: asset colours without a high contrast value, and video playback for
    Captions and Audio Descriptions.
- Seven fixtures (SwiftUI before and after the fixes, UIKit, Flutter 3.47.5, React Native 0.88.1,
  Expo SDK 58 as published and without `userInterfaceStyle`) with recorded reports.
- Simulator scripts and their recordings with Xcode 27.1 on iOS 27.0: at AX5 in Dark Mode the
  blocked SwiftUI app stays light with capped text and the fixed one turns dark with large text.
- Guides for claiming labels and for each label group, an API reference site, and examples for
  JavaScript, `jq` and GitHub Actions.
- Limits on what a report lists: at most 20 findings of a rule per file and 100 per project. The
  label counts and the summary include the findings over these limits, and a note says how many of
  each rule were left out. Names and values from the project (target names, versions, build
  setting and Info.plist values) are cut to 200 characters.
- Every report replaces control and bidirectional characters in file names and values from the
  project with U+FFFD. The terminal and text reports replace line breaks too, so a file name with a
  newline cannot start a line that looks like part of the report; the same goes for a path with a
  newline in an error message on stderr.

[Unreleased]: https://github.com/muhittincamdali/a11ylabel/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0
