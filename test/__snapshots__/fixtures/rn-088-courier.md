## a11ylabel: HelloWorld (React Native)

**No label blocked; 5 labels to review \(VoiceOver, Voice Control, Larger Text, Dark Interface, Reduced Motion\)**

| Label | Status | Findings | What a11ylabel checks |
| --- | --- | --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | review | 1 warning, 1 info | Icon-only buttons without an accessibility label, and labels that name the control type. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria) | review | 1 warning | Icon-only buttons without a name Voice Control can show and say. |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | review | 2 warnings | Text scaling turned off or capped below 200% \(for the whole app or one view\), and fixed font sizes that Dynamic Type does not scale. |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | review | 1 warning | A light appearance forced in Info.plist, the build settings, the Expo config or code; a Flutter app without a dark theme; asset colours without a dark variant. |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | check by hand | – | Nothing: whether colour is the only difference is a question of design, not of code a11ylabel can read. |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | check by hand | – | Asset catalog colours without a high contrast variant for the Increase Contrast setting. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | review | 1 warning | Repeating, parallax, 3D and auto-playing animations in an app that never reads the Reduce Motion setting, or in files that do not. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |

- target HelloWorld · iOS 15.1 \(ios/HelloWorld/Info.plist\)
- `react-native` 0.88.1 (declared)
- VoiceOver: Sets accessibility labels (`App.tsx`)

| Rule | Severity | Where | Finding |
| --- | --- | --- | --- |
| A11Y102 | warning | `App.tsx:63` | allowFontScaling is false: this text keeps its size when the system text size grows. |
| A11Y103 | warning | `App.tsx:48` | maxFontSizeMultiplier is 1.2: this text stops at 120% of its size. |
| A11Y203 | warning | `App.tsx:22` | Appearance.setColorScheme\('light'\) keeps the whole app light, whatever the system appearance is. |
| A11Y301 | warning | `App.tsx:35` | Animated.loop, an animation that never stops, and nothing in the app reads Reduce Motion. |
| A11Y401 | warning | `App.tsx:52` | A Pressable that shows only an icon or image, without accessibilityLabel. |
| A11Y402 | info | `App.tsx:66` | The label "Call courier button" ends with "button", which VoiceOver already says from the element's traits. |

<details><summary>What each finding means and how to fix it</summary>

### A11Y102: Text that does not scale

`App.tsx:63`: allowFontScaling is false: this text keeps its size when the system text size grows. (Larger Text)

**Fix: Let this text scale** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#react-native-and-expo))

1. Remove allowFontScaling={false}; if the text truly cannot grow \(a tab bar label\), keep it and make sure its meaning is available another way.
2. Let the container grow with the text: no fixed height, numberOfLines only where the full text is shown elsewhere.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling](https://reactnative.dev/docs/text), [Flutter TextScaler.noScaling](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html), [UIKit adjustsFontForContentSizeCategory](https://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/adjustsfontforcontentsizecategory)

### A11Y103: Text capped below 200%

`App.tsx:48`: maxFontSizeMultiplier is 1.2: this text stops at 120% of its size. (Larger Text)

**Fix: Raise the limit to 2 or remove it** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#react-native-and-expo))

1. Set maxFontSizeMultiplier to 2 or more, or to 0 for no limit.
2. Keep a lower limit only on repeated navigation such as a tab bar.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: maxFontSizeMultiplier](https://reactnative.dev/docs/text), [Flutter MediaQuery.withClampedTextScaling](https://api.flutter.dev/flutter/widgets/MediaQuery/withClampedTextScaling.html), [SwiftUI DynamicTypeSize](https://developer.apple.com/documentation/swiftui/dynamictypesize), [UIKit UIView.maximumContentSizeCategory](https://developer.apple.com/documentation/uikit/uiview/maximumcontentsizecategory)

### A11Y203: Light colour scheme set in code

`App.tsx:22`: Appearance.setColorScheme\('light'\) keeps the whole app light, whatever the system appearance is. (Dark Interface)

**Fix: Stop forcing the light scheme** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/dark-interface.md#react-native))

1. Remove Appearance.setColorScheme\('light'\), or call it only with the person's own choice.
2. Read useColorScheme\(\) and pick colours for both schemes.

Sources: [SwiftUI preferredColorScheme\(\_:\)](https://developer.apple.com/documentation/swiftui/view/preferredcolorscheme(_:)), [UIKit UIView.overrideUserInterfaceStyle](https://developer.apple.com/documentation/uikit/uiview/overrideuserinterfacestyle), [React Native Appearance](https://reactnative.dev/docs/appearance), [Flutter ThemeMode](https://api.flutter.dev/flutter/material/ThemeMode.html)

### A11Y301: Motion in an app that never reads Reduce Motion

`App.tsx:35`: Animated.loop, an animation that never stops, and nothing in the app reads Reduce Motion. (Reduced Motion)

**Fix: Read Reduce Motion and calm the animation** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/reduced-motion.md#react-native-and-expo))

1. Read AccessibilityInfo.isReduceMotionEnabled\(\) and listen to its reduceMotionChanged event \(or use Reanimated's useReducedMotion\(\)\).
2. When it is on, do not start Animated.loop, auto-playing Lottie or carousel motion; show the final frame instead.

Sources: [Reduced Motion evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria), [SwiftUI accessibilityReduceMotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion), [UIKit UIAccessibility.isReduceMotionEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isreducemotionenabled), [React Native AccessibilityInfo.isReduceMotionEnabled](https://reactnative.dev/docs/accessibilityinfo), [Flutter AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)

### A11Y401: Icon-only button without an accessibility label

`App.tsx:52`: A Pressable that shows only an icon or image, without accessibilityLabel. (VoiceOver, Voice Control)

**Fix: Name the button** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#react-native-and-expo))

1. Add accessibilityLabel="Close" \(or aria-label\) and accessibilityRole="button" to the Pressable or Touchable.
2. For react-native-paper's IconButton, pass accessibilityLabel.

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y402: Accessibility label names the control type

`App.tsx:66`: The label "Call courier button" ends with "button", which VoiceOver already says from the element's traits. (VoiceOver)

**Fix: Drop the control type from the label** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#react-native-and-expo))

1. Shorten the label to the action \("Close"\) and set accessibilityRole="button" \(or role="button"\).

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria)

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

0 errors, 5 warnings, 1 info. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)).

<sub>[a11ylabel](https://github.com/muhittincamdali/a11ylabel) 0.0.0, rules nutrition-labels@2026.10.28 (sources read 2026-10-28). Reads the project's files; it does not build or run the app.</sub>
