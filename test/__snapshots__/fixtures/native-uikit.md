## a11ylabel: Ledger (native iOS)

**1 label blocked by the code \(Larger Text\); 3 to review, no blocker found for 1**

| Label | Status | Findings | What a11ylabel checks |
| --- | --- | --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | review | 2 warnings, 1 info | Icon-only buttons without an accessibility label, and labels that name the control type. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria) | review | 2 warnings | Icon-only buttons without a name Voice Control can show and say. |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | **blocked** | 1 error, 2 warnings | Text scaling turned off or capped below 200% \(for the whole app or one view\), and fixed font sizes that Dynamic Type does not scale. |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | no blocker found | 1 info | A light appearance forced in Info.plist, the build settings, the Expo config or code; a Flutter app without a dark theme; asset colours without a dark variant. |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | check by hand | – | Nothing: whether colour is the only difference is a question of design, not of code a11ylabel can read. |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | check by hand | – | Asset catalog colours without a high contrast variant for the Increase Contrast setting. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | review | 1 warning | Repeating, parallax, 3D and auto-playing animations in an app that never reads the Reduce Motion setting, or in files that do not. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | check by hand | 1 info | Whether the app plays video, which makes the label apply. |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | check by hand | 1 info | Whether the app plays video, which makes the label apply. |

- target Ledger · UIUserInterfaceStyle Light · iOS 17.0 \(Ledger/Info.plist\)
- VoiceOver: Sets accessibility labels (`Ledger/BalanceViewController.swift`)
- Larger Text: Uses Dynamic Type text styles (`Ledger/BalanceViewController.swift`)

| Rule | Severity | Where | Finding |
| --- | --- | --- | --- |
| A11Y101 | error | `Ledger/SceneDelegate.swift:15` | The window's maximumContentSizeCategory is .extraExtraLarge: no text in it grows past that size, below 200%. |
| A11Y102 | warning | `Ledger/BalanceViewController.swift:20` | adjustsFontForContentSizeCategory is false: this text keeps its size when the system text size changes. |
| A11Y104 | warning | `Ledger/BalanceViewController.swift:19` | systemFont\(ofSize:\) gives a fixed point size, and this file never scales a font with UIFontMetrics. |
| A11Y301 | warning | `Ledger/BalanceViewController.swift:28` | UIInterpolatingMotionEffect, a parallax effect, and nothing in the app reads Reduce Motion. |
| A11Y401 | warning | `Ledger/BalanceViewController.swift:22` | hideButton gets an image and no title or accessibilityLabel in this file. |
| A11Y401 | warning | `Ledger/BalanceViewController.swift:50` | A UIBarButtonItem with an image and no accessibilityLabel \(export\). |
| A11Y202 | info | `Ledger/Info.plist:48` | Ledger: UIUserInterfaceStyle is Light, but Ledger/SceneDelegate.swift switches to a dark appearance: check that the setting keeps every common task dark. |
| A11Y402 | info | `Ledger/BalanceViewController.swift:64` | The label "Balance tab" ends with "tab", which VoiceOver already says from the element's traits. |
| A11Y601 | info | `Ledger/TutorialViewController.swift:9` | AVPlayerViewController plays video here: check that it has captions and an audio-described track. |

<details><summary>What each finding means and how to fix it</summary>

### A11Y101: Text size locked for the whole app

`Ledger/SceneDelegate.swift:15`: The window's maximumContentSizeCategory is .extraExtraLarge: no text in it grows past that size, below 200%. (Larger Text)

**Fix: Remove the content size limit from the window** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#uikit))

1. Remove maximumContentSizeCategory from the window, or set it to .accessibilityExtraLarge \(AX3\) or larger.
2. Limit only views that cannot grow and offer the Large Content Viewer for them \(UILargeContentViewerInteraction\).
3. Check the common tasks at the largest accessibility size.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling, maxFontSizeMultiplier](https://reactnative.dev/docs/text), [React 19 upgrade guide: defaultProps removed from function components](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Flutter MediaQuery.withClampedTextScaling](https://api.flutter.dev/flutter/widgets/MediaQuery/withClampedTextScaling.html), [SwiftUI dynamicTypeSize\(\_:\)](https://developer.apple.com/documentation/swiftui/view/dynamictypesize(_:)), [UIKit UIView.maximumContentSizeCategory](https://developer.apple.com/documentation/uikit/uiview/maximumcontentsizecategory)

### A11Y102: Text that does not scale

`Ledger/BalanceViewController.swift:20`: adjustsFontForContentSizeCategory is false: this text keeps its size when the system text size changes. (Larger Text)

**Fix: Let this label follow Dynamic Type** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#uikit))

1. Set adjustsFontForContentSizeCategory = true.
2. Give the label a font from UIFont.preferredFont\(forTextStyle:\) or UIFontMetrics\(forTextStyle:\).scaledFont\(for:\), which that property needs to take effect.
3. Set numberOfLines = 0 so the text wraps.

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling](https://reactnative.dev/docs/text), [Flutter TextScaler.noScaling](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html), [UIKit adjustsFontForContentSizeCategory](https://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/adjustsfontforcontentsizecategory)

### A11Y104: Fixed font size

`Ledger/BalanceViewController.swift:19`: systemFont\(ofSize:\) gives a fixed point size, and this file never scales a font with UIFontMetrics. (Larger Text)

**Fix: Scale the font with UIFontMetrics** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#uikit))

1. Wrap the font: UIFontMetrics\(forTextStyle: .body\).scaledFont\(for: font\), or use UIFont.preferredFont\(forTextStyle:\).
2. Set adjustsFontForContentSizeCategory = true on the label, text field or text view.

Sources: [SwiftUI Font.system\(size:weight:design:\)](https://developer.apple.com/documentation/swiftui/font/system(size:weight:design:)), [SwiftUI Font.custom\(\_:fixedSize:\)](https://developer.apple.com/documentation/swiftui/font/custom(_:fixedsize:)), [UIKit UIFontMetrics](https://developer.apple.com/documentation/uikit/uifontmetrics), [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)

### A11Y301: Motion in an app that never reads Reduce Motion

`Ledger/BalanceViewController.swift:28`: UIInterpolatingMotionEffect, a parallax effect, and nothing in the app reads Reduce Motion. (Reduced Motion)

**Fix: Read Reduce Motion and calm the animation** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/reduced-motion.md#swiftui-and-uikit))

1. Check UIAccessibility.isReduceMotionEnabled before starting the animation, and observe UIAccessibility.reduceMotionStatusDidChangeNotification.
2. When it is on, skip parallax \(UIInterpolatingMotionEffect\) and endless animations, or replace them with a cross-fade.

Sources: [Reduced Motion evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria), [SwiftUI accessibilityReduceMotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion), [UIKit UIAccessibility.isReduceMotionEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isreducemotionenabled), [React Native AccessibilityInfo.isReduceMotionEnabled](https://reactnative.dev/docs/accessibilityinfo), [Flutter AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)

### A11Y401: Icon-only button without an accessibility label

`Ledger/BalanceViewController.swift:22`: hideButton gets an image and no title or accessibilityLabel in this file. (VoiceOver, Voice Control)

**Fix: Name the button** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#uikit))

1. Set button.accessibilityLabel = "Close" \(for a UIBarButtonItem, item.accessibilityLabel\).
2. For a system action, prefer UIBarButtonItem\(systemItem:\), which comes with a localized label.

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y401: Icon-only button without an accessibility label

`Ledger/BalanceViewController.swift:50`: A UIBarButtonItem with an image and no accessibilityLabel \(export\). (VoiceOver, Voice Control)

**Fix: Name the button** (steps above)

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y202: Light by default, dark through an in-app setting

`Ledger/Info.plist:48`: Ledger: UIUserInterfaceStyle is Light, but Ledger/SceneDelegate.swift switches to a dark appearance: check that the setting keeps every common task dark. (Dark Interface)

**Fix: Check the in-app dark mode** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/dark-interface.md#an-in-app-setting))

1. Turn on the app's dark setting and use the common tasks: launch, sign-in, purchase and settings must stay dark.
2. Consider following the system appearance by default, so people who use Dark Mode do not have to find the setting.

Sources: [Dark Interface evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria), [UIKit UIView.overrideUserInterfaceStyle](https://developer.apple.com/documentation/uikit/uiview/overrideuserinterfacestyle)

### A11Y402: Accessibility label names the control type

`Ledger/BalanceViewController.swift:64`: The label "Balance tab" ends with "tab", which VoiceOver already says from the element's traits. (VoiceOver)

**Fix: Drop the control type from the label** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#uikit))

1. Shorten the label to the action \("Close"\); set accessibilityTraits = .button on custom controls.

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria)

### A11Y601: The app plays video

`Ledger/TutorialViewController.swift:9`: AVPlayerViewController plays video here: check that it has captions and an audio-described track. (Captions, Audio Descriptions)

**Fix: Check the media, then decide on the two labels** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/contrast-color-media.md#captions-and-audio-descriptions))

1. List the videos of the common tasks and check each for a captions track and a described-audio track.
2. With AVPlayerViewController, the system shows legible and audio options when the asset has them.

Sources: [Captions evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria), [Audio Descriptions evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria), [AVFoundation: selecting subtitles and alternative audio tracks](https://developer.apple.com/documentation/avfoundation/selecting-subtitles-and-alternative-audio-tracks)

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

1 error, 5 warnings, 3 info. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)).

<sub>[a11ylabel](https://github.com/muhittincamdali/a11ylabel) 0.1.0, rules nutrition-labels@2026.10.28 (sources read 2026-10-28). Reads the project's files; it does not build or run the app.</sub>
