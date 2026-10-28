## a11ylabel: expo-58-default (Expo)

**No blockers found in the code for VoiceOver, Voice Control, Larger Text, Dark Interface, Reduced Motion; 4 more to check by hand**

| Label | Status | Findings | What a11ylabel checks |
| --- | --- | --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | no blocker found | – | Icon-only buttons without an accessibility label, and labels that name the control type. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria) | no blocker found | – | Icon-only buttons without a name Voice Control can show and say. |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | no blocker found | – | Text scaling turned off or capped below 200% \(for the whole app or one view\), and fixed font sizes that Dynamic Type does not scale. |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | no blocker found | – | A light appearance forced in Info.plist, the build settings, the Expo config or code; a Flutter app without a dark theme; asset colours without a dark variant. |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | check by hand | – | Nothing: whether colour is the only difference is a question of design, not of code a11ylabel can read. |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | check by hand | – | Asset catalog colours without a high contrast variant for the Increase Contrast setting. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | no blocker found | – | Repeating, parallax, 3D and auto-playing animations in an app that never reads the Reduce Motion setting, or in files that do not. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | check by hand | – | Whether the app plays video, which makes the label apply. |

- `react-native` 0.88.0 (declared)
- `expo` 58.0.20 (declared)
- `expo-router` 58.0.27 (declared)
- `react-native-reanimated` 4.7.1 (declared)
- Dark Interface: Reads the colour scheme (`src/app/_layout.tsx` and 4 more)

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

0 errors, 0 warnings, 0 info. a11ylabel reads code; before claiming a label, Apple asks that people can complete every common task with the feature on ([overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)).

<sub>[a11ylabel](https://github.com/muhittincamdali/a11ylabel) 0.1.0, rules nutrition-labels@2026.10.28 (sources read 2026-10-28). Reads the project's files; it does not build or run the app.</sub>
