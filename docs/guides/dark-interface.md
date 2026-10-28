# Dark Interface

Apple's [Dark Interface criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria)
accept three ways to claim the label: the app is dark by default for all common tasks, it follows
the system Dark Mode, or it offers its own setting that keeps the interface dark. The goal is to
keep it dark: "Even temporary flashes of bright content may cause discomfort."

## What a11ylabel finds

| Rule    | Severity | What                                                                               |
| ------- | -------- | ---------------------------------------------------------------------------------- |
| A11Y201 | error    | A light appearance forced for the whole app, and nothing in the code turns it dark |
| A11Y202 | info     | The same, but the code can switch to dark: an in-app setting to check by hand      |
| A11Y203 | warning  | A light colour scheme set in code with a literal value                             |
| A11Y204 | warning  | A Flutter `MaterialApp` without `darkTheme`                                        |
| A11Y205 | info     | Asset catalog colours without a dark variant                                       |

An app whose `UIUserInterfaceStyle` is `Dark` is dark by default: a11ylabel reports nothing for it
and does not ask for dark colour variants.

## Info.plist and build settings

[`UIUserInterfaceStyle`](https://developer.apple.com/documentation/bundleresources/information-property-list/uiuserinterfacestyle)
`Light` makes the app "ignore any changes to the systemwide style". It can be in the Info.plist
file or, with a generated Info.plist, in the build setting `INFOPLIST_KEY_UIUserInterfaceStyle`
(Build Settings › Info.plist Values › User Interface Style).

```xml
<!-- Remove this, or set Automatic -->
<key>UIUserInterfaceStyle</key>
<string>Light</string>
```

Then give the custom colours dark values (see [Asset catalog colours](#asset-catalog-colours)) and
use the common tasks in Dark Mode: launch, sign-in, purchase and settings included.

## An in-app setting

If the app stays light by default but has its own dark mode (here a night theme read at launch),
a11ylabel reports A11Y202 instead of A11Y201:

```swift
if UserDefaults.standard.bool(forKey: "nightTheme") {
    window.overrideUserInterfaceStyle = .dark
}
```

Apple accepts this when the setting keeps every common task dark. Check that the setting is easy
to find, that it applies to sheets, web views and alerts too, and consider following the system by
default, so that people who already use Dark Mode do not have to look for it.

## SwiftUI and UIKit

```swift
Home().preferredColorScheme(.light)             // A11Y203: this window stays light
window.overrideUserInterfaceStyle = .light      // A11Y203: this window stays light
```

Remove them, or set them only from the person's own choice (`nil` and `.unspecified` follow the
system). Use semantic colours (`Color.primary`, `Color(.systemBackground)`, `UIColor.label`) or
asset colours with dark values. a11ylabel does not report a literal light value when the same app
also sets dark, because that is a setting.

## Expo

Expo's [app config](https://docs.expo.dev/versions/latest/config/app/) says of
`userInterfaceStyle`: "If not provided, defaults to light." So both of these keep an Expo app
light:

```json
{ "expo": { "userInterfaceStyle": "light" } }
```

```json
{ "expo": { "name": "atlas" } }
```

Set `"userInterfaceStyle": "automatic"` (the default template does), install `expo-system-ui` for
Android, and read `useColorScheme()` for your colours. With an `ios/` folder, the Info.plist in it
decides and a11ylabel checks that instead; a missing key in the config then is not reported.
`app.config.js` and `app.config.ts` are read as text, not run.

## React Native

```tsx
Appearance.setColorScheme('light'); // A11Y203: the whole app stays light
```

Call it only with the person's own choice; `'auto'` removes the override. Read `useColorScheme()`
and pick colours for both schemes.

## Flutter

[`MaterialApp.darkTheme`](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html)
"Uses theme instead when null", so an app without it shows its light theme in Dark Mode.

```dart
MaterialApp(
  theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: seed)),
  darkTheme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: seed, brightness: Brightness.dark),
  ),
  // themeMode: ThemeMode.system is the default; ThemeMode.light is A11Y203.
);
```

Read colours from `Theme.of(context).colorScheme` rather than constants. A theme chosen in code
(`theme: dark ? darkTheme : lightTheme`) and a theme that is dark itself are not reported.

## Asset catalog colours

A colour set with one value looks the same in Dark Mode. In Xcode, select the colour set, set
Appearances to "Any, Dark" in the Attributes inspector and fill the Dark well. In the colour set's
Contents.json, that is an entry with
`"appearances": [{"appearance": "luminosity", "value": "dark"}]`. Colours that reference a system
colour (`labelColor`, `systemBlueColor`) adapt on their own and are not counted.

## Sources

- Apple: [Dark Interface evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria),
  [UIUserInterfaceStyle](https://developer.apple.com/documentation/bundleresources/information-property-list/uiuserinterfacestyle),
  [overrideUserInterfaceStyle](https://developer.apple.com/documentation/uikit/uiview/overrideuserinterfacestyle),
  [preferredColorScheme(\_:)](<https://developer.apple.com/documentation/swiftui/view/preferredcolorscheme(_:)>),
  [Supporting Dark Mode in your interface](https://developer.apple.com/documentation/uikit/supporting-dark-mode-in-your-interface).
- Expo: [app config](https://docs.expo.dev/versions/latest/config/app/). React Native:
  [Appearance](https://reactnative.dev/docs/appearance).
- Flutter: [MaterialApp.darkTheme](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html),
  [ThemeMode](https://api.flutter.dev/flutter/material/ThemeMode.html).
