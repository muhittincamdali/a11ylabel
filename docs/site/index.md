# a11ylabel

a11ylabel reads a native iOS, Flutter or React Native/Expo project and shows, for each of the nine
App Store Accessibility Nutrition Labels, whether something in the code blocks it, what to review
and what only a person can check, with the fix for each finding and the source behind it.

```sh
brew install muhittincamdali/tap/a11ylabel
a11ylabel
```

Without Homebrew, npm installs the same package from the
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0) (Node.js 22.12
or later):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

Publishing to the npm registry as `@mcamdali/a11ylabel` is planned.

## Guides

- [Before you claim a label](../guides/claiming-labels.md)
- [Larger Text](../guides/larger-text.md)
- [Dark Interface](../guides/dark-interface.md)
- [Reduced Motion](../guides/reduced-motion.md)
- [VoiceOver and Voice Control](../guides/voiceover.md)
- [Contrast, colour and media](../guides/contrast-color-media.md)

## API

The command line is a thin layer over the package's exports, so the same checks run from
JavaScript:

```ts
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Start with {@link scan} and {@link render}; the JSON report is described by {@link Report} and
each label's row by {@link LabelSummary}. Its `schemaVersion` is 0 until the layout is declared
stable in 1.0. The rule data behind every finding is {@link RuleData}, available as
{@link RULE_DATA}.
