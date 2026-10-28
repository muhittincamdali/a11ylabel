<!-- i18n-source: README.md@591f001bea80e268117678c02777f62e0d8328ee status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI 状态"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="最新版本: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="语言版本: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="许可证: MIT"></picture></a>
</p>

<p align="center">
<a href="#快速开始"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-zh-CN-light.svg" alt="开始使用"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-zh-CN-light.svg" alt="文档"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-zh-CN-light.svg" alt="指南"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-zh-CN-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-zh-CN-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-zh-CN-light.svg" alt="示例"></picture></a>
</p>

> 本文是英文 README 的译文。如两者内容不一致，以英文版为准。

<!-- brand:end -->

App Store Connect 会询问每款应用支持九项 Accessibility Nutrition Labels 中的哪几项：目前是自愿的，Apple
表示今后新应用和更新将被要求提供（截至 2026 年 10 月 28 日尚未给出日期）。a11ylabel 会读取原生 iOS、Flutter
或 React Native/Expo 项目，并针对每个标签显示：代码中是否已有内容阻碍它、哪些地方需要复查、哪些只有人工才能检查，
并给出每个发现的修复方法和对应的 Apple 页面。它只读取项目文件，不会构建、运行或更改任何内容。

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary 在一个 SwiftUI 应用上的输出：VoiceOver、Voice Control 和 Reduced Motion 需复查，Larger Text 和 Dark Interface 为 blocked，四个标签需手动检查；2 个 error，6 个 warning，4 个 info"></picture>

<sub>录制自真实的 CLI，对象是 <a href="fixtures/native-swiftui-blocked">native-swiftui-blocked
fixture</a>，这是为测试编写的一个 SwiftUI 应用（<code>npm run demo</code>）。</sub>

## 亮点

- **九个标签，一张表。** VoiceOver、Voice Control、Larger Text、Dark Interface、
  Differentiate Without Color Alone、Sufficient Contrast、Reduced Motion、Captions 和 Audio
  Descriptions，每项为 **blocked**、**review**、**no blocker found** 或 **check by hand**，并链接到
  Apple 的评估标准。
- **找出在整个应用范围内阻碍某个标签的原因。** Info.plist、build setting 或 Expo 配置中的
  `UIUserInterfaceStyle` 设为 Light（缺少该键时 Expo 使用浅色）；在 `Text.defaultProps`、Flutter 的
  `MaterialApp.builder`、SwiftUI scene 或 UIKit window 中锁定的文字缩放。
- **也找出需要复查的地方。** 不缩放或缩放到 200% 以下就停止的文字、固定字号、没有标签的纯图标按钮、
  在从不读取 Reduce Motion 的代码中出现的无限循环、视差和自动播放的动效，以及 iOS 从不设置的 Flutter 检查。
- **了解各个平台。** React Native 0.78 及更高版本会忽略 `Text.defaultProps`（React 19），因此 a11ylabel
  在那里不会报告它；Flutter 的 `disableAnimations` 不跟随 iOS Reduce Motion；Reanimated 默认会跟随。
- **每条规则都有来源。** 规则是数据（[rules/nutrition-labels.json](rules/nutrition-labels.json)），
  引用 Apple、React Native、Expo、Flutter 和 Reanimated 自己的页面；若某条规则没有来源，测试就会失败。
- **在 Simulator 中验证过。** 在 iOS 27.0 的 Dark Mode 下使用最大字号时，blocked fixture 仍保持浅色且文字受限，
  修复后的 fixture 变为深色，文字为 AX5。
- **为 CI 而设计。** `--labels` 只检查你声明的标签；提供终端、纯文本、Markdown 和 JSON 报告；退出码 0 表示无问题，
  1 表示有发现，2 表示用法错误。

## 快速开始

**1. 安装 a11ylabel。** 使用 [Homebrew](https://brew.sh/)，它也会安装 Node.js：

```sh
brew install muhittincamdali/tap/a11ylabel
```

或者通过 npm 从 [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0)
安装，这需要 [Node.js](https://nodejs.org/) 22.12 或更高版本（`node --version` 会显示版本）：

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

该包尚未发布到 npm registry；计划以 `@mcamdali/a11ylabel` 的名称发布到那里。两条命令安装的是同一个 release
tarball。

**2. 在应用所在的文件夹中打开终端**，也就是包含 `.xcodeproj`、`pubspec.yaml` 或 `package.json` 的那个文件夹：

```sh
cd path/to/YourApp
```

**3. 运行 a11ylabel：**

```sh
a11ylabel
```

**4. 阅读顶部的表格。** **blocked** 标签有一个会在整个应用范围内阻止它的 error：请先修复它。**review** 列出可能阻碍
常见任务的位置；请在开启该功能的情况下逐个查看。**check by hand** 标签取决于代码无法体现的设计或媒体内容。每个发现都会
从 “How to fix” 列表中指明其修复方法，[Before you claim a label](docs/guides/claiming-labels.md) 会带你走完其余部分。

## a11ylabel 检查什么

Apple 的[概述](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
要求，应用在声明某个标签之前，人们开启该功能后应能完成应用的所有常见任务。代码可以体现其中一部分阻碍：

| 标签                              | 代码中 | a11ylabel 检查什么                                                                                       |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | 部分   | 没有标签的纯图标按钮；以控件类型命名的标签                                                               |
| Voice Control                     | 部分   | 没有可显示、可说出的名称的纯图标按钮                                                                     |
| Larger Text                       | 是     | 对整个应用或单个视图关闭缩放，或将缩放限制在 200% 以下；固定字号                                         |
| Dark Interface                    | 是     | 在 Info.plist、build settings、Expo 配置或代码中强制浅色外观；Flutter 缺少 `darkTheme`；没有深色值的颜色 |
| Differentiate Without Color Alone | 否     | 无：这是设计问题                                                                                         |
| Sufficient Contrast               | 提示   | 没有高对比度值的 asset 颜色                                                                              |
| Reduced Motion                    | 是     | 未读取 Reduce Motion 的无限循环、旋转、视差和自动播放的动效                                              |
| Captions                          | 提示   | 应用是否播放视频                                                                                         |
| Audio Descriptions                | 提示   | 应用是否播放视频                                                                                         |

| 规则    | Severity | 发现                                                                                | 代码                            |
| ------- | -------- | ----------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | 整个应用的文字大小被锁定（低于 200%）                                               | 全部                            |
| A11Y102 | warning  | 单个不缩放的文字或视图                                                              | 全部                            |
| A11Y103 | warning  | 单个被限制在 200% 以下的文字或视图                                                  | 全部                            |
| A11Y104 | warning  | 固定的磅值字号：`.system(size:)`、`Font.custom(_:fixedSize:)`、`UIFont(name:size:)` | SwiftUI、UIKit                  |
| A11Y201 | error    | 整个应用被强制为浅色外观，无法切换为深色                                            | Info.plist、build setting、Expo |
| A11Y202 | info     | 默认浅色，通过应用内设置切换为深色                                                  | Info.plist、build setting、Expo |
| A11Y203 | warning  | 在代码中设置了浅色配色方案                                                          | 全部                            |
| A11Y204 | warning  | 没有 `darkTheme` 的 `MaterialApp`                                                   | Flutter                         |
| A11Y205 | info     | 没有深色变体的 asset 颜色                                                           | asset catalog                   |
| A11Y301 | warning  | 在从不读取 Reduce Motion 的应用中出现动效                                           | 全部                            |
| A11Y302 | info     | 在未读取 Reduce Motion 的文件中出现动效                                             | 全部                            |
| A11Y303 | warning  | Flutter 读取的是 iOS Reduce Motion 不会设置的 `disableAnimations`                   | Flutter                         |
| A11Y304 | warning  | 设为 `ReduceMotion.Never` 的 Reanimated 动画                                        | React Native、Expo              |
| A11Y401 | warning  | 没有辅助功能标签的纯图标按钮                                                        | 全部                            |
| A11Y402 | info     | 以控件类型命名的辅助功能标签                                                        | 全部                            |
| A11Y501 | info     | 没有高对比度变体的 asset 颜色                                                       | asset catalog                   |
| A11Y601 | info     | 应用播放视频                                                                        | 全部                            |

规则数据为 `nutrition-labels@2026.10.28`，其来源读取于 2026 年 10 月 28 日。error 会使标签 blocked；warning 会使其
变为 “review”；info 类发现从不改变标签的状态。

## Simulator 显示了什么

同一个 SwiftUI 应用在修复前后的对比：使用 Xcode 27.1（iOS 27.1 SDK）构建，在 iOS 27.0 的 iPhone 17 simulator
上启动，先使用默认字号的浅色模式，再使用最大辅助功能字号（AX5）的 Dark Mode
（[方法](fixtures/README.md#what-the-simulator-shows)）：

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="iOS 27.0 的 iPhone 17 simulator 上的 Pantry 应用。从左到右：native-swiftui-blocked 在默认字号的浅色模式下，同一应用在 AX5 的 Dark Mode 下（仍为浅色，文字几乎没有变大），native-swiftui-ready 在默认字号下，以及在 AX5 的 Dark Mode 下（深色，大号文字，数量显示在名称下方）"></p>

| Fixture (iOS 27.0 Simulator) | 亮度，默认 → AX5 Dark Mode | 变化的像素 | a11ylabel                                |
| ---------------------------- | -------------------------- | ---------- | ---------------------------------------- |
| native-swiftui-blocked       | 0.97 → 0.97                | 7%         | Larger Text 和 Dark Interface 为 blocked |
| native-swiftui-ready         | 0.97 → 0.57                | 99%        | 无 blocker                               |

亮度是上图中主屏幕指示条以上部分灰度截图的平均值（0 为黑，1 为白）；录制文件在
[docs/media/simulator](docs/media/simulator)。在相同设置下，[Flutter fixture](docs/media/simulator/flutter-tide-ax5-dark.png)
仍为浅色（没有 `darkTheme`），文字为 130%。

## 安装

“快速开始”中的命令会从 GitHub release 安装 `a11ylabel` 命令。每个
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) 都以 `a11ylabel-<version>.tgz`
提供该包，并附带 `SHA256SUMS` 文件。要在项目中固定某个 release：

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

之后 `npx a11ylabel` 就会运行这份副本。该包以 `@mcamdali/a11ylabel` 的名称安装，也就是下面的 JavaScript API
所导入的名称。发布到 npm registry 在计划中；在此之前，`npx @mcamdali/a11ylabel` 找不到这个包。

## 使用方法

```text
a11ylabel [path] [options]
```

| 选项                    | 作用                                                           |
| ----------------------- | -------------------------------------------------------------- |
| `path`                  | 项目文件夹或 `.xcodeproj`；默认为当前文件夹                    |
| `-f, --format <format>` | `tty`（默认）、`text`、`markdown` 或 `json`                    |
| `--json`                | 等同于 `--format json`                                         |
| `-o, --output <file>`   | 将报告写入文件，而不是输出到终端                               |
| `-l, --labels <ids>`    | 只检查这些标签，以逗号分隔（默认：全部九个）                   |
| `-s, --summary`         | 只显示标签表和结论（终端和 text 格式）                         |
| `--fail-on <severity>`  | `warning`（默认）、`error`、`info` 或 `none`：退出码何时为 1   |
| `--no-color`            | 即使在终端中也输出纯文本（会遵循 `NO_COLOR` 和 `FORCE_COLOR`） |

标签 id：`voiceover`、`voice-control`、`larger-text`、`dark-interface`、
`differentiate-without-color`、`sufficient-contrast`、`reduced-motion`、`captions`、
`audio-descriptions`。

退出码：`0` 表示没有达到或超过 `--fail-on` 的发现，`1` 表示有达到或超过它的发现，`2` 表示参数错误、未找到 iOS 项目或发生意外错误。
当决定 Dark Interface 的 Info.plist 或 Xcode 项目无法读取时，该标签为 “not known”，除非使用 `--fail-on none`，否则退出码同样为 `1`。

a11ylabel 会自行找到 iOS 应用：原生应用是根目录或下一级文件夹中的 `.xcodeproj`，Flutter、React Native 和 Expo
应用是 `ios/`（Flutter plugin 则是 `example/ios/`）。它会读取每个 iOS 应用 target 的 Info.plist（XML 或二进制）和
build settings、其 asset catalog 的颜色集、应用的 Swift 和 Objective-C 文件、React Native 或 Expo 应用的 JavaScript
和 TypeScript，以及 `lib/` 中的 Dart 文件，并跳过依赖项、构建产物和测试。没有 `ios/` 的 Expo 应用会根据其配置进行检查。

### 只检查你声明的标签

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

这样，表格、发现和退出码就只涵盖这些标签，因此当某项更改会破坏你在 App Store 上展示的标签时，CI 就会失败。

### 将 Markdown 报告与代码一起保存

```sh
a11ylabel --format markdown --output accessibility.md
```

报告会写明 a11ylabel 和规则数据的版本以及读取来源的日期，并为每个标签列出只有人工才能检查的内容：一份有日期的、代码当时所显示内容的记录。

### 在脚本中使用 JSON 报告

```sh
a11ylabel --json > a11ylabel.json
```

每个标签都有 `id`、`name`、`status`、`coverage`、`criteria`、`counts` 和 `signals`；每个发现都有 `rule`、`labels`、
`severity`、`title`、`message`、`file`、`line`、`target`、包含步骤和指南的 `fix`，以及 `sources`。其结构为
`schemaVersion` 0，在 1.0 之前可能会变化。[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) 使用 `jq` 对其进行过滤。

### 在 CI 中运行

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) 会在每个涉及应用的 pull request 上检查应用声明的标签，
将报告添加到 job 摘要中，并在出现 warning 时让 job 失败。`--fail-on error` 只在某个标签 blocked 时才失败。

### 通过 JavaScript 使用

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

可运行的版本是 [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs)。

## 演示

终端录像来自 CLI 对 [fixtures](fixtures/README.md) 的运行，这些项目分别用不同的工具链制作：

| 项目                                                     | 录像                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI 应用，标签表（`--summary`）                      | 本页顶部                                                                                                                                            |
| 同一应用，Larger Text 和 Dark Interface 及其修复         | [浅色](docs/media/demo-swiftui-light.svg) · [深色](docs/media/demo-swiftui-dark.svg)                                                                |
| 修复后的同一应用                                         | [浅色](docs/media/demo-ready-light.svg) · [深色](docs/media/demo-ready-dark.svg)                                                                    |
| 文字缩放被限制的 Flutter 3.47.5 应用                     | [浅色](docs/media/demo-flutter-light.svg) · [深色](docs/media/demo-flutter-dark.svg)                                                                |
| React Native 0.88.1 应用                                 | [浅色](docs/media/demo-react-native-light.svg) · [深色](docs/media/demo-react-native-dark.svg)                                                      |
| 在两个 SwiftUI 应用上运行 `scripts/simulator-compare.sh` | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

2026 年 10 月 28 日在 Mac（Apple silicon，M5 Max）上使用 Node.js 26.12.1 测得：对七个 fixture 运行 `node dist/cli/main.js --json`，
三组、每组 100 次，包含 Node.js 启动时间。三组的中位数分别为 0.11、0.11 和 0.11 秒；最慢的一次耗时 0.15 秒。一个生成的包含
5,000 个文件（33.4 MB 的 Swift，10,000 个发现，其中列出 200 个）的 SwiftUI 项目，三次运行耗时 1.06 至 1.19 秒，内存最多 230 MB（220 MiB）。

## 状态

| 功能                                                                           | 状态          |
| ------------------------------------------------------------------------------ | ------------- |
| 原生、Flutter（应用和 plugin 示例）、React Native 和 Expo 项目检测             | 可用          |
| 九个标签各有状态；A11Y101 至 A11Y601                                           | 可用          |
| 终端、text、Markdown 和 JSON 报告；`--labels`、`--summary`、`--fail-on` 退出码 | 可用          |
| `.xcconfig` build settings 和本地 Swift package 的源码                         | 计划中 (0.2) |
| SARIF 输出和 GitHub Action                                                     | 计划中 (0.3) |
| 根据代码和 asset catalog 中的颜色对计算对比度                                  | 计划中 (0.4) |
| 使用 Swift、Dart 和 TypeScript 语法树，而不是模式匹配                          | 计划中 (0.5) |
| 稳定的规则 schema 和 JSON 结构                                                 | 计划中 (1.0) |

## 局限

- **检查的是代码，而不是运行中的应用。** Apple 要求在开启功能的情况下每个常见任务都能完成；a11ylabel 无法判断哪些任务是常见的，
  也无法知道界面的样子。“No blocker found” 表示它的规则没有一条匹配，并不表示可以声明该标签。
- **基于模式，而不是编译器。** 规则是对已清除注释和字符串的源码文本进行的正则表达式和括号匹配。生成的代码、封装在你自己的组件中的代码
  （例如关闭了缩放的 `MyText`）、在运行时构建的代码或写法不常见的代码，可能被漏掉，也可能被误匹配。
- **只读取应用自己的源码。** 不读取 Pods、应用文件夹之外的 Swift package、`node_modules` 和 Flutter plugin；对于 `node_modules`，
  只读取 a11ylabel 报告其版本的那些包的 `package.json`。
- **build settings 只来自 project.pbxproj。** 不读取 `.xcconfig` 文件。当某个 target 的 Info.plist 或 Xcode 项目无法读取时，
  Dark Interface 为 “not known”，报告会说明原因。
- **Expo 配置按文本处理。** `app.config.js` 和 `app.config.ts` 不会被执行，因此通过变量或 config plugin 设置的 `userInterfaceStyle` 看不到。
- **输入有上限。** 项目可能来自 pull request，因此 a11ylabel 对每个项目文件最多读取 32 MB，对源码则每个文件最多 4 MB、总共最多 20,000
  个文件和 128 MB，并且最多读取 5,000 个颜色集；被排除的内容会列在报告的注释中。plist 和 JSON 文件最多可嵌套 64 层。
- **输出有上限。** 报告中每条规则在每个文件最多列出 20 个发现，在整个项目最多列出 100 个，总计最多 1,700 个。超出上限的发现仍计入各标签的数量和摘要，
  并由一条注释说明每条规则有多少个未列出。
  来自项目的名称和值（例如 target 名称、版本和 Info.plist 值）会截断为 200 个字符。

## 文档

API 参考和指南：[muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/)。

## 指南

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## 来源

读取于 2026 年 10 月 28 日：

- Apple，App Store Connect Help：[Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)、
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)，
  以及每个标签的评估标准，它们链接自报告，也链接自 [rules/nutrition-labels.json](rules/nutrition-labels.json)，
  后者还列出了每条规则引用的 API 页面。
- React Native：[Text](https://reactnative.dev/docs/text)、[Accessibility](https://reactnative.dev/docs/accessibility)、
  [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo)、[Appearance](https://reactnative.dev/docs/appearance)；
  React：[React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)；
  Reanimated：[Accessibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/)。
- Expo：[app config `userInterfaceStyle`](https://docs.expo.dev/versions/latest/config/app/)。
- Flutter：[TextScaler](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html)、
  [MaterialApp.darkTheme](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html)、
  [MediaQueryData.disableAnimations](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html)、
  [AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html)、
  [IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html)。

## 系统要求

macOS、Linux 或 Windows 上的 Node.js 22.12 或更高版本。读取项目不需要其他任何东西：不需要 Xcode、Flutter 或 React Native 工具链。
Simulator 脚本需要装有 Xcode、XcodeGen、Flutter（用于 Flutter fixture）和 ImageMagick 的 Mac。

## 架构

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- 规则数据与代码分离并带有版本（`nutrition-labels@2026.10.28`）；当某条规则没有来源，或链接到不存在的指南章节时，测试会失败。
- CLI（`src/cli/`）只负责解析参数、选择颜色和宽度，以及设置退出码。

## 相关项目

[glassready](https://github.com/muhittincamdali/glassready) 显示 Liquid Glass 会给使用 iOS 27 SDK 构建的应用带来哪些变化，
[sdkbump](https://github.com/muhittincamdali/sdkbump) 显示应用能否发布。a11ylabel 回答的是谁能使用它。

## 常见问题

**a11ylabel 对 Larger Text 显示 “no blocker found”。我可以声明这个标签吗？** 不能仅凭这一点。它表示没有任何规则发现问题；
只有当常见任务在最大字号下能够正常完成、文字没有重叠或被截断时，才应按 Apple 的标准声明该标签。

**每个 A11Y102 或 A11Y401 warning 都是问题吗？** 不是。保持较小的标签栏标签，只要有其他可读取的方式（例如 Large Content Viewer），
Apple 是可以接受的；按钮也可能通过 a11ylabel 看不到的方式获得标签。请在开启该功能的情况下查看对应位置，再做决定。

**a11ylabel 会更改我的项目吗？** 不会。它只读取项目，并且只写入你要求的报告。

## 参与贡献

欢迎贡献：在提交 pull request 之前，请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 和
[行为准则](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)，
并按照 [SECURITY.md](SECURITY.md) 中的说明报告安全问题。

## 许可证

基于 MIT 许可证发布。详见 [LICENSE](LICENSE)。
