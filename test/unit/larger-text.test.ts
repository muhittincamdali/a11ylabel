import { describe, expect, it } from 'vitest';
import { sourceFile } from '../../src/collect/sources.js';
import {
  AX3,
  CONTENT_SIZE_CATEGORIES,
  capsBelowTwice,
  checkLargerText,
  DYNAMIC_TYPE_SIZES,
  dynamicTypeLimit,
  fontCall,
} from '../../src/rules/larger-text.js';

const run = (path: string, text: string) =>
  checkLargerText(sourceFile(path, text)).map((hit) => [hit.rule, hit.line, hit.message]);
const rules = (path: string, text: string) => run(path, text).map(([rule]) => rule);

describe('sizes', () => {
  it('puts AX3 at the same place in both lists', () => {
    expect(DYNAMIC_TYPE_SIZES[AX3]).toBe('accessibility3');
    expect(CONTENT_SIZE_CATEGORIES[AX3]).toBe('accessibilityExtraLarge');
  });

  it('reads .dynamicTypeSize arguments', () => {
    expect(dynamicTypeLimit('.large')).toEqual({ fixed: true, max: 3 });
    expect(dynamicTypeLimit('...DynamicTypeSize.xxxLarge')).toEqual({ fixed: false, max: 6 });
    expect(dynamicTypeLimit('.small ... .accessibility2')).toEqual({ fixed: false, max: 8 });
    expect(dynamicTypeLimit('.xSmall..<.accessibility3')).toEqual({ fixed: false, max: 8 });
    expect(dynamicTypeLimit('...(.accessibility5)')).toBeNull();
    expect(dynamicTypeLimit('.large...')).toBeNull();
    expect(dynamicTypeLimit('size')).toBeNull();
  });

  it('caps below twice only between 1 and 2', () => {
    expect([0, 0.5, 1, 1.5, 1.99, 2, 3].map(capsBelowTwice)).toEqual([
      false,
      false,
      true,
      true,
      true,
      false,
      false,
    ]);
  });
});

describe('React Native', () => {
  it('sees scaling turned off for the whole app in defaultProps', () => {
    const text = `Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = { ...TextInput.defaultProps, allowFontScaling: false };
Text.defaultProps.maxFontSizeMultiplier = 1.4;
`;
    expect(run('/app/index.js', text)).toEqual([
      [
        'A11Y101',
        2,
        'Text.defaultProps turns allowFontScaling off: no Text in the app follows the system text size.',
      ],
      [
        'A11Y101',
        3,
        'TextInput.defaultProps turns allowFontScaling off: no TextInput in the app follows the system text size.',
      ],
      [
        'A11Y101',
        4,
        'Text.defaultProps sets maxFontSizeMultiplier to 1.4: every Text stops at 140% of its size.',
      ],
    ]);
  });

  it('sees one text that does not scale or is capped', () => {
    const text = `<Text allowFontScaling={false}>Tab</Text>
<Text maxFontSizeMultiplier={1.5}>Title</Text>
<Text maxFontSizeMultiplier={2}>Body</Text>
<Text maxFontSizeMultiplier={0}>Body</Text>
const props = { allowFontScaling: false };
// <Text allowFontScaling={false} /> in a comment
<Text allowFontScaling={true}>Fine</Text>
`;
    expect(run('/app/App.tsx', text)).toEqual([
      [
        'A11Y102',
        1,
        'allowFontScaling is false: this text keeps its size when the system text size grows.',
      ],
      [
        'A11Y102',
        5,
        'allowFontScaling is false: this text keeps its size when the system text size grows.',
      ],
      ['A11Y103', 2, 'maxFontSizeMultiplier is 1.5: this text stops at 150% of its size.'],
    ]);
  });
});

describe('Flutter', () => {
  it('tells the app builder from one widget', () => {
    const text = `MaterialApp(
  builder: (context, child) => MediaQuery(
    data: MediaQuery.of(context).copyWith(textScaler: TextScaler.noScaling),
    child: child!,
  ),
  home: const Home(),
);
Text('x', textScaler: TextScaler.noScaling);
Text('y', textScaler: const TextScaler.linear(1.0));
Text('z', textScaler: TextScaler.linear(1.2));
MediaQuery.withNoTextScaling(child: icon);
Text('old', textScaleFactor: 1.0);
`;
    expect(run('/app/lib/main.dart', text)).toEqual([
      [
        'A11Y101',
        3,
        "TextScaler.noScaling in the app's builder: no text in the app follows the system text size.",
      ],
      [
        'A11Y102',
        8,
        'TextScaler.noScaling: this text keeps its size when the system text size grows.',
      ],
      [
        'A11Y102',
        9,
        'TextScaler.linear(1.0): this text keeps its size when the system text size grows.',
      ],
      [
        'A11Y102',
        10,
        'TextScaler.linear(1.2): this text keeps its size when the system text size grows (it is always 120%).',
      ],
      [
        'A11Y102',
        11,
        'MediaQuery.withNoTextScaling: this text keeps its size when the system text size grows.',
      ],
      [
        'A11Y102',
        12,
        'textScaleFactor: 1.0: this text keeps its size when the system text size grows.',
      ],
    ]);
  });

  it('sees clamps below 2.0', () => {
    const text = `MaterialApp.router(
  builder: (context, child) => MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3, child: child!),
);
MediaQuery.withClampedTextScaling(minScaleFactor: 1, maxScaleFactor: 1.5, child: nav);
MediaQuery.withClampedTextScaling(maxScaleFactor: 2.0, child: body);
final scaler = MediaQuery.textScalerOf(context).clamp(maxScaleFactor: 1.2);
final n = value.clamp(0, 10);
`;
    expect(rules('/app/lib/main.dart', text)).toEqual(['A11Y101', 'A11Y103', 'A11Y103']);
  });
});

describe('SwiftUI and UIKit', () => {
  it('limits on the app scene lock the whole app', () => {
    const app = `import SwiftUI
@main
struct ShopApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .dynamicTypeSize(...DynamicTypeSize.xxLarge)
        }
    }
}
`;
    expect(run('/app/ShopApp.swift', app)).toEqual([
      [
        'A11Y101',
        7,
        ".dynamicTypeSize(...DynamicTypeSize.xxLarge) on the app's scene: no text grows past xxLarge, below 200%.",
      ],
    ]);
  });

  it('limits on a view are warnings, and ranges up to AX3 pass', () => {
    const view = `import SwiftUI
struct Row: View {
    var body: some View {
        Text("a").dynamicTypeSize(.large)
        Text("b").dynamicTypeSize(...DynamicTypeSize.accessibility2)
        Text("c").dynamicTypeSize(...DynamicTypeSize.accessibility3)
        Text("d").dynamicTypeSize(.xSmall ... .accessibility5)
    }
}
`;
    expect(rules('/app/Row.swift', view)).toEqual(['A11Y102', 'A11Y103']);
  });

  it('sees fixed fonts', () => {
    const view = `import SwiftUI
struct Card: View {
    var body: some View {
        Text("Price").font(.system(size: 17, weight: .bold))
        Text("Body").font(.body)
        Text("Brand").font(.custom("Avenir", size: 17))
        Text("Legal").font(.custom("Avenir", fixedSize: 11))
        Text("Scaled").font(.custom("Avenir", size: 17, relativeTo: .body))
    }
}
`;
    expect(run('/app/Card.swift', view)).toEqual([
      ['A11Y104', 4, '.system(size:) is a fixed point size: Dynamic Type does not scale it.'],
      ['A11Y104', 7, 'Font.custom(_:fixedSize:) keeps its size whatever the system text size is.'],
    ]);
  });

  it('sees UIKit fonts, size limits and adjustsFontForContentSizeCategory', () => {
    const controller = `import UIKit
final class ProfileViewController: UIViewController {
    override func viewDidLoad() {
        nameLabel.font = .systemFont(ofSize: 17)
        titleLabel.font = UIFont(name: "Avenir-Heavy", size: 22)
        nameLabel.adjustsFontForContentSizeCategory = false
        view.maximumContentSizeCategory = .extraExtraExtraLarge
        footer.maximumContentSizeCategory = .accessibilityExtraLarge
        view.window?.maximumContentSizeCategory = .large
    }
}
`;
    expect(rules('/app/Profile.swift', controller)).toEqual([
      'A11Y102',
      'A11Y103',
      'A11Y101',
      'A11Y104',
      'A11Y104',
    ]);
  });

  it('leaves fixed UIKit fonts to a file that scales them with UIFontMetrics', () => {
    const scaled = `let font = UIFontMetrics(forTextStyle: .body).scaledFont(for: UIFont(name: "Avenir", size: 17)!)`;
    expect(rules('/app/Fonts.swift', scaled)).toEqual([]);
  });

  it('reads Objective-C fonts', () => {
    const text = `self.label.font = [UIFont systemFontOfSize:15];\nself.label.adjustsFontForContentSizeCategory = NO;\n`;
    expect(rules('/app/Legacy.m', text)).toEqual(['A11Y102', 'A11Y104']);
  });
});

describe('fontCall', () => {
  it('names the font call', () => {
    expect(fontCall('systemFont(ofSize')).toBe('systemFont(ofSize:)');
    expect(fontCall('boldSystemFont( ofSize')).toBe('boldSystemFont(ofSize:)');
    expect(fontCall('UIFont(name:')).toBe('UIFont(name:size:)');
    expect(fontCall('systemFontOfSize:')).toBe('systemFontOfSize:');
    expect(fontCall('fontWithName:')).toBe('fontWithName:size:');
  });
});
