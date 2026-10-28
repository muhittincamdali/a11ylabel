<!-- i18n-source: README.md@2725a7403253e305cfe7775804e3f897218bb327 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="Статус CI"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Последняя версия: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Версия языка: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="Лицензия: MIT"></picture></a>
</p>

<p align="center">
<a href="#быстрый-старт"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-ru-light.svg" alt="Начать"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-ru-light.svg" alt="Документация"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-ru-light.svg" alt="Руководства"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ru-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ru-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-ru-light.svg" alt="Примеры"></picture></a>
</p>

> Это перевод README на английском языке. Если они расходятся, актуальна английская версия.

<!-- brand:end -->

App Store Connect спрашивает у каждого приложения, какие из девяти Accessibility Nutrition Labels оно поддерживает: сейчас это
добровольно, а Apple заявляет, что для новых приложений и обновлений это станет обязательным (по состоянию на 28 октября 2026 года срок
не назван). a11ylabel читает нативный проект iOS, Flutter или React Native/Expo и показывает по каждой метке, мешает ли ей уже что-то в коде,
что стоит проверить и что может проверить только человек, а для каждой находки — способ исправления и страницу Apple, на которой она
основана. Он читает файлы вашего проекта; ничего не собирает, не запускает и не меняет.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary для приложения на SwiftUI: VoiceOver, Voice Control и Reduced Motion нужно проверить, Larger Text и Dark Interface — blocked, четыре метки нужно проверить вручную; 2 error, 6 warning, 4 info"></picture>

<sub>Записано с настоящего CLI на
<a href="fixtures/native-swiftui-blocked">фикстуре native-swiftui-blocked</a> — приложении на SwiftUI,
написанном для тестов (<code>npm run demo</code>).</sub>

## Основные возможности

- **Одна таблица для девяти меток.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions и Audio
  Descriptions — каждая **blocked**, **review**, **no blocker found** или **check by hand**, со ссылкой на
  критерии оценки Apple.
- **Находит то, что блокирует метку для всего приложения.** `UIUserInterfaceStyle` Light в Info.plist,
  настройке сборки (build setting) или конфигурации Expo (если ключа нет, Expo использует светлую тему);
  заблокированное масштабирование текста в `Text.defaultProps`, в `MaterialApp.builder` Flutter, в сцене
  SwiftUI или в окне UIKit.
- **И места, которые стоит проверить.** Текст, который не масштабируется или останавливается ниже 200 %,
  фиксированные размеры шрифта, кнопки только со значком и без подписи, бесконечная, параллакс- и
  автоматически запускаемая анимация в коде, который никогда не читает Reduce Motion, и проверка во Flutter,
  которую iOS никогда не устанавливает.
- **Знает платформы.** React Native 0.78 и новее игнорируют `Text.defaultProps` (React 19), поэтому
  a11ylabel там об этом не сообщает; `disableAnimations` во Flutter не следует настройке iOS Reduce Motion;
  Reanimated по умолчанию следует.
- **У каждого правила есть источник.** Правила — это данные ([rules/nutrition-labels.json](rules/nutrition-labels.json)),
  ссылающиеся на страницы Apple, React Native, Expo, Flutter и Reanimated; тесты падают, если у правила
  источника нет.
- **Проверено в Simulator.** При самом крупном размере текста в Dark Mode на iOS 27.0 фикстура blocked
  остаётся светлой с ограниченным текстом, а исправленная становится тёмной с текстом AX5.
- **Создан для CI.** `--labels` проверяет только те метки, которые вы заявляете; отчёты в терминале, в виде
  простого текста, Markdown и JSON; код выхода 0 — чисто, 1 — есть находки, 2 — ошибка использования.

## Быстрый старт

**1. Установите a11ylabel.** С помощью [Homebrew](https://brew.sh/), который заодно ставит Node.js:

```sh
brew install muhittincamdali/tap/a11ylabel
```

Или через npm из [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0); для этого
нужен [Node.js](https://nodejs.org/) 22.12 или новее (версию показывает `node --version`):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

Пакета пока нет в реестре npm; его публикацию там под именем `@mcamdali/a11ylabel` планируется сделать. Обе
команды устанавливают один и тот же tarball из release.

**2. Откройте терминал в папке вашего приложения** — той, где лежит `.xcodeproj`, `pubspec.yaml` или
`package.json`:

```sh
cd path/to/YourApp
```

**3. Запустите a11ylabel:**

```sh
a11ylabel
```

**4. Прочитайте таблицу вверху.** У метки **blocked** есть находка уровня error, которая останавливает её для
всего приложения: исправьте её в первую очередь. **review** перечисляет места, которые могут помешать
распространённой задаче; посмотрите на каждое при включённой функции. Метки **check by hand** зависят от
дизайна или медиа, которых код не показывает. Для каждой находки указан способ исправления из списка
«How to fix», а [Before you claim a label](docs/guides/claiming-labels.md) рассказывает об остальном.

## Что проверяет a11ylabel

В [обзоре](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
Apple сказано, что перед заявлением метки люди должны иметь возможность выполнить все распространённые задачи
приложения при включённой функции. Код может показать лишь часть того, что им мешает:

| Метка                             | В коде    | Что ищет a11ylabel                                                                                                                                             |
| --------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | частично  | Кнопки только со значком и без подписи; подписи, называющие тип элемента управления                                                                            |
| Voice Control                     | частично  | Кнопки только со значком и без имени, которое можно показать и произнести                                                                                      |
| Larger Text                       | да        | Масштабирование, отключённое или ограниченное ниже 200 %, для приложения или одного представления; фиксированные размеры шрифта                                |
| Dark Interface                    | да        | Светлое оформление, принудительно заданное в Info.plist, настройках сборки, конфигурации Expo или коде; нет `darkTheme` во Flutter; цвета без тёмного значения |
| Differentiate Without Color Alone | нет       | Ничего: это вопрос дизайна                                                                                                                                     |
| Sufficient Contrast               | подсказка | Цвета ассетов без значения для высокого контраста                                                                                                              |
| Reduced Motion                    | да        | Бесконечная, вращающаяся, параллакс- и автоматически запускаемая анимация там, где Reduce Motion не читается                                                   |
| Captions                          | подсказка | Воспроизводит ли приложение видео                                                                                                                              |
| Audio Descriptions                | подсказка | Воспроизводит ли приложение видео                                                                                                                              |

| Правило | Severity | Находка                                                                                             | Код                             |
| ------- | -------- | --------------------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | Размер текста заблокирован для всего приложения (ниже 200 %)                                        | все                             |
| A11Y102 | warning  | Один текст или представление, которые не масштабируются                                             | все                             |
| A11Y103 | warning  | Один текст или представление, ограниченные ниже 200 %                                               | все                             |
| A11Y104 | warning  | Фиксированный размер в пунктах: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | Светлое оформление принудительно задано для всего приложения, без возможности включить тёмное       | Info.plist, build setting, Expo |
| A11Y202 | info     | По умолчанию светлое, тёмное — через настройку внутри приложения                                    | Info.plist, build setting, Expo |
| A11Y203 | warning  | Светлая цветовая схема, заданная в коде                                                             | все                             |
| A11Y204 | warning  | `MaterialApp` без `darkTheme`                                                                       | Flutter                         |
| A11Y205 | info     | Цвета ассетов без тёмного варианта                                                                  | asset catalog                   |
| A11Y301 | warning  | Анимация в приложении, которое никогда не читает Reduce Motion                                      | все                             |
| A11Y302 | info     | Анимация в файле, который не читает Reduce Motion                                                   | все                             |
| A11Y303 | warning  | Flutter читает `disableAnimations`, который iOS Reduce Motion не устанавливает                      | Flutter                         |
| A11Y304 | warning  | Анимация Reanimated с `ReduceMotion.Never`                                                          | React Native, Expo              |
| A11Y401 | warning  | Кнопка только со значком без подписи для доступности                                                | все                             |
| A11Y402 | info     | Подпись для доступности, называющая тип элемента управления                                         | все                             |
| A11Y501 | info     | Цвета ассетов без варианта для высокого контраста                                                   | asset catalog                   |
| A11Y601 | info     | Приложение воспроизводит видео                                                                      | все                             |

Данные правил `nutrition-labels@2026.10.28`, источники прочитаны 28 октября 2026 года. Находка уровня error
блокирует метку; warning переводит её в «review»; находки уровня info никогда не меняют статус метки.

## Что показывает Simulator

Одно и то же приложение на SwiftUI до и после исправлений, собранное в Xcode 27.1 (SDK iOS 27.1) и запущенное
на симуляторе iPhone 17 с iOS 27.0: сначала при размере текста по умолчанию в светлой теме, затем при самом
крупном размере для универсального доступа (AX5) в Dark Mode
([как это сделано](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="Приложение Pantry на симуляторе iPhone 17 с iOS 27.0. Слева направо: native-swiftui-blocked при размере по умолчанию в светлой теме, оно же при AX5 в Dark Mode (по-прежнему светлое, текст почти не вырос), native-swiftui-ready при размере по умолчанию и при AX5 в Dark Mode (тёмное, крупный текст, количества под названиями)"></p>

| Фикстура (iOS 27.0 Simulator) | Яркость, по умолчанию → AX5 Dark Mode | Изменившиеся пиксели | a11ylabel                              |
| ----------------------------- | ------------------------------------- | -------------------- | -------------------------------------- |
| native-swiftui-blocked        | 0,97 → 0,97                           | 7 %                  | Larger Text и Dark Interface — blocked |
| native-swiftui-ready          | 0,97 → 0,57                           | 99 %                 | препятствий нет                        |

Яркость — это среднее значение снимка экрана в оттенках серого (0 — чёрный, 1 — белый) над индикатором «Домой»;
записи лежат в [docs/media/simulator](docs/media/simulator). [Фикстура Flutter](docs/media/simulator/flutter-tide-ax5-dark.png)
при тех же настройках остаётся светлой (нет `darkTheme`), а её текст — 130 %.

## Установка

Команды из раздела «Быстрый старт» устанавливают команду `a11ylabel` из GitHub release. В каждом
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) пакет лежит как
`a11ylabel-<version>.tgz` вместе с файлом `SHA256SUMS`. Чтобы зафиксировать release в проекте:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

После этого `npx a11ylabel` запускает именно эту копию. Пакет устанавливается под именем `@mcamdali/a11ylabel` —
именно его импортирует JavaScript API ниже. Публикация в реестре npm планируется; до тех пор
`npx @mcamdali/a11ylabel` пакет не найдёт.

## Использование

```text
a11ylabel [path] [options]
```

| Параметр                | Что делает                                                                     |
| ----------------------- | ------------------------------------------------------------------------------ |
| `path`                  | Папка проекта или `.xcodeproj`; по умолчанию текущая папка                     |
| `-f, --format <format>` | `tty` (по умолчанию), `text`, `markdown` или `json`                            |
| `--json`                | То же, что `--format json`                                                     |
| `-o, --output <file>`   | Записывает отчёт в файл, а не в терминал                                       |
| `-l, --labels <ids>`    | Проверяет только эти метки, через запятую (по умолчанию все девять)            |
| `-s, --summary`         | Только таблица меток и вердикт (форматы terminal и text)                       |
| `--fail-on <severity>`  | `warning` (по умолчанию), `error`, `info` или `none`: когда код выхода равен 1 |
| `--no-color`            | Простой текст даже в терминале (`NO_COLOR` и `FORCE_COLOR` учитываются)        |

Идентификаторы меток: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Коды выхода: `0` — нет находок на уровне `--fail-on` и выше, `1` — есть находки на этом уровне или выше,
`2` — неверные аргументы, проект iOS не найден или непредвиденная ошибка. Если Info.plist или проект Xcode,
от которых зависит Dark Interface, прочитать не удалось, эта метка получает статус «not known», и код выхода
тоже равен `1`, если не указан `--fail-on none`.

a11ylabel сам находит приложение iOS: `.xcodeproj` в корне или на одну папку ниже для нативных приложений,
`ios/` для приложений Flutter, React Native и Expo (`example/ios/` для плагина Flutter). Он читает Info.plist
(XML или двоичный) и настройки сборки каждой цели приложения iOS, наборы цветов в их asset catalog,
файлы Swift и Objective-C приложения, JavaScript и TypeScript приложения React Native или Expo и файлы Dart
в `lib/`, пропуская зависимости, результаты сборки и тесты. Приложение Expo без `ios/` проверяется по своей
конфигурации.

### Проверка только тех меток, которые вы заявляете

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

Таблица, находки и код выхода тогда охватывают только эти метки, поэтому CI падает, когда изменение сломает
метку, которую вы показываете в App Store.

### Хранение отчёта в формате Markdown вместе с кодом

```sh
a11ylabel --format markdown --output accessibility.md
```

В отчёте указаны версии a11ylabel и данных правил и дата чтения источников, а для каждой метки перечислено то,
что может проверить только человек: датированная запись того, что показывал код.

### Использование отчёта JSON в скриптах

```sh
a11ylabel --json > a11ylabel.json
```

У каждой метки есть `id`, `name`, `status`, `coverage`, `criteria`, `counts` и `signals`; у каждой находки —
`rule`, `labels`, `severity`, `title`, `message`, `file`, `line`, `target`, `fix` с шагами и руководством и
`sources`. Формат — `schemaVersion` 0, и до 1.0 он может измениться.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) фильтрует его с помощью `jq`.

### Запуск в CI

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) проверяет заявляемые приложением
метки в каждом pull request, затрагивающем приложение, добавляет отчёт в сводку job и завершает job с ошибкой при
находках уровня warning. `--fail-on error` завершает с ошибкой, только если метка blocked.

### Из JavaScript

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Готовый к запуску вариант — [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs).

## Демо

Записи терминала сделаны с CLI на [фикстурах](fixtures/README.md) — проектах, созданных с каждым инструментарием:

| Проект                                                         | Запись                                                                                                                                              |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Приложение на SwiftUI, таблица меток (`--summary`)             | вверху этой страницы                                                                                                                                |
| То же приложение, Larger Text и Dark Interface с исправлениями | [светлая](docs/media/demo-swiftui-light.svg) · [тёмная](docs/media/demo-swiftui-dark.svg)                                                           |
| То же приложение после исправлений                             | [светлая](docs/media/demo-ready-light.svg) · [тёмная](docs/media/demo-ready-dark.svg)                                                               |
| Приложение на Flutter 3.47.5 с ограниченным масштабом текста   | [светлая](docs/media/demo-flutter-light.svg) · [тёмная](docs/media/demo-flutter-dark.svg)                                                           |
| Приложение на React Native 0.88.1                              | [светлая](docs/media/demo-react-native-light.svg) · [тёмная](docs/media/demo-react-native-dark.svg)                                                 |
| `scripts/simulator-compare.sh` на двух приложениях SwiftUI     | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

Измерено 28 октября 2026 года на Mac (Apple silicon, M5 Max) с Node.js 26.12.1: три серии по 100 запусков
`node dist/cli/main.js --json` на семи фикстурах, включая запуск Node.js. Медианы трёх серий — 0,11, 0,11 и
0,11 секунды; самый медленный запуск занял 0,15 секунды. Сгенерированный проект SwiftUI из 5 000 файлов (33,4 МБ
кода на Swift, 10 000 находок, из них 200 перечислены) занял от 1,06 до 1,19 секунды за три запуска при пиковом расходе памяти 230 МБ (220 МиБ).

## Статус

| Возможность                                                                               | Статус        |
| ----------------------------------------------------------------------------------------- | ------------- |
| Определение нативных проектов, Flutter (приложение и пример плагина), React Native и Expo | работает      |
| Девять меток, у каждой свой статус; A11Y101–A11Y601                                       | работает      |
| Отчёты terminal, text, Markdown и JSON; коды выхода `--labels`, `--summary`, `--fail-on`  | работает      |
| Настройки сборки из `.xcconfig` и исходники локальных пакетов Swift                       | запланировано (0.2) |
| Вывод SARIF и GitHub Action                                                               | запланировано (0.3) |
| Коэффициенты контраста по парам цветов в коде и asset catalog                             | запланировано (0.4) |
| Синтаксические деревья Swift, Dart и TypeScript вместо шаблонов                           | запланировано (0.5) |
| Стабильная схема правил и формат JSON                                                     | запланировано (1.0) |

## Ограничения

- **Код, а не работающее приложение.** Apple требует, чтобы каждая распространённая задача выполнялась при
  включённой функции; a11ylabel не может знать, какие задачи распространены и как выглядят экраны. «No blocker
  found» означает, что ни одно из его правил не сработало, а не то, что метку можно заявлять.
- **Шаблоны, а не компилятор.** Правила — это регулярные выражения и сопоставление скобок в исходном тексте, из
  которого вычищены комментарии и строки. Сгенерированный код, код, обёрнутый в ваши собственные компоненты
  (например, `MyText`, отключающий масштабирование), создаваемый во время выполнения или написанный необычным
  образом, может быть пропущен или ошибочно сопоставлен.
- **Только собственные исходники приложения.** Pods, пакеты Swift вне папки приложения, `node_modules` и плагины
  Flutter не читаются; из `node_modules` читается только `package.json` тех пакетов, версию которых сообщает
  a11ylabel.
- **Настройки сборки только из project.pbxproj.** Файлы `.xcconfig` не читаются. Если Info.plist цели или проект
  Xcode прочитать не удалось, Dark Interface получает статус «not known», и отчёт объясняет причину.
- **Конфигурация Expo как текст.** `app.config.js` и `app.config.ts` не выполняются, поэтому `userInterfaceStyle`,
  заданный через переменную или config plugin, не виден.
- **Ограниченный ввод.** Проект может прийти из pull request, поэтому a11ylabel читает не более 32 МБ на файл
  проекта и из исходников — не более 4 МБ на файл, 20 000 файлов и 128 МБ в сумме, а также не более 5 000
  наборов цветов; то, что пропущено, перечислено в примечаниях отчёта. Plist и файлы JSON могут иметь
  вложенность до 64 уровней.
- **Ограниченный вывод.** Отчёт перечисляет не более 20 находок одного правила на файл и 100 на проект,
  то есть не более 1 700. Находки сверх этих пределов всё равно учитываются в счётчиках меток и в сводке,
  а примечание сообщает, сколько находок каждого правила не перечислено.
  Имена и значения из проекта, например имена таргетов, версии и значения Info.plist, обрезаются до 200 символов.

## Документация

Справочник по API и руководства: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Руководства

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Источники

Прочитаны 28 октября 2026 года:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)
  и критерии оценки каждой метки; ссылки на них есть в отчёте и в
  [rules/nutrition-labels.json](rules/nutrition-labels.json) вместе со страницами API, на которые ссылается каждое правило.
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

## Требования

Node.js 22.12 или новее на macOS, Linux или Windows. Для чтения проекта больше ничего не нужно: ни Xcode, ни
инструментария Flutter или React Native. Скриптам Simulator нужен Mac с Xcode, XcodeGen, Flutter (для
фикстуры Flutter) и ImageMagick.

## Архитектура

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- Данные правил отделены от кода и имеют версию (`nutrition-labels@2026.10.28`); тесты падают, если у правила нет
  источника или оно ссылается на несуществующий раздел руководства.
- CLI (`src/cli/`) только разбирает аргументы, выбирает цвета и ширину и устанавливает код выхода.

## Связанные проекты

[glassready](https://github.com/muhittincamdali/glassready) показывает, что Liquid Glass меняет в приложении,
собранном с SDK iOS 27, а [sdkbump](https://github.com/muhittincamdali/sdkbump) — запустится ли оно.
a11ylabel отвечает на вопрос, кто сможет им пользоваться.

## Вопросы и ответы

**a11ylabel пишет «no blocker found» для Larger Text. Можно ли заявлять метку?** Только на этом основании —
нет. Это значит, что ни одно из правил ничего не нашло; заявляйте метку, когда распространённые задачи
выполняются при самом крупном размере текста без наложения и обрезки текста, как описано в критериях Apple.

**Каждая находка A11Y102 или A11Y401 уровня warning — это проблема?** Нет. Подпись на панели вкладок, которая остаётся
мелкой, приемлема для Apple, если её можно прочитать другим способом, например через Large Content Viewer, а
подпись кнопки может задаваться способом, которого a11ylabel не видит. Посмотрите на это место при включённой
функции и решите сами.

**Меняет ли a11ylabel мой проект?** Нет. Он его читает и записывает только тот отчёт, который вы запросили.

## Участие в разработке

Мы рады вашему участию: прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) и
[кодекс поведения](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md), прежде чем
открывать pull request, а о проблемах безопасности сообщайте так, как описано в [SECURITY.md](SECURITY.md).

## Лицензия

Распространяется по лицензии MIT. Подробнее — в файле [LICENSE](LICENSE).
