<!-- i18n-source: README.md@9b89a12078d421a75c4e78c0de2f0c9deba28fd2 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="Estado de CI"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Última versión: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Versión del lenguaje: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="Licencia: MIT"></picture></a>
</p>

<p align="center">
<a href="#inicio-rápido"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-es-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-es-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-es-light.svg" alt="Empezar"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-es-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-es-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-es-light.svg" alt="Documentación"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-es-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-es-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-es-light.svg" alt="Guías"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-es-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-es-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-es-light.svg" alt="Ejemplos"></picture></a>
</p>

> Esta es una traducción del README en inglés. Si hay diferencias, la versión en inglés es la vigente.

<!-- brand:end -->

App Store Connect pregunta a cada app cuáles de las nueve Accessibility Nutrition Labels admite: hoy es
voluntario, y Apple dice que será obligatorio para las apps y actualizaciones nuevas (el 28 de octubre
de 2026 no se había dado ninguna fecha). a11ylabel lee un proyecto nativo de iOS, Flutter o React
Native/Expo y muestra, para cada etiqueta, si algo en el código ya la bloquea, qué conviene revisar y
qué solo puede comprobar una persona, con la solución de cada hallazgo y la página de Apple en que se
basa. Lee los archivos de tu proyecto; no compila, ejecuta ni cambia nada.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary en una app SwiftUI: VoiceOver, Voice Control y Reduced Motion por revisar, Larger Text y Dark Interface blocked, cuatro etiquetas por comprobar a mano; 2 error, 6 warning, 4 info"></picture>

<sub>Grabado con la CLI real sobre el
<a href="fixtures/native-swiftui-blocked">fixture native-swiftui-blocked</a>, una app SwiftUI escrita
para las pruebas (<code>npm run demo</code>).</sub>

## Lo más destacado

- **Una tabla para las nueve etiquetas.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions y Audio
  Descriptions, cada una **blocked**, **review**, **no blocker found** o **check by hand**, con
  enlaces a los criterios de evaluación de Apple.
- **Encuentra lo que bloquea una etiqueta en toda la app.** `UIUserInterfaceStyle` Light en un
  Info.plist, un build setting o una configuración de Expo (Expo usa el modo claro cuando falta la
  clave); el escalado de texto bloqueado en `Text.defaultProps`, en un `MaterialApp.builder` de Flutter,
  en una scene de SwiftUI o en una window de UIKit.
- **Y los lugares que conviene revisar.** Texto que no escala o que se detiene por debajo del 200 %,
  tamaños de fuente fijos, botones solo con icono y sin etiqueta, movimiento infinito, con parallax y
  de reproducción automática en código que nunca lee Reduce Motion, y la comprobación de Flutter que
  iOS nunca activa.
- **Conoce las plataformas.** React Native 0.78 y posteriores ignoran `Text.defaultProps` (React 19),
  así que a11ylabel no lo informa ahí; el `disableAnimations` de Flutter no sigue Reduce Motion de iOS;
  Reanimated sí lo sigue por defecto.
- **Cada regla tiene una fuente.** Las reglas son datos ([rules/nutrition-labels.json](rules/nutrition-labels.json))
  que citan las páginas de Apple, React Native, Expo, Flutter y Reanimated; las pruebas fallan si una
  regla no tiene ninguna.
- **Comprobado en el Simulator.** Con el tamaño de texto más grande en Dark Mode en iOS 27.0, el fixture
  blocked sigue claro y con el texto limitado, y el corregido pasa a oscuro con el texto en AX5.
- **Pensado para CI.** `--labels` revisa solo las etiquetas que declaras; informes en terminal, texto
  plano, Markdown y JSON; código de salida 0 sin hallazgos, 1 con hallazgos, 2 error de uso.

## Inicio rápido

**1. Instala a11ylabel.** Con [Homebrew](https://brew.sh/), que también instala Node.js:

```sh
brew install muhittincamdali/tap/a11ylabel
```

O con npm desde la [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0),
que requiere [Node.js](https://nodejs.org/) 22.12 o posterior (`node --version` lo muestra):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

El paquete todavía no está en el registro de npm; está previsto publicarlo allí como
`@mcamdali/a11ylabel`. Ambos comandos instalan el mismo tarball de la release.

**2. Abre una terminal en la carpeta de tu app**, la que contiene el `.xcodeproj`, `pubspec.yaml` o
`package.json`:

```sh
cd path/to/YourApp
```

**3. Ejecuta a11ylabel:**

```sh
a11ylabel
```

**4. Lee la tabla de arriba.** Una etiqueta **blocked** tiene un error que la detiene en toda la app:
corrígelo primero. **review** enumera los lugares que pueden impedir una tarea habitual; revisa cada uno
con la función activada. Las etiquetas **check by hand** dependen del diseño o de contenidos que el código
no muestra. Cada hallazgo indica su solución de la lista «How to fix», y
[Before you claim a label](docs/guides/claiming-labels.md) explica el resto paso a paso.

## Qué comprueba a11ylabel

La [descripción general](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
de Apple pide que las personas puedan completar todas las tareas habituales de una app con una función
activada antes de que la app declare la etiqueta. El código puede mostrar parte de lo que se lo impide:

| Etiqueta                          | En código | Qué busca a11ylabel                                                                                                                                 |
| --------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | en parte  | Botones solo con icono y sin etiqueta; etiquetas que nombran el tipo de control                                                                     |
| Voice Control                     | en parte  | Botones solo con icono y sin un nombre que mostrar y decir                                                                                          |
| Larger Text                       | sí        | Escalado desactivado o limitado por debajo del 200 %, para la app o para una vista; tamaños de fuente fijos                                         |
| Dark Interface                    | sí        | Una apariencia clara forzada en Info.plist, build settings, la configuración de Expo o el código; Flutter sin `darkTheme`; colores sin valor oscuro |
| Differentiate Without Color Alone | no        | Nada: es una cuestión de diseño                                                                                                                     |
| Sufficient Contrast               | una pista | Colores de asset sin un valor de alto contraste                                                                                                     |
| Reduced Motion                    | sí        | Movimiento infinito, giratorio, con parallax y de reproducción automática donde no se lee Reduce Motion                                             |
| Captions                          | una pista | Si la app reproduce vídeo                                                                                                                           |
| Audio Descriptions                | una pista | Si la app reproduce vídeo                                                                                                                           |

| Regla   | Severity | Hallazgo                                                                                      | Código                          |
| ------- | -------- | --------------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | Tamaño de texto bloqueado en toda la app (por debajo del 200 %)                               | todos                           |
| A11Y102 | warning  | Un texto o vista que no escala                                                                | todos                           |
| A11Y103 | warning  | Un texto o vista limitado por debajo del 200 %                                                | todos                           |
| A11Y104 | warning  | Un tamaño en puntos fijo: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | Apariencia clara forzada en toda la app, sin forma de pasar a oscuro                          | Info.plist, build setting, Expo |
| A11Y202 | info     | Claro por defecto, oscuro mediante un ajuste dentro de la app                                 | Info.plist, build setting, Expo |
| A11Y203 | warning  | Un esquema de color claro definido en el código                                               | todos                           |
| A11Y204 | warning  | Un `MaterialApp` sin `darkTheme`                                                              | Flutter                         |
| A11Y205 | info     | Colores de asset sin variante oscura                                                          | asset catalog                   |
| A11Y301 | warning  | Movimiento en una app que nunca lee Reduce Motion                                             | todos                           |
| A11Y302 | info     | Movimiento en un archivo que no lee Reduce Motion                                             | todos                           |
| A11Y303 | warning  | Flutter lee `disableAnimations`, que Reduce Motion de iOS no activa                           | Flutter                         |
| A11Y304 | warning  | Una animación de Reanimated con `ReduceMotion.Never`                                          | React Native, Expo              |
| A11Y401 | warning  | Botón solo con icono sin etiqueta de accesibilidad                                            | todos                           |
| A11Y402 | info     | Etiqueta de accesibilidad que nombra el tipo de control                                       | todos                           |
| A11Y501 | info     | Colores de asset sin variante de alto contraste                                               | asset catalog                   |
| A11Y601 | info     | La app reproduce vídeo                                                                        | todos                           |

Datos de reglas `nutrition-labels@2026.10.28`, con fuentes leídas el 28 de octubre de 2026. Un error
bloquea una etiqueta; un warning la deja en «review»; los hallazgos info nunca cambian el estado de una
etiqueta.

## Qué muestra el Simulator

La misma app SwiftUI antes y después de las correcciones, compilada con Xcode 27.1 (SDK de iOS 27.1) y
ejecutada en un simulator de iPhone 17 con iOS 27.0, primero con el tamaño de texto predeterminado en
modo claro y luego con el tamaño de accesibilidad más grande (AX5) en Dark Mode
([cómo](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="La app Pantry en un simulator de iPhone 17 con iOS 27.0. De izquierda a derecha: native-swiftui-blocked con el tamaño predeterminado en modo claro, la misma en AX5 con Dark Mode (sigue clara, el texto apenas crece), native-swiftui-ready con el tamaño predeterminado, y en AX5 con Dark Mode (oscura, texto grande, cantidades bajo los nombres)"></p>

| Fixture (iOS 27.0 Simulator) | Brillo, predeterminado → AX5 Dark Mode | Píxeles cambiados | a11ylabel                            |
| ---------------------------- | -------------------------------------- | ----------------- | ------------------------------------ |
| native-swiftui-blocked       | 0,97 → 0,97                            | 7 %               | Larger Text y Dark Interface blocked |
| native-swiftui-ready         | 0,97 → 0,57                            | 99 %              | sin bloqueos                         |

El brillo es la media de la captura en escala de grises (0 negro, 1 blanco) por encima del indicador de
inicio; las grabaciones están en [docs/media/simulator](docs/media/simulator). El
[fixture de Flutter](docs/media/simulator/flutter-tide-ax5-dark.png) con los mismos ajustes sigue claro
(sin `darkTheme`) y con el texto al 130 %.

## Instalación

Los comandos del Inicio rápido instalan el comando `a11ylabel` desde la GitHub release. Cada
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) incluye el paquete como
`a11ylabel-<version>.tgz` junto con un archivo `SHA256SUMS`. Para fijar una release en un proyecto:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

`npx a11ylabel` ejecuta entonces esa copia. El paquete se instala con el nombre `@mcamdali/a11ylabel`,
el nombre que importa la API de JavaScript de más abajo. Publicarlo en el registro de npm está previsto;
hasta entonces, `npx @mcamdali/a11ylabel` no encuentra el paquete.

## Uso

```text
a11ylabel [path] [options]
```

| Opción                  | Qué hace                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `path`                  | Carpeta del proyecto o `.xcodeproj`; por defecto, la carpeta actual                |
| `-f, --format <format>` | `tty` (por defecto), `text`, `markdown` o `json`                                   |
| `--json`                | Igual que `--format json`                                                          |
| `-o, --output <file>`   | Escribe el informe en un archivo en lugar de en la terminal                        |
| `-l, --labels <ids>`    | Revisa solo estas etiquetas, separadas por comas (por defecto: las nueve)          |
| `-s, --summary`         | Solo la tabla de etiquetas y el veredicto (formatos de terminal y texto)           |
| `--fail-on <severity>`  | `warning` (por defecto), `error`, `info` o `none`: cuándo el código de salida es 1 |
| `--no-color`            | Texto plano incluso en una terminal (se respetan `NO_COLOR` y `FORCE_COLOR`)       |

Ids de etiqueta: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Códigos de salida: `0` nada en el nivel de `--fail-on` ni por encima, `1` hallazgos en ese nivel o por
encima, `2` argumentos incorrectos, ningún proyecto iOS encontrado o un error inesperado. Cuando no se
puede leer el Info.plist o el proyecto de Xcode que decide Dark Interface, esa etiqueta queda en «not
known» y el código de salida también es `1`, salvo con `--fail-on none`.

a11ylabel encuentra la app iOS por sí solo: un `.xcodeproj` en la raíz o una carpeta más abajo para las
apps nativas, `ios/` para las apps de Flutter, React Native y Expo (`example/ios/` para un plugin de
Flutter). Lee el Info.plist (XML o binario) y los build settings de cada target de app iOS, los conjuntos
de colores de sus asset catalogs, los archivos Swift y Objective-C de la app, el JavaScript y TypeScript
de una app de React Native o Expo y los archivos Dart de `lib/`, y omite las dependencias, la salida de
compilación y las pruebas. Una app de Expo sin `ios/` se revisa a partir de su configuración.

### Revisa solo las etiquetas que declaras

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

La tabla, los hallazgos y el código de salida cubren entonces solo esas etiquetas, de modo que CI falla
cuando un cambio rompería una etiqueta que muestras en la App Store.

### Guarda un informe en Markdown junto al código

```sh
a11ylabel --format markdown --output accessibility.md
```

El informe indica las versiones de a11ylabel y de los datos de reglas y la fecha en que se leyeron las
fuentes, y enumera para cada etiqueta lo que solo una persona puede comprobar: un registro fechado de lo
que mostraba el código.

### Usa el informe JSON en scripts

```sh
a11ylabel --json > a11ylabel.json
```

Cada etiqueta tiene `id`, `name`, `status`, `coverage`, `criteria`, `counts` y `signals`; cada hallazgo
tiene `rule`, `labels`, `severity`, `title`, `message`, `file`, `line`, `target`, el `fix` con sus pasos
y su guía, y `sources`. El formato es `schemaVersion` 0 y puede cambiar antes de la 1.0.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) lo filtra con `jq`.

### Ejecútalo en CI

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) revisa las etiquetas que
declara una app en cada pull request que toca la app, añade el informe al resumen del job y hace fallar
el job con los warning. `--fail-on error` solo falla cuando una etiqueta está blocked.

### Desde JavaScript

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Una versión ejecutable es [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs).

## Demo

Las grabaciones de terminal proceden de la CLI sobre los [fixtures](fixtures/README.md), proyectos hechos
con cada toolchain:

| Proyecto                                                      | Grabación                                                                                                                                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| App SwiftUI, tabla de etiquetas (`--summary`)                 | parte superior de esta página                                                                                                                       |
| La misma app, Larger Text y Dark Interface con sus soluciones | [claro](docs/media/demo-swiftui-light.svg) · [oscuro](docs/media/demo-swiftui-dark.svg)                                                             |
| La misma app tras las correcciones                            | [claro](docs/media/demo-ready-light.svg) · [oscuro](docs/media/demo-ready-dark.svg)                                                                 |
| App de Flutter 3.47.5 con la escala de texto limitada         | [claro](docs/media/demo-flutter-light.svg) · [oscuro](docs/media/demo-flutter-dark.svg)                                                             |
| App de React Native 0.88.1                                    | [claro](docs/media/demo-react-native-light.svg) · [oscuro](docs/media/demo-react-native-dark.svg)                                                   |
| `scripts/simulator-compare.sh` en las dos apps SwiftUI        | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

Medido el 28 de octubre de 2026 en un Mac (Apple silicon, M5 Max) con Node.js 26.12.1: tres series de 100
ejecuciones de `node dist/cli/main.js --json` sobre los siete fixtures, con el arranque de Node.js
incluido. Las medianas de las tres series fueron 0,11, 0,11 y 0,11 segundos; la ejecución más lenta tardó
0,31 segundos. Un proyecto SwiftUI generado de 5.000 archivos (33,4 MB de Swift, 10.000 hallazgos, 200 de ellos listados) tardó
entre 1,27 y 1,43 segundos en tres ejecuciones, con un máximo de 297 MB de memoria.

## Estado

| Función                                                                                              | Estado        |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| Detección de proyectos nativos, Flutter (app y ejemplo de plugin), React Native y Expo               | funciona      |
| Las nueve etiquetas con un estado cada una; A11Y101 a A11Y601                                        | funciona      |
| Informes de terminal, texto, Markdown y JSON; códigos de salida `--labels`, `--summary`, `--fail-on` | funciona      |
| Build settings de `.xcconfig` y las fuentes de los paquetes Swift locales                            | previsto (0.2) |
| Salida SARIF y una GitHub Action                                                                     | previsto (0.3) |
| Ratios de contraste a partir de pares de colores en el código y en los asset catalogs                | previsto (0.4) |
| Árboles de sintaxis de Swift, Dart y TypeScript en lugar de patrones                                 | previsto (0.5) |
| Esquema de reglas y formato JSON estables                                                            | previsto (1.0) |

## Límites

- **El código, no la app en ejecución.** Apple pide que cada tarea habitual funcione con la función
  activada; a11ylabel no puede saber qué tareas son habituales ni cómo se ven las pantallas. «No blocker
  found» significa que ninguna de sus reglas coincidió, no que la etiqueta pueda declararse.
- **Patrones, no un compilador.** Las reglas son expresiones regulares y emparejamiento de paréntesis
  sobre texto fuente cuyos comentarios y cadenas se han borrado. El código generado, envuelto en
  componentes propios (un `MyText` que desactiva el escalado), construido en tiempo de ejecución o escrito
  de forma poco habitual puede pasar desapercibido o coincidir por error.
- **Solo las fuentes de la propia app.** No se leen Pods, paquetes Swift fuera de la carpeta de la app,
  `node_modules` ni plugins de Flutter; de `node_modules` solo se lee el `package.json` de los paquetes
  cuya versión informa a11ylabel.
- **Build settings solo de project.pbxproj.** No se leen los archivos `.xcconfig`. Cuando no se puede
  leer el Info.plist de un target o el proyecto de Xcode, Dark Interface queda en «not known» y el informe
  explica por qué.
- **La configuración de Expo, como texto.** `app.config.js` y `app.config.ts` no se ejecutan, así que un
  `userInterfaceStyle` definido mediante una variable o un config plugin no se ve.
- **Entrada acotada.** Un proyecto puede venir de una pull request, así que a11ylabel lee como máximo 32 MB
  por archivo de proyecto y, de las fuentes, 4 MB por archivo, 20.000 archivos y 128 MB en total, y como
  máximo 5.000 conjuntos de colores; lo que deja fuera se indica en las notas del informe. Los plist y los
  archivos JSON pueden anidar 64 niveles.
- **Salida acotada.** Un informe enumera como máximo 20 hallazgos de una regla por archivo y 100 por
  proyecto, es decir, 1.700 como máximo. Los hallazgos por encima de esos límites siguen contando en los
  recuentos de cada etiqueta y en el resumen, y una nota indica cuántos de cada regla se dejaron fuera.

## Documentación

Referencia de la API y guías: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Guías

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Fuentes

Leídas el 28 de octubre de 2026:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)
  y los criterios de evaluación de cada etiqueta, enlazados desde el informe y desde
  [rules/nutrition-labels.json](rules/nutrition-labels.json) junto con las páginas de API que cita cada regla.
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

## Requisitos

Node.js 22.12 o posterior en macOS, Linux o Windows. Leer un proyecto no necesita nada más: ni Xcode, ni
Flutter, ni la toolchain de React Native. Los scripts del Simulator necesitan un Mac con Xcode, XcodeGen,
Flutter (para el fixture de Flutter) e ImageMagick.

## Arquitectura

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- Los datos de las reglas están separados del código y tienen versión (`nutrition-labels@2026.10.28`); las
  pruebas fallan cuando una regla no tiene fuente o enlaza a una sección de guía que no existe.
- La CLI (`src/cli/`) solo analiza los argumentos, elige colores y anchos, y define el código de salida.

## Proyectos relacionados

[glassready](https://github.com/muhittincamdali/glassready) muestra qué cambia Liquid Glass en una app
compilada con el SDK de iOS 27, y [sdkbump](https://github.com/muhittincamdali/sdkbump) si se podrá
lanzar. a11ylabel responde quién puede usarla.

## Preguntas frecuentes

**a11ylabel dice «no blocker found» para Larger Text. ¿Puedo declararla?** No solo con eso. Significa que
ninguna regla encontró nada; declara la etiqueta cuando las tareas habituales funcionen con el tamaño de
texto más grande sin que el texto se solape ni se corte, como describen los criterios de Apple.

**¿Todo warning A11Y102 o A11Y401 es un problema?** No. Apple acepta una etiqueta de barra de pestañas que
se queda pequeña cuando tiene otra forma de leerse, como el Large Content Viewer, y un botón puede recibir
su etiqueta de una forma que a11ylabel no ve. Mira el lugar con la función activada y decide.

**¿a11ylabel cambia mi proyecto?** No. Lo lee y solo escribe el informe que pides.

## Contribuir

Las contribuciones son bienvenidas. Lee [CONTRIBUTING.md](CONTRIBUTING.md) y el
[código de conducta](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) antes de
abrir una pull request, e informa de los problemas de seguridad como se describe en [SECURITY.md](SECURITY.md).

## Licencia

Publicado bajo la licencia MIT. Consulta [LICENSE](LICENSE).
