# Fixtures

Seven projects, one per situation a11ylabel has to tell apart. The tests run a11ylabel on each one
and compare the findings and label statuses with
[test/integration/fixtures.test.ts](../test/integration/fixtures.test.ts) and the full reports
with [test/\_\_snapshots\_\_/fixtures](../test/__snapshots__/fixtures).

| Folder                                           | Made with                                                                                                                                                                                                                                                                                                                              | Expected                                                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [native-swiftui-blocked](native-swiftui-blocked) | A SwiftUI pantry app written for these tests ([project.yml](native-swiftui-blocked/project.yml), XcodeGen 2.45.3): `INFOPLIST_KEY_UIUserInterfaceStyle = Light`, `.dynamicTypeSize(...xLarge)` on the scene, `.system(size:)` fonts, icon-only toolbar buttons, a `repeatForever` pulse, asset colours with one value, a `VideoPlayer` | Larger Text and Dark Interface blocked; A11Y101, A11Y201, 3 × A11Y104, A11Y301, 2 × A11Y401 and five info findings |
| [native-swiftui-ready](native-swiftui-ready)     | The same app after the fixes: no style key or Dynamic Type limit, text styles, `Label` buttons and `accessibilityLabel`, the pulse calmed by `accessibilityReduceMotion`, colours with dark and high contrast values                                                                                                                   | no blockers; A11Y601 (video) only                                                                                  |
| [native-uikit](native-uikit)                     | A UIKit ledger app (XcodeGen, Info.plist file): `UIUserInterfaceStyle` Light with an in-app night theme, the window's `maximumContentSizeCategory`, a fixed `systemFont(ofSize:)`, image-only buttons, a parallax card, `AVPlayerViewController`                                                                                       | Larger Text blocked; Dark Interface accepted with A11Y202                                                          |
| [flutter-tide](flutter-tide)                     | `flutter create --platforms ios` with Flutter 3.47.5, then `lib/main.dart` written with a clamped text scale in `MaterialApp.builder`, no `darkTheme`, `IconButton` and `FloatingActionButton` without tooltips, a repeating controller and only `disableAnimations` read                                                              | Larger Text blocked; A11Y303 for the Reduce Motion check iOS never sets                                            |
| [rn-088-courier](rn-088-courier)                 | `ios/`, `package.json`, `index.js`, `app.json`, `metro.config.js`, `babel.config.js` and `tsconfig.json` of `@react-native-community/template` 0.88.1 from npm; `App.tsx` written with `Appearance.setColorScheme('light')`, a capped and an unscaled `Text`, an icon-only `Pressable`, `Animated.loop`                                | five labels to review; `Text.defaultProps` in `index.js` is not reported (React 19 ignores it)                     |
| [expo-58-no-style](expo-58-no-style)             | `src/`, `app.json`, `package.json` and `tsconfig.json` of `expo-template-default` 58.0.29 from npm, with `userInterfaceStyle` taken out of app.json                                                                                                                                                                                    | Dark Interface blocked: Expo uses light when the key is missing                                                    |
| [expo-58-default](expo-58-default)               | The same template as published, only the package name and version set as `create-expo-app` does                                                                                                                                                                                                                                        | no findings                                                                                                        |

All projects were made on 28 October 2026 on a Mac (Apple silicon) with Xcode 27.1 (27A9275). Only
the files a11ylabel reads and the manifests that explain them are kept: no `node_modules`, `Pods`,
Android folders, build output or IDE files. Dependencies in the React Native and Expo package.json
files are declared, not installed, so the reports show the lowest version each range allows.

## What the simulator shows

`scripts/simulator-check.sh` builds a fixture with the installed Xcode, launches it on an iPhone 17
simulator with a given text size and appearance, and takes a screenshot;
`scripts/simulator-compare.sh` does it for the blocked and the fixed SwiftUI app. With Xcode 27.1
(iOS 27.1 SDK) on iOS 27.0, at the largest accessibility text size (AX5) in Dark Mode:

- **native-swiftui-blocked** stays light and its text stops at the `xLarge` size: the built app has
  `UIUserInterfaceStyle = Light` and the scene caps Dynamic Type.
- **native-swiftui-ready** turns dark and its text grows to AX5, with each row's quantity moved under
  its name.

The screenshots and the recorded output are in [docs/media/simulator](../docs/media/simulator).
