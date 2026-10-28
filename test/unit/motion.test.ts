import { describe, expect, it } from 'vitest';
import { sourceFile } from '../../src/collect/sources.js';
import { checkMotion, motionTriggers, readsReduceMotion } from '../../src/rules/motion.js';

const triggers = (path: string, text: string) =>
  motionTriggers(sourceFile(path, text)).map((trigger) => trigger.what);

const run = (files: Record<string, string>) =>
  checkMotion(
    Object.entries(files).map(([path, text]) => sourceFile(`/app/${path}`, text)),
    '/app',
  ).map((hit) => [hit.rule, hit.file.slice(5), hit.line, hit.message]);

describe('motionTriggers', () => {
  it('finds SwiftUI and UIKit motion', () => {
    const text = `import SwiftUI
Circle().animation(.linear(duration: 1).repeatForever(autoreverses: false), value: spin)
card.rotation3DEffect(.degrees(20), axis: (x: 1, y: 0, z: 0))
TimelineView(.animation) { context in Waves(time: context.date) }
let tilt = UIInterpolatingMotionEffect(keyPath: "center.x", type: .tiltAlongHorizontalAxis)
pulse.repeatCount = .infinity
UIView.animate(withDuration: 1, delay: 0, options: [.autoreverse, .repeat], animations: {})
UIView.animate(withDuration: 1, delay: 0, options: [.curveEaseIn], animations: {})
// .repeatForever() in a comment
`;
    expect(triggers('/app/A.swift', text)).toEqual([
      'repeatForever, an animation that never stops',
      'rotation3DEffect, a rotation in depth',
      'TimelineView(.animation), motion redrawn every frame',
      'UIInterpolatingMotionEffect, a parallax effect',
      'repeatCount set to infinity, a Core Animation that never stops',
      'the .repeat option, an animation that never stops',
    ]);
  });

  it('finds React Native motion', () => {
    const text = `Animated.loop(Animated.timing(spin, { toValue: 1, useNativeDriver: true })).start();
<LottieView source={confetti} autoPlay />
<LottieView source={check} autoPlay loop={false} />
<LottieView source={idle} />
<Carousel data={slides} autoPlay={true} renderItem={renderSlide} />
<Carousel data={slides} renderItem={renderSlide} />
`;
    expect(triggers('/app/Home.tsx', text)).toEqual([
      'Animated.loop, an animation that never stops',
      'an auto-playing LottieView that loops',
      'an auto-advancing Carousel',
    ]);
  });

  it('finds Flutter motion', () => {
    const text = `late final controller = AnimationController(vsync: this, duration: d)..repeat(reverse: true);
_spinController.repeat();
Lottie.asset('assets/confetti.json');
Lottie.asset('assets/done.json', repeat: false);
Lottie.network(url, controller: lottieController);
CarouselSlider(options: CarouselOptions(autoPlay: true), items: slides);
`;
    expect(triggers('/app/lib/home.dart', text)).toEqual([
      'repeat(), an animation that never stops',
      'repeat(), an animation that never stops',
      'a Lottie animation that plays and loops on its own',
      'autoPlay: true, an auto-advancing carousel',
    ]);
    const timer = `Timer.periodic(const Duration(seconds: 3), (_) => pages.nextPage(duration: d, curve: c));`;
    expect(triggers('/app/lib/banner.dart', timer)).toEqual([
      'pages turned by a periodic timer, an auto-advancing carousel',
    ]);
  });

  it('knows what reads Reduce Motion', () => {
    const reads = (path: string, text: string) => readsReduceMotion(sourceFile(path, text));
    expect(reads('/a.swift', '@Environment(\\.accessibilityReduceMotion) var reduce')).toBe(true);
    expect(reads('/a.swift', 'if UIAccessibility.isReduceMotionEnabled {}')).toBe(true);
    expect(reads('/a.m', 'if (UIAccessibilityIsReduceMotionEnabled()) {}')).toBe(true);
    expect(reads('/a.tsx', 'AccessibilityInfo.isReduceMotionEnabled().then(set)')).toBe(true);
    expect(reads('/a.tsx', 'const reduced = useReducedMotion();')).toBe(true);
    expect(
      reads('/a.dart', 'View.of(context).platformDispatcher.accessibilityFeatures.reduceMotion'),
    ).toBe(true);
    expect(reads('/a.dart', 'MediaQuery.disableAnimationsOf(context)')).toBe(false);
  });
});

describe('checkMotion', () => {
  it('warns when nothing in the app reads Reduce Motion', () => {
    expect(run({ 'Spinner.swift': 'x.repeatForever()' })).toEqual([
      [
        'A11Y301',
        'Spinner.swift',
        1,
        'repeatForever, an animation that never stops, and nothing in the app reads Reduce Motion.',
      ],
    ]);
  });

  it('notes motion in a file that does not read it when another file does', () => {
    expect(
      run({
        'Motion.swift': 'let reduce = UIAccessibility.isReduceMotionEnabled\nx.repeatForever()',
        'Spinner.swift': 'x.repeatForever()',
      }),
    ).toEqual([
      [
        'A11Y302',
        'Spinner.swift',
        1,
        'repeatForever, an animation that never stops, in a file that does not read Reduce Motion (the app reads it in Motion.swift).',
      ],
    ]);
  });

  it('warns about ReduceMotion.Never', () => {
    expect(run({ 'Fab.tsx': 'withSpring(1, { reduceMotion: ReduceMotion.Never })' })).toEqual([
      [
        'A11Y304',
        'Fab.tsx',
        1,
        'ReduceMotion.Never: this Reanimated animation runs even when Reduce Motion is on.',
      ],
    ]);
  });

  it('warns when Flutter reads only disableAnimations', () => {
    const found = run({ 'lib/a.dart': 'final off = MediaQuery.disableAnimationsOf(context);' });
    expect(found.map(([rule, file, line]) => [rule, file, line])).toEqual([
      ['A11Y303', 'lib/a.dart', 1],
    ]);
    expect(
      run({
        'lib/a.dart':
          'final off = MediaQuery.disableAnimationsOf(context) || PlatformDispatcher.instance.accessibilityFeatures.reduceMotion;',
      }),
    ).toEqual([]);
  });
});
