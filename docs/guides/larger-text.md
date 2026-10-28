# Larger Text

Apple's [Larger Text criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)
ask that people can enlarge text "to at least 200% or the maximum font size for the system", and
that body text grows without overlapping or severe truncation. On iOS, body text passes 200% at the
AX3 size: Apple's page says Dynamic Type "reaches sizes larger than 200% at the AX3 size". In code
that is `DynamicTypeSize.accessibility3` (SwiftUI) and
`UIContentSizeCategory.accessibilityExtraLarge` (UIKit).

Zoom and Hover Text do not count: they work in every app, so the label is about the app's own
text.

## What a11ylabel finds

| Rule    | Severity | What                                                                                    |
| ------- | -------- | --------------------------------------------------------------------------------------- |
| A11Y101 | error    | Scaling turned off or capped below 200% for the whole app                               |
| A11Y102 | warning  | One text or view that does not scale                                                    |
| A11Y103 | warning  | One text or view capped below 200%                                                      |
| A11Y104 | warning  | A fixed point size Dynamic Type does not scale (`.system(size:)`, `UIFont(name:size:)`) |

An error blocks the label: no text in the app can reach 200%. A warning is a place to look at the
largest size: Apple accepts that repeated, predictable navigation such as a tab bar stays small
(offer the Large Content Viewer for it), not that primary content does.

To see the largest size: Settings › Accessibility › Display & Text Size › Larger Text, turn on
Larger Accessibility Sizes and drag to the end; on a simulator,
`xcrun simctl ui booted content_size accessibility-extra-extra-extra-large`.

## SwiftUI

Text styles scale; point sizes do not.

```swift
// Before: fixed sizes, and a limit on the whole scene
WindowGroup {
    PantryListView()
        .dynamicTypeSize(...DynamicTypeSize.xLarge)   // A11Y101
}
Text(item.name).font(.system(size: 17, weight: .semibold))   // A11Y104

// After
WindowGroup {
    PantryListView()
}
Text(item.name).font(.headline)
Text(recipe).font(.custom("Georgia", size: 16, relativeTo: .body))
```

- `Font.custom(_:size:)` scales with the body style; `Font.custom(_:fixedSize:)` and
  `.system(size:)` do not.
- For sizes that are not fonts (an icon, a padding), use `@ScaledMetric`.
- When rows get crowded, switch the layout at accessibility sizes instead of limiting the size:
  read `@Environment(\.dynamicTypeSize)` and check `isAccessibilitySize`.
- A limit that ends at `.accessibility3` or above keeps the label; a fixed `.dynamicTypeSize(.large)`
  or a range that ends below AX3 does not. For a control that has to stay small, add
  `.accessibilityShowsLargeContentViewer()`.

The [fixed app](https://github.com/muhittincamdali/a11ylabel/tree/main/fixtures/native-swiftui-ready) does all of this; the simulator screenshots
in the README show it at AX5 next to the original.

## UIKit

```swift
// Before
amountLabel.font = .systemFont(ofSize: 34, weight: .bold)    // A11Y104
amountLabel.adjustsFontForContentSizeCategory = false        // A11Y102
window.maximumContentSizeCategory = .extraExtraLarge         // A11Y101

// After
let bold = UIFont.systemFont(ofSize: 34, weight: .bold)
amountLabel.font = UIFontMetrics(forTextStyle: .largeTitle).scaledFont(for: bold)
amountLabel.adjustsFontForContentSizeCategory = true
amountLabel.numberOfLines = 0
```

`adjustsFontForContentSizeCategory` only works with a font from `preferredFont(forTextStyle:)` or
`UIFontMetrics`. A `maximumContentSizeCategory` below `.accessibilityExtraLarge` on the window
locks every screen; on one view, it is a warning. Views that cannot grow can offer
`UILargeContentViewerInteraction`.

## React Native and Expo

Text follows the system size by default (`allowFontScaling` is `true`).

```tsx
// Before
<Text allowFontScaling={false}>{item.eta}</Text>               // A11Y102
<Text maxFontSizeMultiplier={1.2}>Courier</Text>               // A11Y103

// After
<Text>{item.eta}</Text>
<Text maxFontSizeMultiplier={2}>Courier</Text>
```

- `maxFontSizeMultiplier` of 2 or more keeps 200%; `0` removes the limit.
- `Text.defaultProps.allowFontScaling = false` was the usual way to turn scaling off for a whole
  app. React Native 0.78 moved to React 19, which
  [applies defaultProps only to class components](https://react.dev/blog/2024/04/25/react-19-upgrade-guide),
  and `Text` is a function component, so the line no longer does anything. a11ylabel reports it
  (A11Y101) only for React Native before 0.78, or when the version is not known.
- Let rows grow: no fixed heights around text, and `numberOfLines` only where the full text is
  shown elsewhere.

## Flutter

Flutter scales text with `MediaQuery.textScalerOf(context)`. Turning that off in
`MaterialApp.builder` turns it off everywhere.

```dart
// Before
MaterialApp(
  builder: (context, child) => MediaQuery.withClampedTextScaling(
    maxScaleFactor: 1.3,                         // A11Y101: every text stops at 130%
    child: child!,
  ),
);
Text(tide.height, textScaler: TextScaler.noScaling);   // A11Y102

// After
MaterialApp(home: const TidesPage());
Text(tide.height);
```

- `TextScaler.noScaling`, `TextScaler.linear(x)` with a number, `MediaQuery.withNoTextScaling` and
  the older `textScaleFactor:` all fix the size.
- If a widget cannot grow (a bottom navigation bar), clamp only that widget with
  `MediaQuery.withClampedTextScaling(maxScaleFactor: 2.0, child: …)`.

The [flutter-tide fixture](https://github.com/muhittincamdali/a11ylabel/tree/main/fixtures/flutter-tide) on the iOS 27.0 simulator at AX5 shows its
text at 130%: see `docs/media/simulator/flutter-tide-ax5-dark.png`.

## Sources

- Apple: [Larger Text evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria),
  [DynamicTypeSize](https://developer.apple.com/documentation/swiftui/dynamictypesize),
  [dynamicTypeSize(\_:)](<https://developer.apple.com/documentation/swiftui/view/dynamictypesize(_:)>),
  [Font.custom(\_:fixedSize:)](<https://developer.apple.com/documentation/swiftui/font/custom(_:fixedsize:)>),
  [UIFontMetrics](https://developer.apple.com/documentation/uikit/uifontmetrics),
  [adjustsFontForContentSizeCategory](https://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/adjustsfontforcontentsizecategory),
  [maximumContentSizeCategory](https://developer.apple.com/documentation/uikit/uiview/maximumcontentsizecategory).
- React Native: [Text](https://reactnative.dev/docs/text); React:
  [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).
- Flutter: [TextScaler.noScaling](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html),
  [MediaQuery.withClampedTextScaling](https://api.flutter.dev/flutter/widgets/MediaQuery/withClampedTextScaling.html).
