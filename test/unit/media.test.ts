import { describe, expect, it } from 'vitest';
import type { ColorAsset } from '../../src/collect/assets.js';
import { sourceFile } from '../../src/collect/sources.js';
import { checkContrastVariants, checkVideo } from '../../src/rules/media.js';

const color = (name: string, hasHighContrast: boolean, system = false): ColorAsset => ({
  path: `/app/Assets.xcassets/${name}.colorset`,
  name,
  hasDark: true,
  hasHighContrast,
  system,
});

describe('checkContrastVariants', () => {
  it('counts custom colours without a high contrast variant', () => {
    const hits = checkContrastVariants([
      color('Accent', false),
      color('Brand', true),
      color('Card', false),
      color('Muted', false),
      color('Rule', false),
      color('Label', false, true),
    ]);
    expect(hits.map((hit) => [hit.rule, hit.file, hit.message])).toEqual([
      [
        'A11Y501',
        '/app/Assets.xcassets/Accent.colorset/Contents.json',
        '4 of 5 asset colours have no high contrast variant: Accent, Card, Muted and 1 more.',
      ],
    ]);
    expect(checkContrastVariants([color('Brand', true), color('Label', false, true)])).toEqual([]);
  });
});

describe('checkVideo', () => {
  it.each([
    [
      '/a/Player.swift',
      'import AVKit\nlet controller = AVPlayerViewController()',
      'AVPlayerViewController',
      2,
    ],
    [
      '/a/Clip.swift',
      'import SwiftUI\nimport AVKit\nVideoPlayer(player: player)',
      'VideoPlayer',
      3,
    ],
    [
      '/a/Intro.tsx',
      "import Video from 'react-native-video';\n<Video source={intro} />",
      'Video',
      2,
    ],
    ['/a/Promo.tsx', 'const player = useVideoPlayer(source);', 'useVideoPlayer', 1],
    [
      '/a/lib/clip.dart',
      'final c = VideoPlayerController.networkUrl(uri);',
      'VideoPlayerController',
      1,
    ],
  ])('%s', (path, text, what, line) => {
    expect(checkVideo(sourceFile(path, text)).map((hit) => [hit.line, hit.message])).toEqual([
      [line, `${what} plays video here: check that it has captions and an audio-described track.`],
    ]);
  });

  it('ignores audio-only players', () => {
    expect(checkVideo(sourceFile('/a/Audio.swift', 'let player = AVPlayer(url: url)'))).toEqual([]);
  });
});
