import { describe, expect, it } from 'vitest';
import { sourceFile } from '../../src/collect/sources.js';
import { CONTROL_TYPE, checkLabels, onlyIcons } from '../../src/rules/labels.js';

const run = (path: string, text: string) =>
  checkLabels(sourceFile(path, text)).map((hit) => [hit.rule, hit.line, hit.message]);
const rules = (path: string, text: string) => run(path, text).map(([rule, line]) => [rule, line]);

describe('SwiftUI icon buttons', () => {
  it('finds buttons whose label is only an image', () => {
    const text = `import SwiftUI
struct Toolbar: View {
    var body: some View {
        Button(action: close) { Image(systemName: "xmark") }
        Button { share() } label: {
            Image("ic_share_24")
                .resizable()
        }
        Button(action: favourite, label: { Image(decorative: "heart") })
        Button(action: close) { Image(systemName: "xmark") }
            .accessibilityLabel("Close")
        Button("Save", action: save)
        Button(action: save) { Text("Save") }
        Button(action: add) { Label("Add", systemImage: "plus") }
        Button(action: add) { Image(systemName: "plus").accessibilityLabel("Add") }
        Button(action: add) { Image(systemName: "plus"); Text("Add") }
        Button(action: menu) { Image("menu", label: Text("Menu")) }
    }
}
`;
    expect(run('/app/Toolbar.swift', text)).toEqual([
      [
        'A11Y401',
        4,
        'A Button whose label is only the SF Symbol "xmark", whose name is not a label you chose, with no accessibilityLabel.',
      ],
      [
        'A11Y401',
        5,
        'A Button whose label is only the image "ic_share_24", whose asset name becomes the label, with no accessibilityLabel.',
      ],
      [
        'A11Y401',
        9,
        'A Button whose label is only an image marked decorative, which VoiceOver skips, with no accessibilityLabel.',
      ],
    ]);
  });
});

describe('UIKit icon buttons', () => {
  it('finds buttons and bar items with an image and no label', () => {
    const text = `import UIKit
final class Player: UIViewController {
    let playButton = UIButton(type: .system)
    let shareButton = UIButton(type: .system)
    override func viewDidLoad() {
        playButton.setImage(UIImage(systemName: "play.fill"), for: .normal)
        shareButton.setImage(UIImage(systemName: "square.and.arrow.up"), for: .normal)
        shareButton.accessibilityLabel = "Share"
        let filter = UIBarButtonItem(image: UIImage(named: "filter"), style: .plain, target: self, action: #selector(f))
        let sort = UIBarButtonItem(image: UIImage(named: "sort"), style: .plain, target: self, action: #selector(s))
        sort.accessibilityLabel = "Sort"
        navigationItem.rightBarButtonItems = [filter, sort, UIBarButtonItem(systemItem: .add)]
    }
}
`;
    expect(run('/app/Player.swift', text)).toEqual([
      ['A11Y401', 6, 'playButton gets an image and no title or accessibilityLabel in this file.'],
      ['A11Y401', 9, 'A UIBarButtonItem with an image and no accessibilityLabel (filter).'],
    ]);
  });
});

describe('React Native icon buttons', () => {
  it('finds touchables with only an icon', () => {
    const text = `import { Pressable, TouchableOpacity, Text, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export function Header() {
  return (
    <View>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} />
      </Pressable>
      <TouchableOpacity onPress={openCart} style={styles.cart}>
        <View><Image source={cart} /></View>
      </TouchableOpacity>
      <Pressable onPress={close} accessibilityLabel="Close"><Ionicons name="close" /></Pressable>
      <Pressable onPress={save}><Text>Save</Text></Pressable>
      <Pressable onPress={more} aria-label="More"><Ionicons name="ellipsis" /></Pressable>
      <Pressable onPress={edit}><Ionicons name="pencil" />Edit</Pressable>
      <Pressable onPress={go} {...buttonProps}><Ionicons name="arrow" /></Pressable>
      <Pressable onPress={go}>{icon}</Pressable>
    </View>
  );
}
`;
    expect(run('/app/Header.tsx', text)).toEqual([
      ['A11Y401', 6, 'A Pressable that shows only an icon or image, without accessibilityLabel.'],
      [
        'A11Y401',
        9,
        'A TouchableOpacity that shows only an icon or image, without accessibilityLabel.',
      ],
    ]);
  });

  it("checks react-native-paper's IconButton only where it is imported", () => {
    const paper = `import { IconButton } from 'react-native-paper';\n<IconButton icon="camera" onPress={snap} />\n<IconButton icon="delete" accessibilityLabel="Delete photo" onPress={remove} />\n`;
    expect(rules('/app/Camera.tsx', paper)).toEqual([['A11Y401', 2]]);
    expect(rules('/app/Other.tsx', '<IconButton icon="camera" />')).toEqual([]);
  });

  it('tells icon-only children apart', () => {
    expect(onlyIcons('<Feather name="x" />')).toBe(true);
    expect(onlyIcons('<View><Svg width={2} /></View>')).toBe(true);
    expect(onlyIcons('<Feather name="x" />Close')).toBe(false);
    expect(onlyIcons('<Badge />')).toBe(false);
    expect(onlyIcons('<Image source={a} alt="Profile photo" />')).toBe(false);
    expect(onlyIcons('')).toBe(false);
  });
});

describe('Flutter icon buttons', () => {
  it('finds buttons without a tooltip or semantic label', () => {
    const text = `IconButton(icon: const Icon(Icons.close), onPressed: close);
IconButton(icon: const Icon(Icons.share), tooltip: 'Share', onPressed: share);
IconButton.filled(icon: const Icon(Icons.add), onPressed: add);
IconButton(icon: const Icon(Icons.delete, semanticLabel: 'Delete'), onPressed: remove);
Semantics(label: 'Favourite', button: true, child: IconButton(icon: const Icon(Icons.star), onPressed: fav));
FloatingActionButton(onPressed: compose, child: const Icon(Icons.edit));
FloatingActionButton.extended(onPressed: compose, label: const Text('Compose'));
CupertinoButton(onPressed: back, child: const Icon(CupertinoIcons.back));
CupertinoButton(onPressed: save, child: const Text('Save'));
`;
    expect(run('/app/lib/bar.dart', text)).toEqual([
      [
        'A11Y401',
        1,
        'An IconButton without a tooltip, which Flutter uses as its accessibility label.',
      ],
      [
        'A11Y401',
        3,
        'An IconButton.filled without a tooltip, which Flutter uses as its accessibility label.',
      ],
      [
        'A11Y401',
        6,
        'A FloatingActionButton without a tooltip, which Flutter uses as its accessibility label.',
      ],
      [
        'A11Y401',
        8,
        'A CupertinoButton with only an Icon, without a semanticLabel or Semantics label.',
      ],
    ]);
  });
});

describe('labels that name the control type', () => {
  it('finds them on every platform', () => {
    expect(
      rules(
        '/app/A.swift',
        'import SwiftUI\nx.accessibilityLabel("Close button")\ny.accessibilityLabel(Text("Agree checkbox"))\nz.accessibilityLabel("Buttons")',
      ),
    ).toEqual([
      ['A11Y402', 2],
      ['A11Y402', 3],
    ]);
    expect(
      rules(
        '/app/B.swift',
        'button.accessibilityLabel = NSLocalizedString("Play button", comment: "")',
      ),
    ).toEqual([['A11Y402', 1]]);
    expect(
      rules('/app/C.tsx', '<Pressable accessibilityLabel="Menu button"><Text>≡</Text></Pressable>'),
    ).toEqual([['A11Y402', 1]]);
    expect(
      rules('/app/lib/d.dart', "IconButton(icon: i, tooltip: 'Search button', onPressed: s)"),
    ).toEqual([['A11Y402', 1]]);
    expect(rules('/app/E.m', 'self.button.accessibilityLabel = @"Done button";')).toEqual([
      ['A11Y402', 1],
    ]);
  });

  it('matches only a trailing control type', () => {
    expect(CONTROL_TYPE.test('Close button')).toBe(true);
    expect(CONTROL_TYPE.test('Notifications, selected')).toBe(true);
    expect(CONTROL_TYPE.test('Button styles')).toBe(false);
    expect(CONTROL_TYPE.test('Tablet')).toBe(false);
  });

  it('reads the message', () => {
    expect(run('/app/C.tsx', '<View accessibilityLabel="Cart tab" />')).toEqual([
      [
        'A11Y402',
        1,
        'The label "Cart tab" ends with "tab", which VoiceOver already says from the element\'s traits.',
      ],
    ]);
  });
});
