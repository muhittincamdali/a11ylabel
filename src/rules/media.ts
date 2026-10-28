// Sufficient Contrast and the media labels: A11Y501 (asset colours without a high contrast
// variant) and A11Y601 (the app plays video, so Captions and Audio Descriptions apply). Neither
// label can be decided from code; these findings say where to look.
import { join } from 'node:path';
import type { ColorAsset } from '../collect/assets.js';
import type { SourceFile } from '../collect/sources.js';
import { appleVariant, type Hit, hitAt } from './hit.js';

const NAMED = 3;

export function checkContrastVariants(colors: readonly ColorAsset[]): Hit[] {
  const custom = colors.filter((color) => !color.system);
  const missing = custom.filter((color) => !color.hasHighContrast);
  const first = missing[0];
  if (!first) return [];
  const named = missing.slice(0, NAMED).map((color) => color.name);
  const rest = missing.length - named.length;
  return [
    {
      rule: 'A11Y501',
      file: join(first.path, 'Contents.json'),
      line: null,
      message: `${missing.length} of ${custom.length} asset colours have no high contrast variant: ${named.join(', ')}${rest > 0 ? ` and ${rest} more` : ''}.`,
      variant: 'asset-catalog',
    },
  ];
}

/** Video playback, per language: players that show video, not audio-only ones. */
const VIDEO: Record<SourceFile['language'], RegExp> = {
  swift: /\bAVPlayerViewController\b|\bVideoPlayer\s*\(|\bAVPlayerLayer\b/,
  objc: /\bAVPlayerViewController\b|\bAVPlayerLayer\b/,
  js: /<(?:Video|VideoView)\b|\buseVideoPlayer\s*\(/,
  dart: /\bVideoPlayerController\b|\bVideoPlayer\s*\(|\bChewie\s*\(|\bBetterPlayer\b/,
};

/** One finding per file that plays video, at the first place it does. */
export function checkVideo(file: SourceFile): Hit[] {
  const match = VIDEO[file.language].exec(file.code);
  if (!match) return [];
  const variant =
    file.language === 'js'
      ? 'react-native'
      : file.language === 'dart'
        ? 'flutter'
        : appleVariant(file);
  return [
    hitAt(
      file,
      match.index,
      'A11Y601',
      variant,
      `${match[0].replace(/[\s(<]+/g, '')} plays video here: check that it has captions and an audio-described track.`,
    ),
  ];
}
