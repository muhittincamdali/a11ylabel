# Contrast, colour and media

Four labels depend on how the app looks and what its media carries, which code shows only in part.
a11ylabel marks them "check by hand" in the label table and points at what it can see.

## Sufficient Contrast

Apple's [Sufficient Contrast criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria):
the common tasks meet "general contrast guidelines by default — usually 4.5 to 1 for most text
elements". If they do not, an app built with Apple's frameworks may still claim the label when the
Increase Contrast setting fixes it.

a11ylabel cannot measure contrast: it does not know which colour is drawn on which. It reports
A11Y501 (info) when asset catalog colours have no High Contrast variant, because then Increase
Contrast cannot change them.

To add one, select the colour set in Xcode, tick High Contrast under Appearances in the
Attributes inspector and fill the new wells; in Contents.json that is an entry with
`"appearances": [{"appearance": "contrast", "value": "high"}]` (and one more with luminosity dark
for the dark high contrast value). Xcode 27.1's `actool` compiles it to the
`UIAppearanceHighContrastAny` appearance. Then measure: text and controls against their background,
in light and dark, with and without Increase Contrast
(`xcrun simctl ui booted increase_contrast enabled` on a simulator).

## Differentiate Without Color Alone

The [criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria)
ask that the common tasks do not rely on colour as the only way to convey information: add a
shape, a symbol, text or a position, or let people choose another colour scheme. Whether colour is
the only difference is a question of design; a11ylabel only notes, as a signal, code that reads the
Differentiate Without Color setting (`accessibilityDifferentiateWithoutColor`,
`UIAccessibility.shouldDifferentiateWithoutColor`).

## Captions and Audio Descriptions

The [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria)
and [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria)
labels are about the media itself. a11ylabel reports A11Y601 (info) once per file that plays video
(`AVPlayerViewController`, SwiftUI `VideoPlayer`, `AVPlayerLayer`, react-native-video and expo-av
`Video`, expo-video, Flutter's `video_player` and `chewie`), so you know the labels apply; it
cannot see whether the videos have caption or described-audio tracks.

- Native: `AVPlayerViewController` and `VideoPlayer` show the subtitle and audio choices an asset
  carries; see [Selecting subtitles and alternative audio tracks](https://developer.apple.com/documentation/avfoundation/selecting-subtitles-and-alternative-audio-tracks).
- React Native: expose the text tracks of your player (`react-native-video` `textTracks`,
  `expo-video` subtitle tracks).
- Flutter: `VideoPlayerController` takes a `closedCaptionFile`; show it with `ClosedCaption`.

Apple adds that if the app can display captions but very little of its content has them, it should
not claim Captions. Audio-only content counts for Captions too: a transcript of a podcast or song
lyrics qualifies.

## Sources

- Apple: [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria),
  [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria),
  [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria),
  [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria)
  evaluation criteria; [UITraitCollection.accessibilityContrast](https://developer.apple.com/documentation/uikit/uitraitcollection/accessibilitycontrast);
  [Selecting subtitles and alternative audio tracks](https://developer.apple.com/documentation/avfoundation/selecting-subtitles-and-alternative-audio-tracks).
