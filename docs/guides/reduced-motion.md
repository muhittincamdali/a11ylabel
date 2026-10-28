# Reduced Motion

Apple's [Reduced Motion criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria)
name the motion that can cause discomfort: depth simulation (parallax, animated blur,
depth-of-field), multi-axis or multi-speed motion, spinning and vortex effects, and auto-advancing
carousels or other ongoing motion. When the person's setting asks for reduced motion, the app
should stop such motion or replace it, for example with a dissolve or a fade. An app without these
triggers may claim the label as it is; motion that carries meaning should be changed, not removed.

## What a11ylabel finds

| Rule    | Severity | What                                                                                  |
| ------- | -------- | ------------------------------------------------------------------------------------- |
| A11Y301 | warning  | A motion trigger, and nothing in the app reads the Reduce Motion setting              |
| A11Y302 | info     | A motion trigger in a file that does not read it, while another file does             |
| A11Y303 | warning  | A Flutter app that reads only `disableAnimations`, which iOS Reduce Motion never sets |
| A11Y304 | warning  | A Reanimated animation set to `ReduceMotion.Never`                                    |

The triggers a11ylabel looks for:

| Code         | Triggers                                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SwiftUI      | `repeatForever`, `rotation3DEffect`, `TimelineView(.animation)`                                                                                              |
| UIKit        | `UIInterpolatingMotionEffect` (parallax), `repeatCount` set to infinity, the `.repeat` animation option                                                      |
| React Native | `Animated.loop`, an auto-playing `LottieView` that loops (it loops by default), a `Carousel`, `PagerView` or `Swiper` with `autoPlay`                        |
| Flutter      | a controller's `repeat()`, `Lottie.asset`/`network`/`file`/`memory` (they animate and repeat by default), `autoPlay: true`, pages turned by `Timer.periodic` |

To test: Settings › Accessibility › Motion › Reduce Motion, then use the common tasks.

## SwiftUI and UIKit

```swift
struct SyncDot: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var syncing = true

    var body: some View {
        Circle()
            .opacity(syncing ? 0.2 : 1)
            .animation(reduceMotion ? nil : .easeInOut(duration: 0.8).repeatForever(), value: syncing)
    }
}
```

In UIKit, read `UIAccessibility.isReduceMotionEnabled` before starting the animation or adding a
`UIInterpolatingMotionEffect`, and observe `UIAccessibility.reduceMotionStatusDidChangeNotification`
to follow changes while the app runs.

## React Native and Expo

```tsx
const [reduceMotion, setReduceMotion] = useState(false);
useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
  return () => subscription.remove();
}, []);

useEffect(() => {
  if (reduceMotion) return;
  const loop = Animated.loop(pulse);
  loop.start();
  return () => loop.stop();
}, [reduceMotion]);
```

- [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/)
  animations follow the system setting by default (`ReduceMotion.System`); only
  `ReduceMotion.Never` (A11Y304) makes one ignore it. `useReducedMotion()` reads the setting.
- `LottieView` with `autoPlay` loops unless `loop={false}`; render the last frame instead when the
  setting is on.

## Flutter

Flutter's [`MediaQueryData.disableAnimations`](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html)
follows Android's Remove animations setting. Its documentation says that on iOS, reduced motion is
exposed separately through `AccessibilityFeatures.reduceMotion` "and does not set this flag". A
check of `disableAnimations` alone therefore never sees an iPhone's Reduce Motion (A11Y303).

```dart
bool reduceMotion(BuildContext context) =>
    MediaQuery.disableAnimationsOf(context) ||
    View.of(context).platformDispatcher.accessibilityFeatures.reduceMotion;

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  if (reduceMotion(context)) {
    _wave.value = 0.5;
  } else if (!_wave.isAnimating) {
    _wave.repeat(reverse: true);
  }
}
```

To react when the setting changes while the app runs, implement
`WidgetsBindingObserver.didChangeAccessibilityFeatures`. For Lottie, pass `animate: false` or
`repeat: false` when the setting is on.

## Sources

- Apple: [Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria),
  [accessibilityReduceMotion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion),
  [isReduceMotionEnabled](https://developer.apple.com/documentation/uikit/uiaccessibility/isreducemotionenabled).
- React Native: [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo); Reanimated:
  [Accessibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/).
- Flutter: [MediaQueryData.disableAnimations](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html),
  [AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html).
