<!-- i18n-source: README.md@ffa00e221e64ba2224b648e1bfb266c09dee9691 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="Status da CI"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Versão mais recente: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Versão da linguagem: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="Licença: MIT"></picture></a>
</p>

<p align="center">
<a href="#início-rápido"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-pt-BR-light.svg" alt="Começar"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-pt-BR-light.svg" alt="Documentação"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-pt-BR-light.svg" alt="Guias"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-pt-BR-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-pt-BR-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-pt-BR-light.svg" alt="Exemplos"></picture></a>
</p>

> Esta é uma tradução do README em inglês. Se houver diferença, vale a versão em inglês.

<!-- brand:end -->

O App Store Connect pergunta a cada app quais das nove Accessibility Nutrition Labels ele oferece: hoje é
voluntário, e a Apple diz que passará a ser obrigatório para apps novos e atualizações (em 28 de outubro de
2026 nenhuma data havia sido informada). O a11ylabel lê um projeto iOS nativo, Flutter ou React Native/Expo
e mostra, para cada selo, se algo no código já o bloqueia, o que revisar e o que só uma pessoa pode conferir,
com a correção de cada achado e a página da Apple em que ele se baseia. Ele lê os arquivos do seu projeto;
não compila, não executa e não altera nada.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="a11ylabel --summary em um app SwiftUI: VoiceOver, Voice Control e Reduced Motion para revisar, Larger Text e Dark Interface blocked, quatro selos para conferir manualmente; 2 error, 6 warning, 4 info"></picture>

<sub>Gravado com a CLI real no
<a href="fixtures/native-swiftui-blocked">fixture native-swiftui-blocked</a>, um app SwiftUI escrito para os
testes (<code>npm run demo</code>).</sub>

## Destaques

- **Uma tabela para os nove selos.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions e Audio
  Descriptions, cada um **blocked**, **review**, **no blocker found** ou **check by hand**, com link para os
  critérios de avaliação da Apple.
- **Encontra o que bloqueia um selo no app inteiro.** `UIUserInterfaceStyle` Light em um Info.plist, em um
  build setting ou em uma configuração do Expo (o Expo usa o modo claro quando a chave não existe); escala de
  texto travada em `Text.defaultProps`, em um `MaterialApp.builder` do Flutter, em uma scene do SwiftUI ou em
  uma window do UIKit.
- **E os pontos a revisar.** Texto que não escala ou que para abaixo de 200%, tamanhos de fonte fixos, botões
  só com ícone e sem rótulo, movimento infinito, com parallax e de reprodução automática em código que nunca
  lê Reduce Motion, e a verificação do Flutter que o iOS nunca define.
- **Conhece as plataformas.** O React Native 0.78 e posteriores ignoram `Text.defaultProps` (React 19), então
  o a11ylabel não o relata ali; o `disableAnimations` do Flutter não acompanha o Reduce Motion do iOS; o
  Reanimated o acompanha por padrão.
- **Cada regra tem uma fonte.** As regras são dados ([rules/nutrition-labels.json](rules/nutrition-labels.json))
  que citam as páginas da Apple, do React Native, do Expo, do Flutter e do Reanimated; os testes falham se
  uma regra não tiver nenhuma.
- **Verificado no Simulator.** No maior tamanho de texto em Dark Mode no iOS 27.0, o fixture blocked continua
  claro, com o texto limitado, e o corrigido fica escuro com o texto em AX5.
- **Feito para CI.** `--labels` verifica só os selos que você declara; relatórios no terminal, em texto
  simples, em Markdown e em JSON; código de saída 0 sem achados, 1 com achados, 2 erro de uso.

## Início rápido

**1. Instale o a11ylabel.** Com o [Homebrew](https://brew.sh/), que também instala o Node.js:

```sh
brew install muhittincamdali/tap/a11ylabel
```

Ou com npm, o que exige o [Node.js](https://nodejs.org/) 22.12 ou posterior (`node --version` mostra a versão):

```sh
npm i -g @mcamdali/a11ylabel
```

Para executá-lo sem instalar, use `npx @mcamdali/a11ylabel`.

**2. Abra um terminal na pasta do seu app**, a que tem o `.xcodeproj`, o `pubspec.yaml` ou o
`package.json`:

```sh
cd path/to/YourApp
```

**3. Execute o a11ylabel:**

```sh
a11ylabel
```

**4. Leia a tabela no topo.** Um selo **blocked** tem um error que o impede no app inteiro: corrija-o primeiro.
**review** lista os pontos que podem impedir uma tarefa comum; olhe cada um com o recurso ativado. Os selos
**check by hand** dependem de design ou de mídia que o código não mostra. Cada achado indica sua correção na
lista "How to fix", e [Before you claim a label](docs/guides/claiming-labels.md) explica o resto.

## O que o a11ylabel verifica

A [visão geral](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
da Apple pede que as pessoas consigam concluir todas as tarefas comuns de um app com um recurso ativado antes
de o app declarar o selo. O código pode mostrar parte do que as impede:

| Selo                              | No código | O que o a11ylabel procura                                                                                                                            |
| --------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | em parte  | Botões só com ícone e sem rótulo; rótulos que nomeiam o tipo de controle                                                                             |
| Voice Control                     | em parte  | Botões só com ícone e sem um nome para mostrar e dizer                                                                                               |
| Larger Text                       | sim       | Escala desativada ou limitada abaixo de 200%, para o app ou para uma view; tamanhos de fonte fixos                                                   |
| Dark Interface                    | sim       | Uma aparência clara forçada no Info.plist, nos build settings, na configuração do Expo ou no código; Flutter sem `darkTheme`; cores sem valor escuro |
| Differentiate Without Color Alone | não       | Nada: é uma questão de design                                                                                                                        |
| Sufficient Contrast               | uma dica  | Cores de asset sem valor de alto contraste                                                                                                           |
| Reduced Motion                    | sim       | Movimento infinito, giratório, com parallax e de reprodução automática onde o Reduce Motion não é lido                                               |
| Captions                          | uma dica  | Se o app reproduz vídeo                                                                                                                              |
| Audio Descriptions                | uma dica  | Se o app reproduz vídeo                                                                                                                              |

| Regra   | Severity | Achado                                                                                         | Código                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------- | ------------------------------- |
| A11Y101 | error    | Tamanho do texto travado no app inteiro (abaixo de 200%)                                       | todos                           |
| A11Y102 | warning  | Um texto ou view que não escala                                                                | todos                           |
| A11Y103 | warning  | Um texto ou view limitado abaixo de 200%                                                       | todos                           |
| A11Y104 | warning  | Um tamanho em pontos fixo: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | Aparência clara forçada no app inteiro, sem como mudar para escura                             | Info.plist, build setting, Expo |
| A11Y202 | info     | Clara por padrão, escura por uma configuração dentro do app                                    | Info.plist, build setting, Expo |
| A11Y203 | warning  | Um esquema de cores claro definido no código                                                   | todos                           |
| A11Y204 | warning  | Um `MaterialApp` sem `darkTheme`                                                               | Flutter                         |
| A11Y205 | info     | Cores de asset sem variante escura                                                             | asset catalog                   |
| A11Y301 | warning  | Movimento em um app que nunca lê o Reduce Motion                                               | todos                           |
| A11Y302 | info     | Movimento em um arquivo que não lê o Reduce Motion                                             | todos                           |
| A11Y303 | warning  | O Flutter lê `disableAnimations`, que o Reduce Motion do iOS não define                        | Flutter                         |
| A11Y304 | warning  | Uma animação do Reanimated com `ReduceMotion.Never`                                            | React Native, Expo              |
| A11Y401 | warning  | Botão só com ícone sem rótulo de acessibilidade                                                | todos                           |
| A11Y402 | info     | Rótulo de acessibilidade que nomeia o tipo de controle                                         | todos                           |
| A11Y501 | info     | Cores de asset sem variante de alto contraste                                                  | asset catalog                   |
| A11Y601 | info     | O app reproduz vídeo                                                                           | todos                           |

Dados de regras `nutrition-labels@2026.10.28`, com fontes lidas em 28 de outubro de 2026. Um error bloqueia
um selo; um warning o coloca em "review"; os achados info nunca mudam o status de um selo.

## O que o Simulator mostra

O mesmo app SwiftUI antes e depois das correções, compilado com o Xcode 27.1 (SDK do iOS 27.1) e executado
em um simulator de iPhone 17 com iOS 27.0, primeiro no tamanho de texto padrão no modo claro e depois no
maior tamanho de acessibilidade (AX5) em Dark Mode
([como](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="O app Pantry em um simulator de iPhone 17 com iOS 27.0. Da esquerda: native-swiftui-blocked no tamanho padrão no modo claro, o mesmo em AX5 com Dark Mode (ainda claro, texto quase sem aumentar), native-swiftui-ready no tamanho padrão e em AX5 com Dark Mode (escuro, texto grande, quantidades sob os nomes)"></p>

| Fixture (iOS 27.0 Simulator) | Brilho, padrão → AX5 Dark Mode | Pixels alterados | a11ylabel                            |
| ---------------------------- | ------------------------------ | ---------------- | ------------------------------------ |
| native-swiftui-blocked       | 0,97 → 0,97                    | 7%               | Larger Text e Dark Interface blocked |
| native-swiftui-ready         | 0,97 → 0,57                    | 99%              | sem bloqueios                        |

O brilho é a média da captura de tela em tons de cinza (0 preto, 1 branco) acima do indicador da tela inicial;
as gravações estão em [docs/media/simulator](docs/media/simulator). O
[fixture do Flutter](docs/media/simulator/flutter-tide-ax5-dark.png), com as mesmas configurações, continua
claro (sem `darkTheme`) com o texto em 130%.

## Instalação

Os comandos do Início rápido instalam o comando `a11ylabel` a partir da GitHub release. Cada
Os comandos do Início rápido instalam o comando `a11ylabel` a partir do registro do npm. Para fixar uma versão em um projeto:

```sh
npm install --save-dev @mcamdali/a11ylabel
```

O `npx a11ylabel` passa então a executar essa cópia. O pacote é instalado com o nome `@mcamdali/a11ylabel`, o nome que a API JavaScript abaixo importa. Cada [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases) também traz o pacote como `a11ylabel-<version>.tgz` com um arquivo `SHA256SUMS`, para fixar ou verificar uma release específica:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

## Uso

```text
a11ylabel [path] [options]
```

| Opção                   | O que faz                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| `path`                  | Pasta do projeto ou `.xcodeproj`; o padrão é a pasta atual                      |
| `-f, --format <format>` | `tty` (padrão), `text`, `markdown` ou `json`                                    |
| `--json`                | O mesmo que `--format json`                                                     |
| `-o, --output <file>`   | Grava o relatório em um arquivo em vez de no terminal                           |
| `-l, --labels <ids>`    | Verifica só estes selos, separados por vírgula (padrão: os nove)                |
| `-s, --summary`         | Só a tabela de selos e o veredito (formatos de terminal e texto)                |
| `--fail-on <severity>`  | `warning` (padrão), `error`, `info` ou `none`: quando o código de saída é 1     |
| `--no-color`            | Texto simples mesmo em um terminal (`NO_COLOR` e `FORCE_COLOR` são respeitados) |

IDs de selo: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Códigos de saída: `0` nada no nível de `--fail-on` ou acima, `1` achados nesse nível ou acima, `2` argumentos
inválidos, nenhum projeto iOS encontrado ou um erro inesperado. Quando o Info.plist ou o projeto do Xcode que
decide o Dark Interface não pode ser lido, esse selo fica "not known" e o código de saída também é `1`, a menos
que se use `--fail-on none`.

O a11ylabel encontra o app iOS sozinho: um `.xcodeproj` na raiz ou uma pasta abaixo para apps nativos, `ios/`
para apps Flutter, React Native e Expo (`example/ios/` para um plugin Flutter). Ele lê o Info.plist (XML ou
binário) e os build settings de cada target de app iOS, os conjuntos de cores dos asset catalogs, os arquivos
Swift e Objective-C do app, o JavaScript e o TypeScript de um app React Native ou Expo e os arquivos Dart em
`lib/`, ignorando dependências, saída de build e testes. Um app Expo sem `ios/` é verificado pela configuração.

### Verifique só os selos que você declara

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

A tabela, os achados e o código de saída passam a cobrir só esses selos, então o CI falha quando uma mudança
quebraria um selo que você exibe na App Store.

### Guarde um relatório em Markdown junto com o código

```sh
a11ylabel --format markdown --output accessibility.md
```

O relatório informa as versões do a11ylabel e dos dados de regras e a data em que as fontes foram lidas, e lista
para cada selo o que só uma pessoa pode conferir: um registro datado do que o código mostrava.

### Use o relatório JSON em scripts

```sh
a11ylabel --json > a11ylabel.json
```

Cada selo tem `id`, `name`, `status`, `coverage`, `criteria`, `counts` e `signals`; cada achado tem `rule`,
`labels`, `severity`, `title`, `message`, `file`, `line`, `target`, o `fix` com seus passos e seu guia, e
`sources`. O formato é `schemaVersion` 0 e pode mudar antes da 1.0.
[examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) o filtra com `jq`.

### Execute no CI

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml) verifica os selos que um app
declara em cada pull request que mexe no app, adiciona o relatório ao resumo do job e faz o job falhar em caso
de warning. `--fail-on error` só falha quando um selo está blocked.

### A partir do JavaScript

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Uma versão executável é [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs).

## Demonstração

As gravações de terminal vêm da CLI nos [fixtures](fixtures/README.md), projetos feitos com cada toolchain:

| Projeto                                                      | Gravação                                                                                                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| App SwiftUI, tabela de selos (`--summary`)                   | topo desta página                                                                                                                                   |
| O mesmo app, Larger Text e Dark Interface com suas correções | [claro](docs/media/demo-swiftui-light.svg) · [escuro](docs/media/demo-swiftui-dark.svg)                                                             |
| O mesmo app depois das correções                             | [claro](docs/media/demo-ready-light.svg) · [escuro](docs/media/demo-ready-dark.svg)                                                                 |
| App Flutter 3.47.5 com escala de texto limitada              | [claro](docs/media/demo-flutter-light.svg) · [escuro](docs/media/demo-flutter-dark.svg)                                                             |
| App React Native 0.88.1                                      | [claro](docs/media/demo-react-native-light.svg) · [escuro](docs/media/demo-react-native-dark.svg)                                                   |
| `scripts/simulator-compare.sh` nos dois apps SwiftUI         | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

Medido em 28 de outubro de 2026 em um Mac (Apple silicon, M5 Max) com Node.js 26.12.1: cinco rodadas de
três séries de 100 execuções de `node dist/cli/main.js --json` sobre os sete fixtures, incluindo a
inicialização do Node.js. Os fixtures estavam no cache de arquivos (execuções a quente). As medianas das
15 séries foram de 0,11 a 0,12 segundo. Execuções isoladas variam mais: a mais lenta de cada rodada levou
de 0,15 a 0,38 segundo. Um projeto SwiftUI gerado com 5.000 arquivos (33,4 MB de Swift, 10.000 achados,
dos quais 200 listados) levou de 1,05 a 1,11 segundo em três execuções, com no máximo 230 MB (220 MiB)
de memória.

## Status

| Recurso                                                                                               | Status        |
| ----------------------------------------------------------------------------------------------------- | ------------- |
| Detecção de projetos nativos, Flutter (app e exemplo de plugin), React Native e Expo                  | funciona      |
| Os nove selos com um status cada; A11Y101 a A11Y601                                                   | funciona      |
| Relatórios de terminal, texto, Markdown e JSON; códigos de saída `--labels`, `--summary`, `--fail-on` | funciona      |
| Build settings do `.xcconfig` e as fontes de pacotes Swift locais                                     | planejado (0.2) |
| Saída SARIF e uma GitHub Action                                                                       | planejado (0.3) |
| Razões de contraste a partir de pares de cores no código e nos asset catalogs                         | planejado (0.4) |
| Árvores de sintaxe de Swift, Dart e TypeScript em vez de padrões                                      | planejado (0.5) |
| Esquema de regras e layout JSON estáveis                                                              | planejado (1.0) |

## Limitações

- **O código, não o app em execução.** A Apple pede que toda tarefa comum funcione com o recurso ativado; o
  a11ylabel não sabe quais tarefas são comuns nem como as telas aparecem. "No blocker found" significa que
  nenhuma das suas regras correspondeu, não que o selo possa ser declarado.
- **Padrões, não um compilador.** As regras são expressões regulares e pareamento de parênteses sobre texto de
  código-fonte cujos comentários e strings foram apagados. Código gerado, envolvido em componentes seus (um
  `MyText` que desliga a escala), montado em tempo de execução ou escrito de forma incomum pode passar
  despercebido ou ser reconhecido por engano.
- **Só as fontes do próprio app.** Pods, pacotes Swift fora da pasta do app, `node_modules` e plugins do Flutter
  não são lidos; de `node_modules`, só o `package.json` dos pacotes cuja versão o a11ylabel informa.
- **Build settings só do project.pbxproj.** Arquivos `.xcconfig` não são lidos. Quando o Info.plist de um target
  ou o projeto do Xcode não pode ser lido, o Dark Interface fica "not known" e o relatório diz por quê.
- **Configuração do Expo como texto.** `app.config.js` e `app.config.ts` não são executados, então um
  `userInterfaceStyle` definido por uma variável ou por um config plugin não é visto.
- **Entrada limitada.** Um projeto pode vir de um pull request, então o a11ylabel lê no máximo 32 MB por arquivo
  de projeto e, das fontes, 4 MB por arquivo, 20.000 arquivos e 128 MB no total, e no máximo 5.000 conjuntos
  de cores; o que fica de fora é listado nas notas do relatório. Plists e arquivos JSON podem ter até 64
  níveis de aninhamento.
- **Saída limitada.** Um relatório lista no máximo 20 achados de uma regra por arquivo e 100 por projeto,
  ou seja, 1.700 no máximo. Os achados acima desses limites continuam contados nos totais de cada rótulo e
  no resumo, e uma nota informa quantos de cada regra ficaram de fora.
  Nomes e valores do projeto, como nomes de target, versões e valores do Info.plist, são cortados em 200 caracteres.

## Documentação

Referência da API e guias: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Guias

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Fontes

Lidas em 28 de outubro de 2026:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)
  e os critérios de avaliação de cada selo, ligados a partir do relatório e de
  [rules/nutrition-labels.json](rules/nutrition-labels.json) com as páginas de API que cada regra cita.
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

Node.js 22.12 ou posterior em macOS, Linux ou Windows. Ler um projeto não exige mais nada: nem Xcode, nem a
toolchain do Flutter ou do React Native. Os scripts do Simulator precisam de um Mac com Xcode, XcodeGen, Flutter
(para o fixture do Flutter) e ImageMagick.

## Arquitetura

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- Os dados das regras ficam separados do código e têm versão (`nutrition-labels@2026.10.28`); os testes falham
  quando uma regra não tem fonte ou liga para uma seção de guia que não existe.
- A CLI (`src/cli/`) só interpreta argumentos, escolhe cores e larguras e define o código de saída.

## Projetos relacionados

O [glassready](https://github.com/muhittincamdali/glassready) mostra o que o Liquid Glass muda em um app
compilado com o SDK do iOS 27, e o [sdkbump](https://github.com/muhittincamdali/sdkbump) mostra se ele vai
ser lançado. O a11ylabel responde quem consegue usá-lo.

## Perguntas frequentes

**O a11ylabel diz "no blocker found" para Larger Text. Posso declarar o selo?** Não só com isso. Significa que
nenhuma das regras encontrou algo; declare o selo quando as tarefas comuns funcionarem no maior tamanho de
texto, sem texto sobreposto nem cortado, como descrevem os critérios da Apple.

**Todo warning A11Y102 ou A11Y401 é um problema?** Não. Um rótulo de barra de abas que continua pequeno é aceitável
para a Apple quando há outra forma de lê-lo, como o Large Content Viewer, e um botão pode receber seu rótulo de
um jeito que o a11ylabel não vê. Olhe o ponto com o recurso ativado e decida.

**O a11ylabel altera meu projeto?** Não. Ele o lê e grava só o relatório que você pede.

## Como contribuir

Contribuições são bem-vindas: leia o [CONTRIBUTING.md](CONTRIBUTING.md) e o
[código de conduta](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) antes de abrir um
pull request, e relate problemas de segurança como descrito no [SECURITY.md](SECURITY.md).

## Licença

Publicado sob a licença MIT. Veja [LICENSE](LICENSE).
