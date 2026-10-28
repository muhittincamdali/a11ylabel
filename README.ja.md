<!-- i18n-source: README.md@6ff027cd7ebc2a47513ef24c6774454bdd417336 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI ステータス"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="最新バージョン: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="言語バージョン: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="ライセンス: MIT"></picture></a>
</p>

<p align="center">
<a href="#クイックスタート"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ja-light.svg" alt="はじめる"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ja-light.svg" alt="ドキュメント"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ja-light.svg" alt="ガイド"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ja-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ja-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ja-light.svg" alt="サンプル"></picture></a>
</p>

> このドキュメントは英語版 README の翻訳です。内容が異なる場合は英語版が最新です。

<!-- brand:end -->

App Store Connect では、アプリごとに 9 つの Accessibility Nutrition Labels のどれに対応しているかを尋ねられます。現時点では任意ですが、Apple は新規アプリとアップデートで必須になると述べています（2026 年 10 月 28 日時点で日付は示されていませんでした）。a11ylabel はネイティブ iOS、Flutter、React Native/Expo のプロジェクトを読み取り、ラベルごとに、すでにコード上でそのラベルを妨げているものがあるか、確認すべき点は何か、人間にしか確かめられない点は何かを示します。各検出事項には修正方法と、その根拠となる Apple のページも付きます。読み取るのはプロジェクトのファイルだけで、ビルド、実行、変更は一切行いません。

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="SwiftUI アプリでの a11ylabel --summary：VoiceOver、Voice Control、Reduced Motion は review、Larger Text と Dark Interface は blocked、4 つのラベルは手動確認。2 件の error、6 件の warning、4 件の info"></picture>

<sub>実際の CLI から記録したものです。対象は、テスト用に書いた SwiftUI アプリである
<a href="fixtures/native-swiftui-blocked">native-swiftui-blocked
fixture</a> です（<code>npm run demo</code>）。</sub>

## 主な特長

- **9 つのラベルを 1 つの表で。** VoiceOver、Voice Control、Larger Text、Dark Interface、
  Differentiate Without Color Alone、Sufficient Contrast、Reduced Motion、Captions、Audio
  Descriptions について、それぞれ **blocked**、**review**、**no blocker found**、**check by hand**
  のいずれかを示し、Apple の評価基準へのリンクも付きます。
- **アプリ全体でラベルを妨げるものを見つけます。** Info.plist、build setting、Expo の設定にある
  `UIUserInterfaceStyle` の Light（キーがない場合、Expo はライトを使います）、`Text.defaultProps`、
  Flutter の `MaterialApp.builder`、SwiftUI の scene、UIKit の window で固定されたテキストの拡大縮小。
- **確認すべき箇所も。** 拡大縮小されない、または 200% 未満で止まるテキスト、固定のフォントサイズ、
  ラベルのないアイコンのみのボタン、Reduce Motion を一切読まないコードでの無限、パララックス、
  自動再生のモーション、そして iOS が設定しない Flutter のチェック。
- **プラットフォームを理解しています。** React Native 0.78 以降は `Text.defaultProps` を無視する
  （React 19）ため、a11ylabel はそこでは報告しません。Flutter の `disableAnimations` は iOS の
  Reduce Motion に連動せず、Reanimated は既定で連動します。
- **すべてのルールに出典があります。** ルールはデータ（[rules/nutrition-labels.json](rules/nutrition-labels.json)）で、
  Apple、React Native、Expo、Flutter、Reanimated 自身のページを引用しています。出典のないルールがあるとテストが失敗します。
- **Simulator で確認済み。** iOS 27.0 の Dark Mode で最大のテキストサイズにすると、blocked の
  fixture はライトのままでテキストも制限され、修正済みの fixture はダークになりテキストは AX5 になります。
- **CI 向けです。** `--labels` は申告するラベルだけを検査します。ターミナル、プレーンテキスト、Markdown、
  JSON のレポートを出力し、終了コードは 0 が問題なし、1 が検出あり、2 が使い方の誤りです。

## クイックスタート

**1. a11ylabel をインストールします。** Node.js も一緒にインストールされる [Homebrew](https://brew.sh/) を使う場合：

```sh
brew install muhittincamdali/tap/a11ylabel
```

または npm でインストールします。こちらは [Node.js](https://nodejs.org/) 22.12 以降が必要です（`node --version` で確認できます）：

```sh
npm i -g @mcamdali/a11ylabel
```

インストールせずに実行するには `npx @mcamdali/a11ylabel` を使います。

**2. アプリのフォルダでターミナルを開きます。** `.xcodeproj`、`pubspec.yaml`、`package.json` のあるフォルダです：

```sh
cd path/to/YourApp
```

**3. a11ylabel を実行します：**

```sh
a11ylabel
```

**4. 先頭の表を読みます。** **blocked** のラベルには、アプリ全体でそのラベルを妨げる error があります。まずそれを修正してください。
**review** は、よく使うタスクを妨げる可能性のある箇所を一覧にします。機能をオンにした状態で一つずつ確認してください。
**check by hand** のラベルは、コードからは分からないデザインやメディアに左右されます。各検出事項には「How to fix」の一覧から修正方法が示され、
[Before you claim a label](docs/guides/claiming-labels.md) で残りの手順を説明しています。

## a11ylabel がチェックする内容

Apple の[概要](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)では、
ラベルを申告する前に、機能をオンにした状態でアプリのよく使うタスクをすべて完了できることを求めています。コードから分かるのは、それを妨げるものの一部です：

| ラベル                            | コードで | a11ylabel が探すもの                                                                                                  |
| --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | 一部     | ラベルのないアイコンのみのボタン、コントロールの種類を名前にしているラベル                                            |
| Voice Control                     | 一部     | 表示して読み上げられる名前のないアイコンのみのボタン                                                                  |
| Larger Text                       | 可       | アプリ全体または単一のビューで無効化された、あるいは 200% 未満に制限された拡大縮小、固定のフォントサイズ              |
| Dark Interface                    | 可       | Info.plist、build setting、Expo の設定、コードで強制されたライト外観、Flutter の `darkTheme` の欠如、ダーク値のない色 |
| Differentiate Without Color Alone | 不可     | なし：デザインの問題です                                                                                              |
| Sufficient Contrast               | ヒント   | ハイコントラスト値のない asset の色                                                                                   |
| Reduced Motion                    | 可       | Reduce Motion を読んでいない、無限、回転、パララックス、自動再生のモーション                                          |
| Captions                          | ヒント   | アプリが動画を再生するかどうか                                                                                        |
| Audio Descriptions                | ヒント   | アプリが動画を再生するかどうか                                                                                        |

| ルール  | Severity | 検出事項                                                                                  | 対象コード                      |
| ------- | -------- | ----------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | アプリ全体でテキストサイズが固定されている（200% 未満）                                   | すべて                          |
| A11Y102 | warning  | 拡大縮小されない単一のテキストまたはビュー                                                | すべて                          |
| A11Y103 | warning  | 200% 未満に制限された単一のテキストまたはビュー                                           | すべて                          |
| A11Y104 | warning  | 固定のポイントサイズ：`.system(size:)`、`Font.custom(_:fixedSize:)`、`UIFont(name:size:)` | SwiftUI、UIKit                  |
| A11Y201 | error    | アプリ全体でライト外観が強制され、ダークにする手段がない                                  | Info.plist、build setting、Expo |
| A11Y202 | info     | 既定はライトで、アプリ内の設定でダークにできる                                            | Info.plist、build setting、Expo |
| A11Y203 | warning  | コードで設定されたライトのカラースキーム                                                  | すべて                          |
| A11Y204 | warning  | `darkTheme` のない `MaterialApp`                                                          | Flutter                         |
| A11Y205 | info     | ダークバリアントのない asset の色                                                         | asset catalog                   |
| A11Y301 | warning  | Reduce Motion を一切読まないアプリでのモーション                                          | すべて                          |
| A11Y302 | info     | Reduce Motion を読んでいないファイルでのモーション                                        | すべて                          |
| A11Y303 | warning  | iOS の Reduce Motion が設定しない `disableAnimations` を Flutter が読んでいる             | Flutter                         |
| A11Y304 | warning  | `ReduceMotion.Never` に設定された Reanimated のアニメーション                             | React Native、Expo              |
| A11Y401 | warning  | アクセシビリティラベルのないアイコンのみのボタン                                          | すべて                          |
| A11Y402 | info     | コントロールの種類を名前にしているアクセシビリティラベル                                  | すべて                          |
| A11Y501 | info     | ハイコントラストバリアントのない asset の色                                               | asset catalog                   |
| A11Y601 | info     | アプリが動画を再生する                                                                    | すべて                          |

ルールデータは `nutrition-labels@2026.10.28` で、出典は 2026 年 10 月 28 日に読み取りました。error はラベルを blocked にし、
warning は「review」にします。info の検出事項がラベルの状態を変えることはありません。

## Simulator で見えること

同じ SwiftUI アプリの修正前と修正後です。Xcode 27.1（iOS 27.1 SDK）でビルドし、iOS 27.0 の iPhone 17 simulator で起動しました。
まず既定のテキストサイズのライト、次に最大のアクセシビリティサイズ（AX5）の Dark Mode です
（[方法](fixtures/README.md#what-the-simulator-shows)）：

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="iOS 27.0 の iPhone 17 simulator 上の Pantry アプリ。左から：既定サイズのライトの native-swiftui-blocked、AX5 の Dark Mode での同じアプリ（まだライトで、テキストはほとんど大きくならない）、既定サイズの native-swiftui-ready、AX5 の Dark Mode での native-swiftui-ready（ダークで、テキストが大きく、数量が名前の下に表示される）"></p>

| Fixture (iOS 27.0 Simulator) | 明るさ、既定 → AX5 Dark Mode | 変化したピクセル | a11ylabel                                |
| ---------------------------- | ---------------------------- | ---------------- | ---------------------------------------- |
| native-swiftui-blocked       | 0.97 → 0.97                  | 7%               | Larger Text と Dark Interface が blocked |
| native-swiftui-ready         | 0.97 → 0.57                  | 99%              | blocker なし                             |

明るさは、上のホームインジケーターより上の部分のグレースケールのスクリーンショットの平均です（0 が黒、1 が白）。録画は
[docs/media/simulator](docs/media/simulator) にあります。同じ設定の [Flutter fixture](docs/media/simulator/flutter-tide-ax5-dark.png) は
（`darkTheme` がないため）ライトのままで、テキストは 130% です。

## インストール

クイックスタートのコマンドは、npm registry から `a11ylabel` コマンドをインストールします。プロジェクトでバージョンを固定するには：

```sh
npm install --save-dev @mcamdali/a11ylabel
```

以後は `npx a11ylabel` がそのコピーを実行します。パッケージは `@mcamdali/a11ylabel` という名前でインストールされ、これは下の JavaScript API が import する名前です。各 [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) には、パッケージが `a11ylabel-<version>.tgz` として `SHA256SUMS` ファイルとともに含まれており、特定の release を固定または検証できます：

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

## 使い方

```text
a11ylabel [path] [options]
```

| オプション              | 内容                                                                           |
| ----------------------- | ------------------------------------------------------------------------------ |
| `path`                  | プロジェクトのフォルダまたは `.xcodeproj`。既定はカレントフォルダ              |
| `-f, --format <format>` | `tty`（既定）、`text`、`markdown`、`json`                                      |
| `--json`                | `--format json` と同じ                                                         |
| `-o, --output <file>`   | レポートをターミナルではなくファイルに書き出す                                 |
| `-l, --labels <ids>`    | 指定したラベルだけを検査する（カンマ区切り。既定は 9 つすべて）                |
| `-s, --summary`         | ラベルの表と判定だけを出力（ターミナルと text 形式）                           |
| `--fail-on <severity>`  | `warning`（既定）、`error`、`info`、`none`：終了コードが 1 になる条件          |
| `--no-color`            | ターミナルでもプレーンテキストにする（`NO_COLOR` と `FORCE_COLOR` に従います） |

ラベル id：`voiceover`、`voice-control`、`larger-text`、`dark-interface`、
`differentiate-without-color`、`sufficient-contrast`、`reduced-motion`、`captions`、
`audio-descriptions`。

終了コード：`0` は `--fail-on` 以上の検出がないこと、`1` は `--fail-on` 以上の検出があること、`2` は引数の誤り、iOS プロジェクトが見つからない、または
予期しないエラーです。Dark Interface を決める Info.plist または Xcode プロジェクトを読み取れない場合、そのラベルは「not known」になり、`--fail-on none` でなければ終了コードも `1` になります。

a11ylabel は iOS アプリを自動で見つけます。ネイティブアプリではルートまたは 1 階層下の `.xcodeproj`、Flutter、React Native、Expo のアプリでは
`ios/`（Flutter plugin では `example/ios/`）です。iOS アプリの各 target の Info.plist（XML またはバイナリ）と build setting、asset catalog の
カラーセット、アプリの Swift と Objective-C のファイル、React Native または Expo アプリの JavaScript と TypeScript、`lib/` の Dart ファイルを読み取り、
依存関係、ビルド出力、テストはスキップします。`ios/` のない Expo アプリは設定から検査します。

### 申告するラベルだけを検査する

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

表、検出事項、終了コードはそのラベルだけが対象になるため、App Store で表示しているラベルを壊す変更があれば CI が失敗します。

### Markdown レポートをコードと一緒に保管する

```sh
a11ylabel --format markdown --output accessibility.md
```

レポートには a11ylabel とルールデータのバージョン、出典を読み取った日付が記され、ラベルごとに人間にしか確認できない事項が一覧になります。
コードがその時点で示していた内容の、日付入りの記録です。

### スクリプトで JSON レポートを使う

```sh
a11ylabel --json > a11ylabel.json
```

各ラベルには `id`、`name`、`status`、`coverage`、`criteria`、`counts`、`signals` があり、各検出事項には `rule`、`labels`、`severity`、`title`、
`message`、`file`、`line`、`target`、手順とガイドを含む `fix`、`sources` があります。レイアウトは `schemaVersion` 0 で、1.0 より前に変わる可能性があります。
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) は `jq` で絞り込む例です。

### CI で実行する

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) は、アプリに触れる pull request ごとに、アプリが申告するラベルを検査し、
レポートを job のサマリーに追加し、warning があれば job を失敗させます。`--fail-on error` ならラベルが blocked のときだけ失敗します。

### JavaScript から

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

実行できるバージョンは [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs) です。

## デモ

ターミナルの録画は、各ツールチェーンで作成したプロジェクトである [fixtures](fixtures/README.md) に対して CLI を実行したものです：

| プロジェクト                                             | 録画                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI アプリ、ラベルの表（`--summary`）                | このページの先頭                                                                                                                                    |
| 同じアプリ、Larger Text と Dark Interface とその修正     | [ライト](docs/media/demo-swiftui-light.svg) · [ダーク](docs/media/demo-swiftui-dark.svg)                                                            |
| 修正後の同じアプリ                                       | [ライト](docs/media/demo-ready-light.svg) · [ダーク](docs/media/demo-ready-dark.svg)                                                                |
| テキストスケールを制限した Flutter 3.47.5 アプリ         | [ライト](docs/media/demo-flutter-light.svg) · [ダーク](docs/media/demo-flutter-dark.svg)                                                            |
| React Native 0.88.1 アプリ                               | [ライト](docs/media/demo-react-native-light.svg) · [ダーク](docs/media/demo-react-native-dark.svg)                                                  |
| 2 つの SwiftUI アプリでの `scripts/simulator-compare.sh` | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

2026 年 10 月 28 日に Mac（Apple silicon、M5 Max）で Node.js 26.12.1 を使って計測しました。7 つの fixture に対して
`node dist/cli/main.js --json` を 100 回実行するセット 3 回を 1 ラウンドとして 5 ラウンド行い、Node.js の起動時間を含みます。
fixture はファイルキャッシュに載った状態です（ウォーム実行）。15 セットの中央値は 0.11〜0.12 秒でした。
個々の実行はばらつきが大きく、各ラウンドで最も遅い実行は 0.15〜0.38 秒でした。生成した 5,000 ファイル（Swift 33.4 MB、
検出 10,000 件、うち一覧は 200 件）の SwiftUI プロジェクトは、3 回の実行で 1.05〜1.11 秒、メモリは最大 230 MB（220 MiB）でした。

## ステータス

| 機能                                                                                           | ステータス    |
| ---------------------------------------------------------------------------------------------- | ------------- |
| ネイティブ、Flutter（アプリと plugin の example）、React Native、Expo のプロジェクト検出       | 動作          |
| 9 つのラベルそれぞれの状態、A11Y101〜A11Y601                                                   | 動作          |
| ターミナル、text、Markdown、JSON のレポート、`--labels`、`--summary`、`--fail-on` の終了コード | 動作          |
| `.xcconfig` の build setting とローカル Swift package のソース                                 | 予定 (0.2) |
| SARIF 出力と GitHub Action                                                                     | 予定 (0.3) |
| コードと asset catalog の色の組み合わせからのコントラスト比                                    | 予定 (0.4) |
| パターンではなく Swift、Dart、TypeScript の構文木                                              | 予定 (0.5) |
| 安定したルールスキーマと JSON レイアウト                                                       | 予定 (1.0) |

## 制限事項

- **実行中のアプリではなく、コードを見ます。** Apple は、機能をオンにした状態でよく使うタスクがすべて動作することを求めています。
  a11ylabel には、どのタスクがよく使われるのか、画面がどう見えるのかは分かりません。「No blocker found」はルールのどれにも
  一致しなかったという意味で、ラベルを申告できるという意味ではありません。
- **コンパイラではなく、パターンです。** ルールは、コメントと文字列を空白にしたソーステキストに対する正規表現と括弧の対応付けです。
  生成されたコード、独自のコンポーネントで包まれたコード（拡大縮小をオフにする `MyText` など）、実行時に組み立てられるコード、
  珍しい書き方のコードは、見逃されたり誤って一致したりすることがあります。
- **アプリ自身のソースのみ。** Pods、アプリのフォルダ外の Swift package、`node_modules`、Flutter plugin は読み取りません。`node_modules` からは、
  a11ylabel がバージョンを報告するパッケージの `package.json` だけを読み取ります。
- **build setting は project.pbxproj のみ。** `.xcconfig` ファイルは読み取りません。target の Info.plist または Xcode プロジェクトを読み取れない場合、
  Dark Interface は「not known」になり、レポートに理由が記されます。
- **Expo の設定はテキストとして扱います。** `app.config.js` と `app.config.ts` は実行しないため、変数や config plugin 経由で設定された
  `userInterfaceStyle` は検出されません。
- **入力には上限があります。** プロジェクトは pull request から来ることがあるため、a11ylabel はプロジェクトファイルを 1 つにつき最大 32 MB、
  ソースは 1 ファイルにつき 4 MB、合計 20,000 ファイルと 128 MB まで、カラーセットは最大 5,000 個まで読み取ります。対象外にしたものは
  レポートの注記に一覧されます。plist と JSON ファイルは 64 階層までネストできます。
- **出力には上限があります。** レポートに一覧する検出は、1 つのルールにつき 1 ファイルで最大 20 件、プロジェクト全体で最大 100 件、
  合計で最大 1,700 件です。上限を超えた検出もラベルごとの件数とサマリーには数えられ、ルールごとに省いた件数が注記に示されます。
  ターゲット名、バージョン、Info.plist の値など、プロジェクトから来る名前と値は 200 文字で切り詰めます。

## ドキュメント

API リファレンスとガイド：[muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/)。

## ガイド

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## 情報源

2026 年 10 月 28 日に読み取りました：

- Apple、App Store Connect Help：[Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)、
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)、
  および各ラベルの評価基準。レポートからのリンクのほか、各ルールが引用する API ページとともに
  [rules/nutrition-labels.json](rules/nutrition-labels.json) からもリンクしています。
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

## 動作要件

macOS、Linux、Windows 上の Node.js 22.12 以降。プロジェクトの読み取りに必要なものはほかにありません。Xcode、Flutter、React Native の
ツールチェーンは不要です。Simulator のスクリプトには、Xcode、XcodeGen、Flutter（Flutter の fixture 用）、ImageMagick を備えた Mac が必要です。

## アーキテクチャ

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- ルールデータはコードから分離されバージョン管理されています（`nutrition-labels@2026.10.28`）。出典のないルールや、存在しないガイドの節に
  リンクするルールがあると、テストが失敗します。
- CLI（`src/cli/`）は、引数の解析、色と幅の選択、終了コードの設定だけを行います。

## 関連プロジェクト

[glassready](https://github.com/muhittincamdali/glassready) は、iOS 27 SDK でビルドしたアプリで Liquid Glass が何を変えるかを、
[sdkbump](https://github.com/muhittincamdali/sdkbump) はそのアプリが起動するかどうかを示します。a11ylabel は、誰がそれを使えるかに答えます。

## FAQ

**a11ylabel が Larger Text で「no blocker found」と表示します。ラベルを申告してよいですか？** それだけでは申告できません。ルールのどれも
何も見つけなかったという意味です。Apple の基準にあるとおり、最大のテキストサイズでテキストが重なったり切れたりせずによく使うタスクが
動作する場合に、ラベルを申告してください。

**A11Y102 や A11Y401 の warning はすべて問題ですか？** いいえ。小さいままのタブバーのラベルは、Large Content Viewer など別の読み取り方法があれば
Apple も許容しますし、ボタンが a11ylabel に見えない方法でラベルを得ている場合もあります。機能をオンにした状態でその箇所を確認し、判断してください。

**a11ylabel は私のプロジェクトを変更しますか？** いいえ。プロジェクトを読み取り、求められたレポートだけを書き出します。

## コントリビューション

コントリビューションを歓迎します。pull request を作成する前に [CONTRIBUTING.md](CONTRIBUTING.md) と
[行動規範](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)をお読みください。
セキュリティ上の問題は [SECURITY.md](SECURITY.md) に従って報告してください。

## ライセンス

MIT ライセンスで公開しています。詳細は [LICENSE](LICENSE) を参照してください。
