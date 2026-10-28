# VoiceOver and Voice Control

Apple's [VoiceOver criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria)
ask that every common task can be completed with VoiceOver alone, and that "All controls should
have concise, accurate labels." The
[Voice Control criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria)
ask that people can activate every control by voice: saying "Show names" should show a name on
each one. A button that shows only an image fails both.

a11ylabel can see part of this in code. Reading order, grouping, values, custom actions and focus
in modal views need a person with VoiceOver on, which is why the label table marks VoiceOver and
Voice Control as checked only in part.

## What a11ylabel finds

| Rule    | Severity | Labels                   | What                                                     |
| ------- | -------- | ------------------------ | -------------------------------------------------------- |
| A11Y401 | warning  | VoiceOver, Voice Control | A button that shows only an image or icon, with no label |
| A11Y402 | info     | VoiceOver                | A label that ends with the control type ("Close button") |

Apple's criteria on the second: "Ensure that labels don't include control types like "checkbox" or
states like "checked."" VoiceOver already says the type from the element's traits, so the label is
heard twice.

## SwiftUI

```swift
// Before
Button(action: add) { Image(systemName: "plus") }              // A11Y401
Button(action: showFilters) { Image("Filter") }                 // A11Y401: VoiceOver reads "Filter" from the asset name

// After
Button(action: add) { Label("Add item", systemImage: "plus") }  // shows the icon in a toolbar
Button(action: showFilters) { Image("Filter") }
    .accessibilityLabel("Filters")
```

`Image(_:bundle:)` creates a labelled image from the asset name, which is rarely the label you
want; `Image(decorative:)` has none at all. `Label` with `.labelStyle(.iconOnly)` keeps the icon
and gives VoiceOver and Voice Control a name. For Voice Control, `accessibilityInputLabels(_:)`
adds other names people may say.

## UIKit

```swift
hideButton.setImage(UIImage(systemName: "eye.slash"), for: .normal)
hideButton.accessibilityLabel = "Hide balance"

let export = UIBarButtonItem(image: UIImage(systemName: "square.and.arrow.up"), style: .plain,
                             target: self, action: #selector(exportStatement))
export.accessibilityLabel = "Export statement"
```

a11ylabel looks for a title or `accessibilityLabel` on the same button anywhere in the file. For
standard actions, `UIBarButtonItem(systemItem:)` comes with a localized label.

## React Native and Expo

```tsx
// Before
<Pressable onPress={search}>
  <Image source={require('./assets/search.png')} />
</Pressable>

// After
<Pressable onPress={search} accessibilityRole="button" accessibilityLabel="Search">
  <Image source={require('./assets/search.png')} />
</Pressable>
```

`aria-label` works too. a11ylabel reads `Pressable` and the `Touchable*` components whose children
are only icons and images (`Image`, `Svg`, `Icon`, `Ionicons`, `MaterialIcons` and the other
vector icon sets); children with text, other components or an expression are left alone, as is a
touchable that spreads props (`{...props}`). In a file that imports `react-native-paper`, its
`IconButton` needs `accessibilityLabel`.

## Flutter

```dart
// Before
IconButton(icon: const Icon(Icons.refresh), onPressed: refresh);           // A11Y401

// After
IconButton(icon: const Icon(Icons.refresh), tooltip: 'Refresh', onPressed: refresh);
```

[`IconButton.tooltip`](https://api.flutter.dev/flutter/material/IconButton/tooltip.html) "is used
for accessibility". The same holds for `FloatingActionButton.tooltip`. A `CupertinoButton` with an
`Icon` needs the icon's `semanticLabel`, or a `Semantics(label: …, button: true)` around it;
a11ylabel leaves buttons inside a `Semantics` with a label alone.

## Sources

- Apple: [VoiceOver evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria),
  [Voice Control evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria),
  [accessibilityLabel(\_:)](<https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)>),
  [accessibilityInputLabels(\_:)](<https://developer.apple.com/documentation/swiftui/view/accessibilityinputlabels(_:)>).
- React Native: [Accessibility](https://reactnative.dev/docs/accessibility).
- Flutter: [IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html),
  [Icon.semanticLabel](https://api.flutter.dev/flutter/widgets/Icon/semanticLabel.html).
