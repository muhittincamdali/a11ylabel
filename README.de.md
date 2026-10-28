<!-- i18n-source: README.md@591f001bea80e268117678c02777f62e0d8328ee status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI-Status"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Aktuelle Version: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Sprachversion: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="Lizenz: MIT"></picture></a>
</p>

<p align="center">
<a href="#schnellstart"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-de-light.svg" alt="Loslegen"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-de-light.svg" alt="Dokumentation"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-de-light.svg" alt="Anleitungen"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-de-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-de-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-de-light.svg" alt="Beispiele"></picture></a>
</p>

> Dies ist eine Übersetzung der englischen README. Bei Abweichungen gilt die englische Fassung.

<!-- brand:end -->

App Store Connect fragt jede App, welche der neun Accessibility Nutrition Labels sie unterstützt: derzeit
freiwillig, und Apple sagt, dass es für neue Apps und Updates verpflichtend werden soll (am 28. Oktober
2026 war noch kein Termin genannt). a11ylabel liest ein natives iOS-, Flutter- oder React-Native/Expo-Projekt
und zeigt für jedes Label, ob im Code bereits etwas dagegen spricht, was geprüft werden sollte und was nur
ein Mensch beurteilen kann, jeweils mit der Korrektur zu jedem Befund und der zugehörigen Apple-Seite. Es
liest die Dateien deines Projekts; es baut, startet oder ändert nichts.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary bei einer SwiftUI-App: VoiceOver, Voice Control und Reduced Motion zu prüfen, Larger Text und Dark Interface blocked, vier Labels von Hand zu prüfen; 2 error, 6 warning, 4 info"></picture>

<sub>Aufgezeichnet mit der echten CLI am
<a href="fixtures/native-swiftui-blocked">Fixture native-swiftui-blocked</a>, einer für die Tests
geschriebenen SwiftUI-App (<code>npm run demo</code>).</sub>

## Highlights

- **Eine Tabelle für die neun Labels.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions und Audio
  Descriptions, jeweils **blocked**, **review**, **no blocker found** oder **check by hand**, verlinkt
  mit den Bewertungskriterien von Apple.
- **Findet, was ein Label für die ganze App blockiert.** `UIUserInterfaceStyle` Light in einer Info.plist,
  einem Build-Setting oder einer Expo-Konfiguration (Expo verwendet Hell, wenn der Schlüssel fehlt);
  gesperrte Textskalierung in `Text.defaultProps`, einem Flutter-`MaterialApp.builder`, einer
  SwiftUI-Scene oder einem UIKit-Fenster.
- **Und die Stellen, die zu prüfen sind.** Text, der nicht skaliert oder unter 200 % stehen bleibt, feste
  Schriftgrößen, Buttons nur mit Symbol und ohne Label, endlose, Parallax- und automatisch startende
  Bewegung in Code, der Reduce Motion nie liest, und die Flutter-Abfrage, die iOS nie setzt.
- **Kennt die Plattformen.** React Native 0.78 und neuer ignorieren `Text.defaultProps` (React 19),
  deshalb meldet a11ylabel es dort nicht; Flutters `disableAnimations` folgt nicht der iOS-Einstellung
  Reduce Motion; Reanimated folgt ihr standardmäßig.
- **Jede Regel hat eine Quelle.** Die Regeln sind Daten ([rules/nutrition-labels.json](rules/nutrition-labels.json)),
  die Seiten von Apple, React Native, Expo, Flutter und Reanimated zitieren; die Tests schlagen fehl,
  wenn eine Regel keine hat.
- **Im Simulator geprüft.** Bei der größten Textgröße im Dark Mode unter iOS 27.0 bleibt das blocked-Fixture
  hell mit begrenztem Text, das korrigierte wird dunkel, mit Text in AX5.
- **Gemacht für CI.** `--labels` prüft nur die Labels, die du angibst; Berichte als Terminal-Ausgabe,
  Klartext, Markdown und JSON; Exit-Code 0 sauber, 1 Befunde, 2 Aufruffehler.

## Schnellstart

**1. a11ylabel installieren.** Mit [Homebrew](https://brew.sh/), das auch Node.js installiert:

```sh
brew install muhittincamdali/tap/a11ylabel
```

Oder mit npm aus dem [GitHub-Release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0);
dafür wird [Node.js](https://nodejs.org/) 22.12 oder neuer benötigt (`node --version` zeigt die Version an):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

Das Paket ist noch nicht in der npm-Registry; es dort als `@mcamdali/a11ylabel` zu veröffentlichen, ist
geplant. Beide Befehle installieren dasselbe Release-Tarball.

**2. Öffne ein Terminal im Ordner deiner App**, in dem `.xcodeproj`, `pubspec.yaml` oder
`package.json` liegt:

```sh
cd path/to/YourApp
```

**3. Starte a11ylabel:**

```sh
a11ylabel
```

**4. Lies die Tabelle ganz oben.** Ein **blocked**-Label hat einen error, der es für die ganze App
verhindert: behebe ihn zuerst. **review** listet Stellen auf, die eine häufige Aufgabe verhindern könnten;
sieh dir jede mit eingeschalteter Funktion an. **check by hand**-Labels hängen von Design oder Medien ab,
die der Code nicht zeigt. Jeder Befund nennt seine Korrektur aus der Liste „How to fix“, und
[Before you claim a label](docs/guides/claiming-labels.md) führt durch den Rest.

## Was a11ylabel prüft

Apples [Überblick](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
verlangt, dass Menschen alle häufigen Aufgaben einer App mit eingeschalteter Funktion erledigen können,
bevor die App das Label angibt. Der Code kann einen Teil dessen zeigen, was sie daran hindert:

| Label                             | Im Code     | Wonach a11ylabel sucht                                                                                                                                 |
| --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VoiceOver                         | teilweise   | Buttons nur mit Symbol und ohne Label; Labels, die den Steuerelementtyp nennen                                                                         |
| Voice Control                     | teilweise   | Buttons nur mit Symbol und ohne Namen zum Anzeigen und Sprechen                                                                                        |
| Larger Text                       | ja          | Skalierung abgeschaltet oder unter 200 % begrenzt, für die App oder eine einzelne View; feste Schriftgrößen                                            |
| Dark Interface                    | ja          | Ein helles Erscheinungsbild, erzwungen in Info.plist, Build-Settings, Expo-Konfiguration oder Code; kein Flutter-`darkTheme`; Farben ohne dunklen Wert |
| Differentiate Without Color Alone | nein        | Nichts: eine Frage des Designs                                                                                                                         |
| Sufficient Contrast               | ein Hinweis | Asset-Farben ohne Wert für hohen Kontrast                                                                                                              |
| Reduced Motion                    | ja          | Endlose, rotierende, Parallax- und automatisch startende Bewegung, wo Reduce Motion nicht gelesen wird                                                 |
| Captions                          | ein Hinweis | Ob die App Video abspielt                                                                                                                              |
| Audio Descriptions                | ein Hinweis | Ob die App Video abspielt                                                                                                                              |

| Regel   | Severity | Befund                                                                                        | Code                            |
| ------- | -------- | --------------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | Textgröße für die ganze App gesperrt (unter 200 %)                                            | alle                            |
| A11Y102 | warning  | Ein Text oder eine View, die nicht skaliert                                                   | alle                            |
| A11Y103 | warning  | Ein Text oder eine View, die unter 200 % begrenzt ist                                         | alle                            |
| A11Y104 | warning  | Eine feste Punktgröße: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)`    | SwiftUI, UIKit                  |
| A11Y201 | error    | Helles Erscheinungsbild für die ganze App erzwungen, ohne Möglichkeit, auf Dunkel zu wechseln | Info.plist, Build-Setting, Expo |
| A11Y202 | info     | Standardmäßig hell, dunkel über eine Einstellung in der App                                   | Info.plist, Build-Setting, Expo |
| A11Y203 | warning  | Ein helles Farbschema, im Code gesetzt                                                        | alle                            |
| A11Y204 | warning  | Eine `MaterialApp` ohne `darkTheme`                                                           | Flutter                         |
| A11Y205 | info     | Asset-Farben ohne dunkle Variante                                                             | asset catalog                   |
| A11Y301 | warning  | Bewegung in einer App, die Reduce Motion nie liest                                            | alle                            |
| A11Y302 | info     | Bewegung in einer Datei, die Reduce Motion nicht liest                                        | alle                            |
| A11Y303 | warning  | Flutter liest `disableAnimations`, das Reduce Motion von iOS nicht setzt                      | Flutter                         |
| A11Y304 | warning  | Eine Reanimated-Animation mit `ReduceMotion.Never`                                            | React Native, Expo              |
| A11Y401 | warning  | Button nur mit Symbol ohne Bedienungshilfen-Label                                             | alle                            |
| A11Y402 | info     | Bedienungshilfen-Label, das den Steuerelementtyp nennt                                        | alle                            |
| A11Y501 | info     | Asset-Farben ohne Variante für hohen Kontrast                                                 | asset catalog                   |
| A11Y601 | info     | Die App spielt Video ab                                                                       | alle                            |

Regeldaten `nutrition-labels@2026.10.28`, Quellen gelesen am 28. Oktober 2026. Ein error blockiert ein
Label; ein warning macht daraus „review“; info-Befunde ändern den Status eines Labels nie.

## Was der Simulator zeigt

Dieselbe SwiftUI-App vor und nach den Korrekturen, gebaut mit Xcode 27.1 (iOS-27.1-SDK) und gestartet
auf einem iPhone-17-Simulator mit iOS 27.0, zuerst in der Standardtextgröße im hellen Modus, dann in der
größten Bedienungshilfen-Größe (AX5) im Dark Mode
([so geht es](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="Die Pantry-App in einem iPhone-17-Simulator mit iOS 27.0. Von links: native-swiftui-blocked in Standardgröße im hellen Modus, dieselbe App in AX5 im Dark Mode (weiterhin hell, Text kaum größer), native-swiftui-ready in Standardgröße und in AX5 im Dark Mode (dunkel, großer Text, Mengen unter den Namen)"></p>

| Fixture (iOS 27.0 Simulator) | Helligkeit, Standard → AX5 Dark Mode | Geänderte Pixel | a11ylabel                              |
| ---------------------------- | ------------------------------------ | --------------- | -------------------------------------- |
| native-swiftui-blocked       | 0,97 → 0,97                          | 7 %             | Larger Text und Dark Interface blocked |
| native-swiftui-ready         | 0,97 → 0,57                          | 99 %            | keine Blocker                          |

Die Helligkeit ist der Mittelwert des Graustufen-Screenshots (0 schwarz, 1 weiß) oberhalb des
Home-Indikators; die Aufnahmen liegen in [docs/media/simulator](docs/media/simulator). Das
[Flutter-Fixture](docs/media/simulator/flutter-tide-ax5-dark.png) bleibt unter denselben Einstellungen
hell (kein `darkTheme`) mit Text bei 130 %.

## Installation

Die Befehle im Schnellstart installieren den Befehl `a11ylabel` aus dem GitHub-Release. Jedes
[GitHub-Release](https://github.com/muhittincamdali/a11ylabel/releases) enthält das Paket als
`a11ylabel-<version>.tgz` mit einer Datei `SHA256SUMS`. So legst du in einem Projekt ein Release fest:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

`npx a11ylabel` führt dann diese Kopie aus. Das Paket wird unter dem Namen `@mcamdali/a11ylabel`
installiert, dem Namen, den die JavaScript-API weiter unten importiert. Die Veröffentlichung in der
npm-Registry ist geplant; bis dahin findet `npx @mcamdali/a11ylabel` das Paket nicht.

## Verwendung

```text
a11ylabel [path] [options]
```

| Option                  | Was sie bewirkt                                                             |
| ----------------------- | --------------------------------------------------------------------------- |
| `path`                  | Projektordner oder `.xcodeproj`; Standard ist der aktuelle Ordner           |
| `-f, --format <format>` | `tty` (Standard), `text`, `markdown` oder `json`                            |
| `--json`                | Dasselbe wie `--format json`                                                |
| `-o, --output <file>`   | Schreibt den Bericht in eine Datei statt ins Terminal                       |
| `-l, --labels <ids>`    | Prüft nur diese Labels, durch Kommas getrennt (Standard: alle neun)         |
| `-s, --summary`         | Nur die Label-Tabelle und das Urteil (Terminal- und Textformat)             |
| `--fail-on <severity>`  | `warning` (Standard), `error`, `info` oder `none`: wann der Exit-Code 1 ist |
| `--no-color`            | Klartext auch im Terminal (`NO_COLOR` und `FORCE_COLOR` werden beachtet)    |

Label-IDs: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Exit-Codes: `0` nichts auf oder über der Stufe von `--fail-on`, `1` Befunde auf oder über dieser Stufe,
`2` falsche Argumente, kein iOS-Projekt gefunden oder ein unerwarteter Fehler. Wenn die Info.plist oder das
Xcode-Projekt, das Dark Interface bestimmt, nicht gelesen werden kann, ist dieses Label „not known“, und
der Exit-Code ist ebenfalls `1`, außer mit `--fail-on none`.

a11ylabel findet die iOS-App selbst: ein `.xcodeproj` im Stammordner oder einen Ordner tiefer bei nativen
Apps, `ios/` bei Flutter-, React-Native- und Expo-Apps (`example/ios/` bei einem Flutter-Plugin). Es liest
die Info.plist (XML oder binär) und die Build-Settings jedes iOS-App-Targets, die Farbsätze ihrer Asset-
Kataloge, die Swift- und Objective-C-Dateien der App, das JavaScript und TypeScript einer React-Native-
oder Expo-App und die Dart-Dateien in `lib/` und überspringt Abhängigkeiten, Build-Ausgaben und Tests.
Eine Expo-App ohne `ios/` wird anhand ihrer Konfiguration geprüft.

### Nur die Labels prüfen, die du angibst

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

Die Tabelle, die Befunde und der Exit-Code betreffen dann nur diese Labels, sodass CI fehlschlägt, wenn
eine Änderung ein Label brechen würde, das du im App Store zeigst.

### Einen Markdown-Bericht beim Code aufbewahren

```sh
a11ylabel --format markdown --output accessibility.md
```

Der Bericht nennt die Versionen von a11ylabel und der Regeldaten sowie das Datum, an dem die Quellen
gelesen wurden, und listet für jedes Label auf, was nur ein Mensch prüfen kann: ein datierter Nachweis
dessen, was der Code zeigte.

### Den JSON-Bericht in Skripten verwenden

```sh
a11ylabel --json > a11ylabel.json
```

Jedes Label hat `id`, `name`, `status`, `coverage`, `criteria`, `counts` und `signals`; jeder Befund hat
`rule`, `labels`, `severity`, `title`, `message`, `file`, `line`, `target`, den `fix` mit seinen Schritten
und seiner Anleitung sowie `sources`. Das Format ist `schemaVersion` 0 und kann sich vor 1.0 ändern.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) filtert es mit `jq`.

### In CI ausführen

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) prüft bei jedem Pull Request,
der die App berührt, die Labels, die eine App angibt, fügt den Bericht der Job-Zusammenfassung hinzu und
lässt den Job bei warning fehlschlagen. `--fail-on error` schlägt nur fehl, wenn ein Label blocked ist.

### Aus JavaScript

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Eine lauffähige Version ist [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs).

## Demo

Die Terminal-Aufnahmen stammen von der CLI an den [Fixtures](fixtures/README.md), Projekten, die mit
jeweils einer Toolchain erstellt wurden:

| Projekt                                                    | Aufnahme                                                                                                                                            |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI-App, Label-Tabelle (`--summary`)                   | oben auf dieser Seite                                                                                                                               |
| Dieselbe App, Larger Text und Dark Interface mit Korrektur | [hell](docs/media/demo-swiftui-light.svg) · [dunkel](docs/media/demo-swiftui-dark.svg)                                                              |
| Dieselbe App nach den Korrekturen                          | [hell](docs/media/demo-ready-light.svg) · [dunkel](docs/media/demo-ready-dark.svg)                                                                  |
| Flutter-3.47.5-App mit begrenzter Textskalierung           | [hell](docs/media/demo-flutter-light.svg) · [dunkel](docs/media/demo-flutter-dark.svg)                                                              |
| React-Native-0.88.1-App                                    | [hell](docs/media/demo-react-native-light.svg) · [dunkel](docs/media/demo-react-native-dark.svg)                                                    |
| `scripts/simulator-compare.sh` an den beiden SwiftUI-Apps  | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

Gemessen am 28. Oktober 2026 auf einem Mac (Apple silicon, M5 Max) mit Node.js 26.12.1: drei Durchgänge
mit je 100 Läufen von `node dist/cli/main.js --json` über die sieben Fixtures, einschließlich des
Node.js-Starts. Die Mediane der drei Durchgänge waren 0,11, 0,11 und 0,11 Sekunden; der langsamste Lauf
dauerte 0,15 Sekunden. Ein erzeugtes SwiftUI-Projekt mit 5.000 Dateien (33,4 MB Swift, 10.000 Befunde, davon 200 aufgeführt)
brauchte in drei Läufen 1,06 bis 1,19 Sekunden, bei höchstens 230 MB (220 MiB) Speicher.

## Status

| Funktion                                                                                            | Status        |
| --------------------------------------------------------------------------------------------------- | ------------- |
| Erkennung nativer, Flutter- (App und Plugin-Beispiel), React-Native- und Expo-Projekte              | funktioniert  |
| Die neun Labels mit je einem Status; A11Y101 bis A11Y601                                            | funktioniert  |
| Berichte als Terminal, Text, Markdown und JSON; Exit-Codes für `--labels`, `--summary`, `--fail-on` | funktioniert  |
| `.xcconfig`-Build-Settings und die Quellen lokaler Swift-Pakete                                     | geplant (0.2) |
| SARIF-Ausgabe und eine GitHub Action                                                                | geplant (0.3) |
| Kontrastverhältnisse aus Farbpaaren in Code und Asset-Katalogen                                     | geplant (0.4) |
| Syntaxbäume für Swift, Dart und TypeScript statt Mustern                                            | geplant (0.5) |
| Stabiles Regelschema und stabiles JSON-Format                                                       | geplant (1.0) |

## Grenzen

- **Code, nicht die laufende App.** Apple verlangt, dass jede häufige Aufgabe mit eingeschalteter Funktion
  funktioniert; a11ylabel kann nicht wissen, welche Aufgaben häufig sind oder wie Bildschirme aussehen.
  „No blocker found“ heißt, dass keine seiner Regeln gegriffen hat, nicht, dass das Label angegeben werden
  kann.
- **Muster, kein Compiler.** Die Regeln sind reguläre Ausdrücke und Klammerabgleich auf Quelltext, dessen
  Kommentare und Strings geleert sind. Code, der generiert, in eigene Komponenten verpackt (ein `MyText`,
  das die Skalierung abschaltet), zur Laufzeit aufgebaut oder in ungewöhnlicher Form geschrieben ist,
  kann übersehen oder fälschlich erkannt werden.
- **Nur die eigenen Quellen der App.** Pods, Swift-Pakete außerhalb des App-Ordners, `node_modules` und
  Flutter-Plugins werden nicht gelesen; aus `node_modules` nur die `package.json` der Pakete, deren Version
  a11ylabel meldet.
- **Build-Settings nur aus project.pbxproj.** `.xcconfig`-Dateien werden nicht gelesen. Wenn die Info.plist
  eines Targets oder das Xcode-Projekt nicht gelesen werden kann, ist Dark Interface „not known“, und der
  Bericht nennt den Grund.
- **Expo-Konfiguration als Text.** `app.config.js` und `app.config.ts` werden nicht ausgeführt, daher wird ein
  `userInterfaceStyle`, das über eine Variable oder ein Config-Plugin gesetzt wird, nicht erkannt.
- **Begrenzte Eingabe.** Ein Projekt kann aus einem Pull Request stammen, daher liest a11ylabel höchstens
  32 MB pro Projektdatei und von den Quellen höchstens 4 MB pro Datei, 20.000 Dateien und insgesamt
  128 MB sowie höchstens 5.000 Farbsätze; was ausgelassen wird, steht in den Hinweisen des Berichts.
  Plists und JSON-Dateien dürfen 64 Ebenen tief verschachtelt sein.
- **Begrenzte Ausgabe.** Ein Bericht führt höchstens 20 Befunde einer Regel pro Datei und 100 pro
  Projekt auf, also höchstens 1.700. Befunde über diesen Grenzen zählen weiter in den Zahlen der Labels
  und der Zusammenfassung, und ein Hinweis nennt, wie viele je Regel ausgelassen wurden.
  Namen und Werte aus dem Projekt, etwa Target-Namen, Versionen und Info.plist-Werte, werden auf 200 Zeichen gekürzt.

## Dokumentation

API-Referenz und Anleitungen: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Anleitungen

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Quellen

Gelesen am 28. Oktober 2026:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)
  und die Bewertungskriterien jedes Labels, verlinkt aus dem Bericht und aus
  [rules/nutrition-labels.json](rules/nutrition-labels.json) zusammen mit den API-Seiten, die jede Regel zitiert.
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

## Voraussetzungen

Node.js 22.12 oder neuer unter macOS, Linux oder Windows. Zum Lesen eines Projekts wird nichts weiter
benötigt: kein Xcode, keine Flutter- oder React-Native-Toolchain. Die Simulator-Skripte brauchen einen Mac
mit Xcode, XcodeGen, Flutter (für das Flutter-Fixture) und ImageMagick.

## Architektur

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- Die Regeldaten sind vom Code getrennt und versioniert (`nutrition-labels@2026.10.28`); die Tests schlagen
  fehl, wenn eine Regel keine Quelle hat oder auf einen Abschnitt einer Anleitung verweist, den es nicht gibt.
- Die CLI (`src/cli/`) wertet nur Argumente aus, wählt Farben und Breiten und setzt den Exit-Code.

## Verwandte Projekte

[glassready](https://github.com/muhittincamdali/glassready) zeigt, was Liquid Glass in einer mit dem
iOS-27-SDK gebauten App ändert, und [sdkbump](https://github.com/muhittincamdali/sdkbump), ob sie
starten wird. a11ylabel beantwortet, wer sie nutzen kann.

## FAQ

**a11ylabel meldet für Larger Text „no blocker found“. Kann ich das Label angeben?** Nicht allein deswegen.
Es heißt, dass keine der Regeln etwas gefunden hat; gib das Label an, wenn die häufigen Aufgaben bei der
größten Textgröße funktionieren, ohne dass sich Text überlappt oder abgeschnitten wird, wie es Apples
Kriterien beschreiben.

**Ist jedes warning A11Y102 oder A11Y401 ein Problem?** Nein. Ein Tab-Bar-Label, das klein bleibt, ist für
Apple akzeptabel, wenn es auf andere Weise lesbar ist, etwa über den Large Content Viewer, und ein Button
kann sein Label auf eine Weise erhalten, die a11ylabel nicht sieht. Sieh dir die Stelle mit eingeschalteter
Funktion an und entscheide.

**Ändert a11ylabel mein Projekt?** Nein. Es liest es und schreibt nur den Bericht, den du anforderst.

## Mitwirken

Beiträge sind willkommen. Lies vor einem Pull Request [CONTRIBUTING.md](CONTRIBUTING.md) und den
[Verhaltenskodex](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md), und melde
Sicherheitsprobleme, wie in [SECURITY.md](SECURITY.md) beschrieben.

## Lizenz

Veröffentlicht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE).
