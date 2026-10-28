<!-- i18n-source: README.md@591f001bea80e268117678c02777f62e0d8328ee status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI 상태"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="최신 버전: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="언어 버전: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="라이선스: MIT"></picture></a>
</p>

<p align="center">
<a href="#빠른-시작"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ko-light.svg" alt="시작하기"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ko-light.svg" alt="문서"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ko-light.svg" alt="가이드"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ko-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ko-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ko-light.svg" alt="예제"></picture></a>
</p>

> 이 문서는 영어 README의 번역본입니다. 내용이 다를 경우 영어 버전이 최신입니다.

<!-- brand:end -->

App Store Connect는 앱마다 아홉 가지 Accessibility Nutrition Labels 중 어떤 것을 지원하는지 묻습니다. 현재는 선택 사항이지만, Apple은 신규 앱과 업데이트에서 필수가 될 것이라고 밝혔습니다(2026년 10월 28일 기준으로 날짜는 제시되지 않았습니다). a11ylabel은 네이티브 iOS, Flutter, React Native/Expo 프로젝트를 읽고 각 레이블마다 코드에서 이미 그 레이블을 막고 있는 것이 있는지, 무엇을 검토해야 하는지, 사람만 확인할 수 있는 것은 무엇인지 보여 줍니다. 모든 발견 사항에는 수정 방법과 그 근거가 되는 Apple 페이지가 함께 표시됩니다. 프로젝트 파일을 읽기만 하며, 빌드하거나 실행하거나 변경하지 않습니다.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="SwiftUI 앱에서 실행한 a11ylabel --summary: VoiceOver, Voice Control, Reduced Motion은 review, Larger Text와 Dark Interface는 blocked, 레이블 네 개는 수동 확인 필요. error 2건, warning 6건, info 4건"></picture>

<sub>실제 CLI로 기록했습니다. 대상은 테스트용으로 작성한 SwiftUI 앱인
<a href="fixtures/native-swiftui-blocked">native-swiftui-blocked
fixture</a>입니다(<code>npm run demo</code>).</sub>

## 주요 기능

- **아홉 개 레이블을 한 장의 표로.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions, Audio
  Descriptions 각각이 **blocked**, **review**, **no blocker found**, **check by hand** 중 하나로
  표시되며, Apple의 평가 기준으로 연결됩니다.
- **앱 전체에서 레이블을 막는 요소를 찾습니다.** Info.plist, build setting, Expo 설정에 있는
  `UIUserInterfaceStyle` Light(키가 없으면 Expo는 라이트를 사용합니다), `Text.defaultProps`,
  Flutter `MaterialApp.builder`, SwiftUI scene, UIKit window에서 고정된 텍스트 확대·축소.
- **검토할 곳도 찾습니다.** 확대·축소되지 않거나 200% 아래에서 멈추는 텍스트, 고정 글꼴 크기,
  레이블 없는 아이콘 전용 버튼, Reduce Motion을 전혀 읽지 않는 코드의 무한, 패럴랙스, 자동 재생 모션,
  그리고 iOS가 설정하지 않는 Flutter 검사.
- **플랫폼을 이해합니다.** React Native 0.78 이상은 `Text.defaultProps`를 무시하므로(React 19)
  a11ylabel은 그곳에서 이를 보고하지 않습니다. Flutter의 `disableAnimations`는 iOS Reduce Motion을
  따르지 않고, Reanimated는 기본적으로 따릅니다.
- **모든 규칙에 출처가 있습니다.** 규칙은 데이터([rules/nutrition-labels.json](rules/nutrition-labels.json))이며
  Apple, React Native, Expo, Flutter, Reanimated의 자체 페이지를 인용합니다. 출처가 없는 규칙이 있으면 테스트가 실패합니다.
- **Simulator에서 확인했습니다.** iOS 27.0의 Dark Mode에서 가장 큰 텍스트 크기로 보면, blocked fixture는
  라이트로 남고 텍스트도 제한되지만, 수정된 fixture는 다크로 바뀌고 텍스트는 AX5가 됩니다.
- **CI를 위해 만들었습니다.** `--labels`는 신청할 레이블만 검사합니다. 터미널, 일반 텍스트, Markdown,
  JSON 보고서를 지원하며, 종료 코드는 0이 문제 없음, 1이 발견 사항 있음, 2가 사용법 오류입니다.

## 빠른 시작

**1. a11ylabel을 설치합니다.** Node.js도 함께 설치하는 [Homebrew](https://brew.sh/)로:

```sh
brew install muhittincamdali/tap/a11ylabel
```

또는 [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0)에서 npm으로 설치합니다.
이 경우 [Node.js](https://nodejs.org/) 22.12 이상이 필요합니다(`node --version`으로 확인할 수 있습니다):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

패키지는 아직 npm registry에 없습니다. `@mcamdali/a11ylabel`이라는 이름으로 게시할 예정입니다. 두 명령 모두
같은 release tarball을 설치합니다.

**2. 앱 폴더에서 터미널을 엽니다.** `.xcodeproj`, `pubspec.yaml`, `package.json`이 있는 폴더입니다:

```sh
cd path/to/YourApp
```

**3. a11ylabel을 실행합니다:**

```sh
a11ylabel
```

**4. 맨 위의 표를 읽습니다.** **blocked** 레이블에는 앱 전체에서 그 레이블을 막는 error가 있습니다. 이것을 먼저
수정하세요. **review**는 일반적인 작업을 막을 수 있는 곳을 나열합니다. 기능을 켠 상태에서 하나씩 살펴보세요.
**check by hand** 레이블은 코드로는 알 수 없는 디자인이나 미디어에 달려 있습니다. 각 발견 사항은 "How to fix" 목록에서 수정 방법을
알려 주며, [Before you claim a label](docs/guides/claiming-labels.md)이 나머지를 안내합니다.

## a11ylabel이 검사하는 것

Apple의 [개요](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)는
레이블을 신청하기 전에 기능을 켠 상태에서 앱의 일반적인 작업을 모두 완료할 수 있어야 한다고 요구합니다. 코드로 그 일부를 막는 요소를 알 수 있습니다:

| 레이블                            | 코드로 | a11ylabel이 찾는 것                                                                                              |
| --------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | 일부   | 레이블 없는 아이콘 전용 버튼, 컨트롤 유형을 이름으로 쓴 레이블                                                   |
| Voice Control                     | 일부   | 표시하고 말할 이름이 없는 아이콘 전용 버튼                                                                       |
| Larger Text                       | 가능   | 앱 또는 개별 뷰에서 꺼져 있거나 200% 아래로 제한된 확대·축소, 고정 글꼴 크기                                     |
| Dark Interface                    | 가능   | Info.plist, build setting, Expo 설정, 코드에서 강제된 라이트 외관, Flutter `darkTheme` 없음, 다크 값이 없는 색상 |
| Differentiate Without Color Alone | 불가   | 없음: 디자인의 문제입니다                                                                                        |
| Sufficient Contrast               | 힌트   | 고대비 값이 없는 asset 색상                                                                                      |
| Reduced Motion                    | 가능   | Reduce Motion을 읽지 않는 곳의 무한, 회전, 패럴랙스, 자동 재생 모션                                              |
| Captions                          | 힌트   | 앱이 동영상을 재생하는지 여부                                                                                    |
| Audio Descriptions                | 힌트   | 앱이 동영상을 재생하는지 여부                                                                                    |

| 규칙    | Severity | 발견 사항                                                                             | 코드                            |
| ------- | -------- | ------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | 앱 전체에서 텍스트 크기가 고정됨(200% 미만)                                           | 전체                            |
| A11Y102 | warning  | 확대·축소되지 않는 개별 텍스트 또는 뷰                                                | 전체                            |
| A11Y103 | warning  | 200% 아래로 제한된 개별 텍스트 또는 뷰                                                | 전체                            |
| A11Y104 | warning  | 고정 포인트 크기: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | 앱 전체에 라이트 외관이 강제되어 다크로 바꿀 방법이 없음                              | Info.plist, build setting, Expo |
| A11Y202 | info     | 기본은 라이트이고 앱 내 설정으로 다크 사용 가능                                       | Info.plist, build setting, Expo |
| A11Y203 | warning  | 코드에서 설정한 라이트 색상 구성표                                                    | 전체                            |
| A11Y204 | warning  | `darkTheme`가 없는 `MaterialApp`                                                      | Flutter                         |
| A11Y205 | info     | 다크 변형이 없는 asset 색상                                                           | asset catalog                   |
| A11Y301 | warning  | Reduce Motion을 전혀 읽지 않는 앱의 모션                                              | 전체                            |
| A11Y302 | info     | Reduce Motion을 읽지 않는 파일의 모션                                                 | 전체                            |
| A11Y303 | warning  | iOS Reduce Motion이 설정하지 않는 `disableAnimations`를 Flutter가 읽음                | Flutter                         |
| A11Y304 | warning  | `ReduceMotion.Never`로 설정된 Reanimated 애니메이션                                   | React Native, Expo              |
| A11Y401 | warning  | 접근성 레이블이 없는 아이콘 전용 버튼                                                 | 전체                            |
| A11Y402 | info     | 컨트롤 유형을 이름으로 쓴 접근성 레이블                                               | 전체                            |
| A11Y501 | info     | 고대비 변형이 없는 asset 색상                                                         | asset catalog                   |
| A11Y601 | info     | 앱이 동영상을 재생함                                                                  | 전체                            |

규칙 데이터는 `nutrition-labels@2026.10.28`이며, 출처는 2026년 10월 28일에 읽었습니다. error는 레이블을 blocked로 만들고,
warning은 "review"로 만듭니다. info 발견 사항은 레이블 상태를 바꾸지 않습니다.

## Simulator에서 보이는 것

같은 SwiftUI 앱의 수정 전과 후입니다. Xcode 27.1(iOS 27.1 SDK)로 빌드해 iOS 27.0이 설치된 iPhone 17 simulator에서 실행했으며,
먼저 기본 텍스트 크기의 라이트, 그다음 가장 큰 접근성 크기(AX5)의 Dark Mode입니다
([방법](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="iOS 27.0 iPhone 17 simulator의 Pantry 앱. 왼쪽부터: 기본 크기 라이트의 native-swiftui-blocked, AX5 Dark Mode의 같은 앱(여전히 라이트이고 텍스트는 거의 커지지 않음), 기본 크기의 native-swiftui-ready, AX5 Dark Mode의 native-swiftui-ready(다크, 큰 텍스트, 수량이 이름 아래에 표시됨)"></p>

| Fixture (iOS 27.0 Simulator) | 밝기, 기본 → AX5 Dark Mode | 변경된 픽셀 | a11ylabel                              |
| ---------------------------- | -------------------------- | ----------- | -------------------------------------- |
| native-swiftui-blocked       | 0.97 → 0.97                | 7%          | Larger Text와 Dark Interface가 blocked |
| native-swiftui-ready         | 0.97 → 0.57                | 99%         | blocker 없음                           |

밝기는 홈 인디케이터 위쪽 부분의 그레이스케일 스크린샷 평균입니다(0은 검정, 1은 흰색). 녹화 파일은
[docs/media/simulator](docs/media/simulator)에 있습니다. 같은 설정에서 [Flutter fixture](docs/media/simulator/flutter-tide-ax5-dark.png)는
(`darkTheme`가 없어) 라이트로 남고 텍스트는 130%입니다.

## 설치

빠른 시작의 명령은 GitHub release에서 `a11ylabel` 명령을 설치합니다. 각
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases)에는 패키지가 `a11ylabel-<version>.tgz`로,
`SHA256SUMS` 파일과 함께 들어 있습니다. 프로젝트에서 release를 고정하려면:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

이후 `npx a11ylabel`은 그 사본을 실행합니다. 패키지는 `@mcamdali/a11ylabel`이라는 이름으로 설치되며, 아래 JavaScript API가
import하는 이름이 바로 이것입니다. npm registry 게시는 예정되어 있으며, 그때까지는 `npx @mcamdali/a11ylabel`로 패키지를 찾을 수 없습니다.

## 사용법

```text
a11ylabel [path] [options]
```

| 옵션                    | 동작                                                                   |
| ----------------------- | ---------------------------------------------------------------------- |
| `path`                  | 프로젝트 폴더 또는 `.xcodeproj`. 기본값은 현재 폴더                    |
| `-f, --format <format>` | `tty`(기본값), `text`, `markdown`, `json`                              |
| `--json`                | `--format json`과 동일                                                 |
| `-o, --output <file>`   | 보고서를 터미널 대신 파일에 기록                                       |
| `-l, --labels <ids>`    | 지정한 레이블만 검사(쉼표로 구분, 기본값: 아홉 개 모두)                |
| `-s, --summary`         | 레이블 표와 판정만 출력(터미널 및 text 형식)                           |
| `--fail-on <severity>`  | `warning`(기본값), `error`, `info`, `none`: 종료 코드가 1이 되는 조건  |
| `--no-color`            | 터미널에서도 일반 텍스트로 출력(`NO_COLOR`와 `FORCE_COLOR`를 따릅니다) |

레이블 id: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

종료 코드: `0`은 `--fail-on` 이상인 항목이 없음, `1`은 그 이상인 발견 사항이 있음, `2`는 잘못된 인수, iOS 프로젝트를 찾지 못함, 또는 예기치 않은 오류입니다.
Dark Interface를 결정하는 Info.plist나 Xcode 프로젝트를 읽을 수 없으면 그 레이블은 "not known"이 되며, `--fail-on none`이 아니면 종료 코드도 `1`입니다.

a11ylabel은 iOS 앱을 스스로 찾습니다. 네이티브 앱은 루트 또는 한 단계 아래의 `.xcodeproj`, Flutter, React Native, Expo 앱은
`ios/`(Flutter plugin은 `example/ios/`)입니다. 모든 iOS 앱 target의 Info.plist(XML 또는 바이너리)와 build setting, asset catalog의 컬러 세트,
앱의 Swift 및 Objective-C 파일, React Native 또는 Expo 앱의 JavaScript와 TypeScript, `lib/`의 Dart 파일을 읽으며,
의존성, 빌드 출력, 테스트는 건너뜁니다. `ios/`가 없는 Expo 앱은 설정에서 검사합니다.

### 신청할 레이블만 검사하기

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

그러면 표, 발견 사항, 종료 코드가 해당 레이블만 대상으로 하므로, 변경이 App Store에 표시한 레이블을 깨뜨리면 CI가 실패합니다.

### Markdown 보고서를 코드와 함께 보관하기

```sh
a11ylabel --format markdown --output accessibility.md
```

보고서에는 a11ylabel과 규칙 데이터의 버전, 출처를 읽은 날짜가 적히고, 레이블마다 사람만 확인할 수 있는 항목이 나열됩니다.
코드가 그때 보여 준 내용을 날짜와 함께 기록한 것입니다.

### 스크립트에서 JSON 보고서 사용하기

```sh
a11ylabel --json > a11ylabel.json
```

각 레이블에는 `id`, `name`, `status`, `coverage`, `criteria`, `counts`, `signals`가 있고, 각 발견 사항에는 `rule`, `labels`, `severity`, `title`,
`message`, `file`, `line`, `target`, 단계와 가이드를 담은 `fix`, `sources`가 있습니다. 레이아웃은 `schemaVersion` 0이며 1.0 이전에 바뀔 수 있습니다.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh)는 `jq`로 이를 걸러 냅니다.

### CI에서 실행하기

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml)은 앱을 건드리는 모든 pull request에서 앱이 신청한 레이블을 검사하고,
보고서를 job 요약에 추가하며, warning이 있으면 job을 실패시킵니다. `--fail-on error`는 레이블이 blocked일 때만 실패합니다.

### JavaScript에서

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

실행 가능한 버전은 [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs)입니다.

## 데모

터미널 녹화는 각각 다른 툴체인으로 만든 프로젝트인 [fixtures](fixtures/README.md)에서 CLI를 실행해 얻은 것입니다:

| 프로젝트                                           | 녹화                                                                                                                                                |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI 앱, 레이블 표(`--summary`)                 | 이 페이지 맨 위                                                                                                                                     |
| 같은 앱, Larger Text와 Dark Interface 및 그 수정   | [라이트](docs/media/demo-swiftui-light.svg) · [다크](docs/media/demo-swiftui-dark.svg)                                                              |
| 수정 후의 같은 앱                                  | [라이트](docs/media/demo-ready-light.svg) · [다크](docs/media/demo-ready-dark.svg)                                                                  |
| 텍스트 배율을 제한한 Flutter 3.47.5 앱             | [라이트](docs/media/demo-flutter-light.svg) · [다크](docs/media/demo-flutter-dark.svg)                                                              |
| React Native 0.88.1 앱                             | [라이트](docs/media/demo-react-native-light.svg) · [다크](docs/media/demo-react-native-dark.svg)                                                    |
| 두 SwiftUI 앱에서의 `scripts/simulator-compare.sh` | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

2026년 10월 28일 Mac(Apple silicon, M5 Max)에서 Node.js 26.12.1로 측정했습니다. 일곱 개 fixture에 대해
`node dist/cli/main.js --json`을 100회 실행하는 세트 세 개를 한 라운드로 다섯 라운드 진행했으며 Node.js 시작 시간이 포함됩니다.
fixture는 파일 캐시에 올라간 상태였습니다(웜 실행). 15개 세트의 중앙값은 0.11~0.12초였습니다. 개별 실행은 편차가 더 커서
라운드마다 가장 느린 실행은 0.15~0.38초였습니다. 생성한 5,000개 파일(Swift 33.4 MB, 발견 사항 10,000건, 그중 200건 나열)의
SwiftUI 프로젝트는 세 번 실행에서 1.05~1.11초가 걸렸고, 메모리는 최대 230 MB(220 MiB)였습니다.

## 상태

| 기능                                                                                | 상태          |
| ----------------------------------------------------------------------------------- | ------------- |
| 네이티브, Flutter(앱과 plugin example), React Native, Expo 프로젝트 감지            | 동작          |
| 레이블 아홉 개 각각의 상태, A11Y101~A11Y601                                         | 동작          |
| 터미널, text, Markdown, JSON 보고서, `--labels`, `--summary`, `--fail-on` 종료 코드 | 동작          |
| `.xcconfig` build setting과 로컬 Swift package의 소스                               | 예정 (0.2) |
| SARIF 출력과 GitHub Action                                                          | 예정 (0.3) |
| 코드와 asset catalog의 색상 쌍에서 계산한 대비율                                    | 예정 (0.4) |
| 패턴 대신 Swift, Dart, TypeScript 구문 트리                                         | 예정 (0.5) |
| 안정적인 규칙 스키마와 JSON 레이아웃                                                | 예정 (1.0) |

## 한계

- **실행 중인 앱이 아니라 코드를 봅니다.** Apple은 기능을 켠 상태에서 모든 일반적인 작업이 동작해야 한다고 요구합니다.
  a11ylabel은 어떤 작업이 일반적인지, 화면이 어떻게 보이는지 알 수 없습니다. "No blocker found"는 규칙 중 어느 것도
  일치하지 않았다는 뜻이지, 레이블을 신청할 수 있다는 뜻이 아닙니다.
- **컴파일러가 아니라 패턴입니다.** 규칙은 주석과 문자열을 비운 소스 텍스트에 적용하는 정규 표현식과 괄호 매칭입니다.
  생성된 코드, 직접 만든 컴포넌트로 감싼 코드(확대·축소를 끄는 `MyText` 등), 실행 시점에 만들어지는 코드, 흔치 않은 형태로 작성된 코드는
  놓치거나 잘못 일치할 수 있습니다.
- **앱 자체 소스만 읽습니다.** Pods, 앱 폴더 밖의 Swift package, `node_modules`, Flutter plugin은 읽지 않습니다. `node_modules`에서는
  a11ylabel이 버전을 보고하는 패키지의 `package.json`만 읽습니다.
- **build setting은 project.pbxproj에서만.** `.xcconfig` 파일은 읽지 않습니다. target의 Info.plist나 Xcode 프로젝트를 읽을 수 없으면
  Dark Interface는 "not known"이 되고 보고서에 이유가 적힙니다.
- **Expo 설정은 텍스트로 처리합니다.** `app.config.js`와 `app.config.ts`는 실행하지 않으므로, 변수나 config plugin을 통해 설정한
  `userInterfaceStyle`은 보이지 않습니다.
- **입력에는 한도가 있습니다.** 프로젝트는 pull request에서 올 수 있으므로 a11ylabel은 프로젝트 파일은 하나당 최대 32 MB, 소스는 파일당 4 MB,
  전체 20,000개 파일과 128 MB까지, 컬러 세트는 최대 5,000개까지 읽습니다. 제외된 항목은 보고서의 notes에 나열됩니다.
  plist와 JSON 파일은 64단계까지 중첩될 수 있습니다.
- **출력에는 한도가 있습니다.** 보고서는 규칙 하나당 파일마다 최대 20건, 프로젝트 전체에서 최대 100건, 합계 최대 1,700건의
  발견 사항을 나열합니다. 한도를 넘은 발견 사항도 레이블별 개수와 요약에는 포함되며, 규칙별로 생략된 개수가 notes에 표시됩니다.
  타깃 이름, 버전, Info.plist 값처럼 프로젝트에서 온 이름과 값은 200자로 잘립니다.

## 문서

API 참조와 가이드: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## 가이드

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## 출처

2026년 10월 28일에 읽었습니다:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels),
  그리고 각 레이블의 평가 기준. 보고서에서 링크되며, 각 규칙이 인용하는 API 페이지와 함께
  [rules/nutrition-labels.json](rules/nutrition-labels.json)에서도 링크됩니다.
- React Native: [Text](https://reactnative.dev/docs/text), [Accessibility](https://reactnative.dev/docs/accessibility),
  [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo), [Appearance](https://reactnative.dev/docs/appearance);
  React: [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide);
  Reanimated: [Accessibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/accessibility/).
- Expo: [app config `userInterfaceStyle`](https://docs.expo.dev/versions/latest/config/app/).
- Flutter: [TextScaler](https://api.flutter.dev/flutter/painting/TextScaler/noScaling-constant.html),
  [MaterialApp.darkTheme](https://api.flutter.dev/flutter/material/MaterialApp/darkTheme.html),
  [MediaQueryData.disableAnimations](https://api.flutter.dev/flutter/widgets/MediaQueryData/disableAnimations.html),
  [AccessibilityFeatures.reduceMotion](https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures/reduceMotion.html),
  [IconButton.tooltip](https://api.flutter.dev/flutter/material/IconButton/tooltip.html).

## 요구 사항

macOS, Linux 또는 Windows의 Node.js 22.12 이상. 프로젝트를 읽는 데 다른 것은 필요 없습니다. Xcode, Flutter, React Native
툴체인이 필요하지 않습니다. Simulator 스크립트에는 Xcode, XcodeGen, Flutter(Flutter fixture용), ImageMagick이 설치된 Mac이 필요합니다.

## 아키텍처

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- 규칙 데이터는 코드와 분리되어 버전이 관리됩니다(`nutrition-labels@2026.10.28`). 출처가 없거나 존재하지 않는 가이드 섹션으로
  연결되는 규칙이 있으면 테스트가 실패합니다.
- CLI(`src/cli/`)는 인수를 파싱하고, 색상과 너비를 고르고, 종료 코드를 설정하는 일만 합니다.

## 관련 프로젝트

[glassready](https://github.com/muhittincamdali/glassready)는 iOS 27 SDK로 빌드한 앱에서 Liquid Glass가 무엇을 바꾸는지,
[sdkbump](https://github.com/muhittincamdali/sdkbump)는 그 앱이 실행될지 보여 줍니다. a11ylabel은 누가 그 앱을 사용할 수 있는지에 답합니다.

## FAQ

**a11ylabel이 Larger Text에 "no blocker found"라고 합니다. 레이블을 신청해도 되나요?** 그것만으로는 안 됩니다. 규칙 중 어느 것도
아무것도 찾지 못했다는 뜻입니다. Apple의 기준에 나와 있듯이, 가장 큰 텍스트 크기에서 텍스트가 겹치거나 잘리지 않고 일반적인 작업이
동작할 때 레이블을 신청하세요.

**A11Y102나 A11Y401 warning이 모두 문제인가요?** 아니요. 작게 유지되는 탭 바 레이블은 Large Content Viewer처럼 읽을 다른 방법이 있다면
Apple도 허용하며, 버튼이 a11ylabel이 볼 수 없는 방식으로 레이블을 얻는 경우도 있습니다. 기능을 켠 상태에서 해당 위치를 살펴보고 판단하세요.

**a11ylabel이 제 프로젝트를 변경하나요?** 아니요. 프로젝트를 읽고 요청한 보고서만 기록합니다.

## 기여하기

기여를 환영합니다. pull request를 열기 전에 [CONTRIBUTING.md](CONTRIBUTING.md)와
[행동 강령](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md)을 읽어 주세요.
보안 문제는 [SECURITY.md](SECURITY.md)에 설명된 대로 제보해 주세요.

## 라이선스

MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
