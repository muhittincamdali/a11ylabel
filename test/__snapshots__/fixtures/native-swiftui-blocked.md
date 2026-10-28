## a11ylabel: Pantry (native iOS)

**2 labels blocked by the code \(Larger Text, Dark Interface\); 3 to review**

| Label | Status | Findings | What a11ylabel checks |
| --- | --- | --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | review | 2 warnings, 1 info | Icon-only buttons without an accessibility label, and labels that name the control type. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria) | review | 2 warnings | Icon-only buttons without a name Voice Control can show and say. |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | **blocked** | 1 error, 3 warnings | Text scaling turned off or capped below 200% \(for the whole app or one view\), and fixed font sizes that Dynamic Type does not scale. |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | **blocked** | 1 error, 1 info | A light appearance forced in Info.plist, the build settings, the Expo config or code; a Flutter app without a dark theme; asset colours without a dark variant. |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | check by hand | – | Nothing: whether colour is the only difference is a question of design, not of code a11ylabel can read. |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | check by hand | 1 info | Asset catalog colours without a high contrast variant for the Increase Contrast setting. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | review | 1 warning | Repeating, parallax, 3D and auto-playing animations in an app that never reads the Reduce Motion setting, or in files that do not. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | check by hand | 1 info | Whether the app plays video, which makes the label apply. |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | check by hand | 1 info | Whether the app plays video, which makes the label apply. |

- target Pantry · UIUserInterfaceStyle Light · iOS 18.0
- VoiceOver: Sets accessibility labels (`Pantry/PantryListView.swift`)
- Larger Text: Uses Dynamic Type text styles (`Pantry/RecipeView.swift`)

| Rule | Severity | Where | Finding |
| --- | --- | --- | --- |
| A11Y101 | error | `Pantry/PantryApp.swift:9` | .dynamicTypeSize\(...DynamicTypeSize.xLarge\) on the app's scene: no text grows past xLarge, below 200%. |
| A11Y201 | error | `Pantry.xcodeproj/project.pbxproj:194` | Pantry: INFOPLIST\_KEY\_UIUserInterfaceStyle is Light: the app ignores Dark Mode and nothing in the code turns it dark. |
| A11Y104 | warning | `Pantry/PantryListView.swift:25` | .system\(size:\) is a fixed point size: Dynamic Type does not scale it. |
| A11Y104 | warning | `Pantry/PantryListView.swift:28` | .system\(size:\) is a fixed point size: Dynamic Type does not scale it. |
| A11Y104 | warning | `Pantry/RecipeView.swift:15` | Font.custom\(\_:fixedSize:\) keeps its size whatever the system text size is. |
| A11Y301 | warning | `Pantry/PantryListView.swift:48` | repeatForever, an animation that never stops, and nothing in the app reads Reduce Motion. |
| A11Y401 | warning | `Pantry/PantryListView.swift:58` | A Button whose label is only the image "Filter", whose asset name becomes the label, with no accessibilityLabel. |
| A11Y401 | warning | `Pantry/PantryListView.swift:63` | A Button whose label is only the SF Symbol "plus", whose name is not a label you chose, with no accessibilityLabel. |
| A11Y205 | info | `Pantry/Assets.xcassets/Brand.colorset/Contents.json` | 3 of 3 asset colours have no dark variant: Brand, Card, Muted. |
| A11Y402 | info | `Pantry/PantryListView.swift:38` | The label "Delete button" ends with "button", which VoiceOver already says from the element's traits. |
| A11Y501 | info | `Pantry/Assets.xcassets/Brand.colorset/Contents.json` | 3 of 3 asset colours have no high contrast variant: Brand, Card, Muted. |
| A11Y601 | info | `Pantry/RecipeView.swift:10` | VideoPlayer plays video here: check that it has captions and an audio-described track. |

<details><summary>What each finding means and how to fix it</summary>

### A11Y101: Text size locked for the whole app

`Pantry/PantryApp.swift:9`: .dynamicTypeSize\(...DynamicTypeSize.xLarge\) on the app's scene: no text grows past xLarge, below 200%. (Larger Text)

**Fix: Remove the Dynamic Type limit from the scene** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#swiftui))

1. Remove .dynamicTypeSize\(…\) from the WindowGroup content, or raise its upper bound to .accessibility3 or above \(AX3 is the first size above 200% for body text\).
2. Put a limit only on the views that cannot grow, such as a tab bar, and give them .accessibilityShowsLargeContentViewer\(\).
3. Preview the screens with .dynamicTypeSize\(.accessibility5\).

Sources: [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria), [React Native Text: allowFontScaling, maxFontSizeMultiplier](https://reactnative.dev/docs/text), [React 19 upgrade guide: defaultProps removed from function components](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Flutter MediaQuery.withClampedTextScaling](https://api.flutter.dev/flutter/widgets/MediaQuery/withClampedTextScaling.html), [SwiftUI dynamicTypeSize\(\_:\)](https://developer.apple.com/documentation/swiftui/view/dynamictypesize(_:)), [UIKit UIView.maximumContentSizeCategory](https://developer.apple.com/documentation/uikit/uiview/maximumcontentsizecategory)

### A11Y201: Light appearance forced for the whole app

`Pantry.xcodeproj/project.pbxproj:194`: Pantry: INFOPLIST\_KEY\_UIUserInterfaceStyle is Light: the app ignores Dark Mode and nothing in the code turns it dark. (Dark Interface)

**Fix: Remove the build setting that forces light** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/dark-interface.md#infoplist-and-build-settings))

1. Delete INFOPLIST\_KEY\_UIUserInterfaceStyle \(Build Settings \> Info.plist Values \> User Interface Style\), or set it to Automatic.
2. Give every custom colour a dark variant in the asset catalog, then use the common tasks in Dark Mode.

Sources: [UIUserInterfaceStyle \(Information Property List\)](https://developer.apple.com/documentation/bundleresources/information-property-list/uiuserinterfacestyle), [Dark Interface evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria), [Expo app config: userInterfaceStyle](https://docs.expo.dev/versions/latest/config/app/)

### A11Y104: Fixed font size

`Pantry/PantryListView.swift:25`: .system\(size:\) is a fixed point size: Dynamic Type does not scale it. (Larger Text)

**Fix: Use a text style, or a size relative to one** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/larger-text.md#swiftui))

1. Replace .system\(size: 17\) with a text style such as .body, .headline or .title.
2. For a custom size or font, use .system\(size: 17, …\) only for decoration; for text, use Font.custom\("Name", size: 17, relativeTo: .body\) or a @⁠ScaledMetric size.

Sources: [SwiftUI Font.system\(size:weight:design:\)](https://developer.apple.com/documentation/swiftui/font/system(size:weight:design:)), [SwiftUI Font.custom\(\_:fixedSize:\)](https://developer.apple.com/documentation/swiftui/font/custom(_:fixedsize:)), [UIKit UIFontMetrics](https://developer.apple.com/documentation/uikit/uifontmetrics), [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)

### A11Y104: Fixed font size

`Pantry/PantryListView.swift:28`: .system\(size:\) is a fixed point size: Dynamic Type does not scale it. (Larger Text)

**Fix: Use a text style, or a size relative to one** (steps above)

Sources: [SwiftUI Font.system\(size:weight:design:\)](https://developer.apple.com/documentation/swiftui/font/system(size:weight:design:)), [SwiftUI Font.custom\(\_:fixedSize:\)](https://developer.apple.com/documentation/swiftui/font/custom(_:fixedsize:)), [UIKit UIFontMetrics](https://developer.apple.com/documentation/uikit/uifontmetrics), [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)

### A11Y104: Fixed font size

`Pantry/RecipeView.swift:15`: Font.custom\(\_:fixedSize:\) keeps its size whatever the system text size is. (Larger Text)

**Fix: Use a text style, or a size relative to one** (steps above)

Sources: [SwiftUI Font.system\(size:weight:design:\)](https://developer.apple.com/documentation/swiftui/font/system(size:weight:design:)), [SwiftUI Font.custom\(\_:fixedSize:\)](https://developer.apple.com/documentation/swiftui/font/custom(_:fixedsize:)), [UIKit UIFontMetrics](https://developer.apple.com/documentation/uikit/uifontmetrics), [Larger Text evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)

### A11Y301: Motion in an app that never reads Reduce Motion

`Pantry/PantryListView.swift:48`: repeatForever, an animation that never stops, and nothing in the app reads Reduce Motion. (Reduced Motion)

**Fix: Read Reduce Motion and calm the animation** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/reduced-motion.md#swiftui-and-uikit))

1. Add @⁠Environment\(\\.accessibilityReduceMotion\) var reduceMotion to the view.
2. When it is true, drop repeatForever, rotation and 3D effects, or replace them with a fade.

Sources: [Reduced Motion evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria), [SwiftUI accessibilityReduceMotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion), [UIKit UIAccessibility.isReduceMotionEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isreducemotionenabled), [React Native AccessibilityInfo.isReduceMotionEnabled](https://reactnative.dev/docs/accessibilityinfo), [Flutter AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)

### A11Y401: Icon-only button without an accessibility label

`Pantry/PantryListView.swift:58`: A Button whose label is only the image "Filter", whose asset name becomes the label, with no accessibilityLabel. (VoiceOver, Voice Control)

**Fix: Name the button** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#swiftui))

1. Use Label\("Close", systemImage: "xmark"\).labelStyle\(.iconOnly\) as the button's label, or add .accessibilityLabel\("Close"\).
2. Name the action, not the control: "Close", not "Close button" or "X".

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y401: Icon-only button without an accessibility label

`Pantry/PantryListView.swift:63`: A Button whose label is only the SF Symbol "plus", whose name is not a label you chose, with no accessibilityLabel. (VoiceOver, Voice Control)

**Fix: Name the button** (steps above)

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria), [Voice Control evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria), [SwiftUI accessibilityLabel\(\_:\)](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)), [React Native accessibility: accessibilityLabel](https://reactnative.dev/docs/accessibility), [Flutter IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)

### A11Y205: Asset colours without a dark variant

`Pantry/Assets.xcassets/Brand.colorset/Contents.json`: 3 of 3 asset colours have no dark variant: Brand, Card, Muted. (Dark Interface)

**Fix: Add a dark value to each colour** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/dark-interface.md#asset-catalog-colours))

1. Select the colour set in Xcode, set Appearances to "Any, Dark" in the Attributes inspector and fill the Dark well.
2. Keep a single value only for colours that read well on both light and dark backgrounds.

Sources: [Supporting Dark Mode in your interface](https://developer.apple.com/documentation/uikit/supporting-dark-mode-in-your-interface)

### A11Y402: Accessibility label names the control type

`Pantry/PantryListView.swift:38`: The label "Delete button" ends with "button", which VoiceOver already says from the element's traits. (VoiceOver)

**Fix: Drop the control type from the label** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/voiceover.md#swiftui))

1. Shorten the label to the action \("Close"\); add .accessibilityAddTraits\(.isButton\) where the view is not already a Button.

Sources: [VoiceOver evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria)

### A11Y501: Asset colours without a high contrast variant

`Pantry/Assets.xcassets/Brand.colorset/Contents.json`: 3 of 3 asset colours have no high contrast variant: Brand, Card, Muted. (Sufficient Contrast)

**Fix: Check the contrast, then add high contrast values where needed** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/contrast-color-media.md#sufficient-contrast))

1. Measure text and control colours against their backgrounds \(about 4.5:1 for most text\).
2. Where the default falls short, tick High Contrast in the colour set's Attributes inspector and fill the new wells with stronger values.

Sources: [Sufficient Contrast evaluation criteria \(App Store Connect Help\)](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria), [UIKit UITraitCollection.accessibilityContrast](https://developer.apple.com/documentation/uikit/uitraitcollection/accessibilitycontrast)

### A11Y601: The app plays video

`Pantry/RecipeView.swift:10`: VideoPlayer plays video here: check that it has captions and an audio-described track. (Captions, Audio Descriptions)

**Fix: Check the media, then decide on the two labels** ([guide](https://github.com/muhittincamdali/a11ylabel/blob/main/docs/guides/contrast-color-media.md#captions-and-audio-descriptions))

1. List the videos of the common tasks and check each for a captions track and a described-audio track.
2. With AVPlayerViewController or VideoPlayer, the system shows legible and audio options when the asset has them.

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

2 errors, 6 warnings, 4 info. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)).

<sub>[a11ylabel](https://github.com/muhittincamdali/a11ylabel) 0.0.0, rules nutrition-labels@2026.10.28 (sources read 2026-10-28). Reads the project's files; it does not build or run the app.</sub>
