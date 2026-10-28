## a11ylabel: tide (Flutter)

**1 label blocked by the code \(Larger Text\); 4 to review**

| Label | Status | Findings | What a11ylabel checks |
| --- | --- | --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | review | 2 warnings | Icon-only buttons without an accessibility label, and labels that name the control type. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria) | review | 2 warnings | Icon-only buttons without a name Voice Control can show and say. |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | **blocked** | 1 error, 1 warning | Text scaling turned off or capped below 200% \(for the whole app or one view\), and fixed font sizes that Dynamic Type does not scale. |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | review | 1 warning | A light appearance forced in Info.plist, the build settings, the Expo config or code; a Flutter app without a dark theme; asset colours without a dark variant. |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | check by hand | – | Nothing: whether colour is the only difference is a question of design, not of code a11ylabel can read. |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | check by hand | – | Asset catalog colours without a high contrast variant for the Increase Contrast setting. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | review | 2 warnings | Repeating, parallax, 3D and auto-playing animations in an app that never reads the Reduce Motion setting, or in files that do not. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |

- target Runner · iOS 15.0 \(ios/Runner/Info.plist\)
- VoiceOver: Sets accessibility labels (`lib/main.dart`)

| Rule | Severity | Where | Finding |
| --- | --- | --- | --- |
| A11Y101 | error | `lib/main.dart:16` | maxScaleFactor 1.3 in the app's builder: all text stops at 130% of its size. |
| A11Y102 | warning | `lib/main.dart:86` | TextScaler.noScaling: this text keeps its size when the system text size grows. |
| A11Y204 | warning | `lib/main.dart:10` | MaterialApp has no darkTheme, so it shows its light theme in Dark Mode too. |
| A11Y301 | warning | `lib/main.dart:50` | repeat\(\), an animation that never stops, and nothing in the app reads Reduce Motion. |
| A11Y303 | warning | `lib/main.dart:60` | The app reads disableAnimations but not accessibilityFeatures.reduceMotion, so an iPhone with Reduce Motion on still gets every animation. |
| A11Y401 | warning | `lib/main.dart:65` | An IconButton without a tooltip, which Flutter uses as its accessibility label. |
| A11Y401 | warning | `lib/main.dart:90` | A FloatingActionButton without a tooltip, which Flutter uses as its accessibility label. |

<details><summary>What each finding means and how to fix it</summary>

### A11Y101: Text size locked for the whole app

`lib/main.dart:16`: maxScaleFactor 1.3 in the app's builder: all text stops at 130% of its size. (Larger Text)

**Fix: Stop overriding the text scaler for the whole app** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#flutter))

1. Remove the MediaQuery, MediaQuery.withNoTextScaling or TextScaler.noScaling that wraps the app in MaterialApp.builder.
2. If a limit is needed, use MediaQuery.withClampedTextScaling with maxScaleFactor 2.0 or more, or clamp only the widgets that cannot grow.
3. Check the common tasks at the largest accessibility size on an iOS simulator.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling, maxFontSizeMultiplier](https://reactnative.dev/docs/text), [React 19 upgrade guide: defaultProps removed from function components](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Flutter MediaQuery.withClampedTextScaling](https://api.flutter.dev/flutter/widgets/MediaQuery/withClampedTextScaling.html), [SwiftUI dynamicTypeSize\(\_:\)](https://developer.apple.com/documentation/swiftui/view/dynamictypesize(_:)), [UIKit UIView.maximumContentSizeCategory](https://developer.apple.com/documentation/uikit/uiview/maximumcontentsizecategory)

### A11Y102: Text that does not scale

`lib/main.dart:86`: TextScaler.noScaling: this text keeps its size when the system text size grows. (Larger Text)

**Fix: Let this text scale** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#flutter))

1. Remove textScaler: TextScaler.noScaling \(or linear\(1.0\), or textScaleFactor: 1.0\) from this widget.
2. If it cannot grow, clamp it with MediaQuery.withClampedTextScaling\(maxScaleFactor: 2.0\) rather than turning scaling off.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling](https://reactnative.dev/docs/text), [Flutter TextScaler.noScaling](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html), [UIKit adjustsFontForContentSizeCategory](https://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/adjustsfontforcontentsizecategory)

### A11Y204: Flutter app without a dark theme

`lib/main.dart:10`: MaterialApp has no darkTheme, so it shows its light theme in Dark Mode too. (Dark Interface)

**Fix: Add a dark theme** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/dark-interface.md#flutter))

1. Pass darkTheme: ThemeData\(colorScheme: ColorScheme.fromSeed\(seedColor: …, brightness: Brightness.dark\)\) to MaterialApp.
2. Leave themeMode at ThemeMode.system, and read colours from Theme.of\(context\).colorScheme instead of constants.

Sources: [Flutter MaterialApp.darkTheme](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html), [Dark Interface evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria)

### A11Y301: Motion in an app that never reads Reduce Motion

`lib/main.dart:50`: repeat\(\), an animation that never stops, and nothing in the app reads Reduce Motion. (Reduced Motion)

**Fix: Read Reduce Motion and calm the animation** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/reduced-motion.md#flutter))

1. Read PlatformDispatcher.instance.accessibilityFeatures.reduceMotion \(iOS\) together with MediaQuery.disableAnimationsOf\(context\) \(Android\).
2. When either is set, do not call repeat\(\) or auto-play Lottie and carousels; jump to the end value instead.

Sources: [Reduced Motion evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria), [SwiftUI accessibilityReduceMotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion), [UIKit UIAccessibility.isReduceMotionEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isreducemotionenabled), [React Native AccessibilityInfo.isReduceMotionEnabled](https://reactnative.dev/docs/accessibilityinfo), [Flutter AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)

### A11Y303: Flutter reads disableAnimations, which iOS Reduce Motion does not set

`lib/main.dart:60`: The app reads disableAnimations but not accessibilityFeatures.reduceMotion, so an iPhone with Reduce Motion on still gets every animation. (Reduced Motion)

**Fix: Also read the iOS setting** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/reduced-motion.md#flutter))

1. Combine both: MediaQuery.disableAnimationsOf\(context\) \|\| View.of\(context\).platformDispatcher.accessibilityFeatures.reduceMotion.
2. Rebuild when the setting changes: listen to PlatformDispatcher.onAccessibilityFeaturesChanged or WidgetsBindingObserver.didChangeAccessibilityFeatures.

Sources: [Flutter MediaQueryData.disableAnimations](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html), [Flutter AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)

### A11Y401: Icon-only button without an accessibility label

`lib/main.dart:65`: An IconButton without a tooltip, which Flutter uses as its accessibility label. (VoiceOver, Voice Control)

**Fix: Name the button** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#flutter))

1. Pass tooltip: 'Close' to IconButton or FloatingActionButton; Flutter uses it as the semantic label.
2. For other buttons, give the Icon a semanticLabel or wrap the button in Semantics\(label: …, button: true\).

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y401: Icon-only button without an accessibility label

`lib/main.dart:90`: A FloatingActionButton without a tooltip, which Flutter uses as its accessibility label. (VoiceOver, Voice Control)

**Fix: Name the button** (steps above)

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

</details>

<details><summary>What to check by hand before claiming a label</summary>

- **VoiceOver**: Complete every common task with VoiceOver alone: reading order, grouping, values and states, custom actions, focus in modal views.
- **Voice Control**: Say "Show names" and "Show numbers" on every screen of the common tasks; reach swipe and long-press actions by voice; dictate into every text field.
- **Larger Text**: Use the common tasks at the largest accessibility text size: no overlapping text, no truncation that hides information.
- **Dark Interface**: Use the common tasks in Dark Mode: no screen, sheet, web view or launch screen that flashes bright.
- **Differentiate Without Color Alone**: Look for status, charts and selections told apart by colour alone; add a shape, symbol or text.
- **Sufficient Contrast**: Measure text and controls against their background: about 4.5:1 for most text, by default or with Increase Contrast.
- **Reduced Motion**: Turn on Reduce Motion and use the common tasks: no spinning, scaling, parallax or auto-advancing motion left.
- **Captions**: Check that the video and audio of the common tasks have captions or transcripts, and that people can tell which media is captioned.
- **Audio Descriptions**: Check that the video of the common tasks offers an audio-described track.

</details>

1 error, 6 warnings, 0 info. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)).

<sub>[a11ylabel](https://github.com/muhittincamdali/a11ylabel) 0.1.0, rules nutrition-labels@2026.10.28 (sources read 2026-10-28). Reads the project's files; it does not build or run the app.</sub>
