import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { colorAsset, readColorAssets } from '../../src/collect/assets.js';
import { tree } from '../helpers/tree.js';

const srgb = (red: string) => ({
  'color-space': 'srgb',
  components: { alpha: '1.000', blue: '0.000', green: '0.000', red },
});

/** A colorset as Xcode 27.1 writes it, with the given extra appearances. */
function colorset(...appearances: [string, string][]): string {
  return JSON.stringify({
    colors: [
      { color: srgb('0.500'), idiom: 'universal' },
      ...appearances.map(([appearance, value]) => ({
        appearances: [{ appearance, value }],
        color: srgb('0.100'),
        idiom: 'universal',
      })),
    ],
    info: { author: 'xcode', version: 1 },
  });
}

describe('colorAsset', () => {
  it('sees the dark and the high contrast variants', () => {
    expect(colorAsset('/x', 'Brand', colorset(['luminosity', 'dark']))).toMatchObject({
      hasDark: true,
      hasHighContrast: false,
      system: false,
    });
    expect(
      colorAsset('/x', 'Brand', colorset(['luminosity', 'dark'], ['contrast', 'high'])),
    ).toMatchObject({ hasDark: true, hasHighContrast: true });
    expect(colorAsset('/x', 'Brand', colorset(['luminosity', 'light']))).toMatchObject({
      hasDark: false,
    });
  });

  it('marks a colour that references a system colour', () => {
    const text = JSON.stringify({
      colors: [{ color: { platform: 'ios', reference: 'labelColor' }, idiom: 'universal' }],
    });
    expect(colorAsset('/x', 'Text', text)).toMatchObject({ system: true, hasDark: false });
  });

  it('skips a colour set without a colour, as the AccentColor of a new project is', () => {
    const accent = JSON.stringify({ colors: [{ idiom: 'universal' }], info: { version: 1 } });
    expect(colorAsset('/x', 'AccentColor', accent)).toBeNull();
    expect(colorAsset('/x', 'Broken', '{ nope')).toBeNull();
    expect(colorAsset('/x', 'Odd', '{"colors": 3}')).toBeNull();
  });
});

describe('readColorAssets', () => {
  it('reads colour sets in catalogs and groups, and nothing outside a catalog', async () => {
    const root = tree({
      'ios/App/Assets.xcassets/Contents.json': '{}',
      'ios/App/Assets.xcassets/Brand.colorset/Contents.json': colorset(['luminosity', 'dark']),
      'ios/App/Assets.xcassets/Group/Card.colorset/Contents.json': colorset(),
      'ios/App/Loose.colorset/Contents.json': colorset(),
      'ios/Pods/Lib/Assets.xcassets/Pod.colorset/Contents.json': colorset(),
    });
    const { colors, notes } = await readColorAssets(join(root, 'ios'), root);
    expect(colors.map((color) => [color.name, color.hasDark])).toEqual([
      ['Brand', true],
      ['Card', false],
    ]);
    expect(notes).toEqual([]);
  });
});
