<!-- i18n-source: README.md@2725a7403253e305cfe7775804e3f897218bb327 status=reviewed -->
<!-- brand:start -->

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/banner-light.svg" alt="a11ylabel: Shows which App Store accessibility labels an iOS, Flutter or React Native app can claim, and what blocks each one."></picture></p>

<!-- lang-selector:start -->
<p align="center"><a href="README.md">English</a> · <a href="README.tr.md">Türkçe</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.es.md">Español</a> · <a href="README.de.md">Deutsch</a> · <a href="README.fr.md">Français</a> · <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.ru.md">Русский</a></p>
<!-- lang-selector:end -->

<p align="center">
<a href="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml"><img src="https://github.com/muhittincamdali/a11ylabel/actions/workflows/ci.yml/badge.svg" alt="CI durumu"></a>
<a href="https://github.com/muhittincamdali/a11ylabel/releases"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-version-light.svg" alt="Son sürüm: v0.1.0"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/package.json"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-language-light.svg" alt="Dil sürümü: Node.js 22.12+"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/badge-license-light.svg" alt="Lisans: MIT"></picture></a>
</p>

<p align="center">
<a href="#hızlı-başlangıç"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-start-tr-light.svg" alt="Başlayın"></picture></a>
<a href="https://muhittincamdali.github.io/a11ylabel/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-docs-tr-light.svg" alt="Dokümantasyon"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/docs/guides"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-guides-tr-light.svg" alt="Rehberler"></picture></a>
<a href="https://github.com/muhittincamdali/a11ylabel/tree/main/examples"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-tr-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-tr-light.svg"><img src="https://raw.githubusercontent.com/muhittincamdali/a11ylabel/main/.github/brand/button-examples-tr-light.svg" alt="Örnekler"></picture></a>
</p>

> Bu belge İngilizce README'nin çevirisidir. İkisi arasında fark varsa güncel olan İngilizce sürümdür.

<!-- brand:end -->

App Store Connect her uygulamaya, dokuz Accessibility Nutrition Label'dan hangisini desteklediğini sorar:
bugün isteğe bağlıdır ve Apple yeni uygulamalar ile güncellemeler için zorunlu olacağını söylüyor
(28 Ekim 2026 itibarıyla bir tarih verilmemişti). a11ylabel, yerel bir iOS, Flutter veya React
Native/Expo projesini okur ve her etiket için kodda onu şimdiden engelleyen bir şey olup olmadığını,
nelerin gözden geçirilmesi gerektiğini ve yalnızca bir insanın kontrol edebileceği şeyleri gösterir;
her bulgunun düzeltmesini ve arkasındaki Apple sayfasını da verir. Projenizin dosyalarını okur;
hiçbir şeyi derlemez, çalıştırmaz veya değiştirmez.

<picture><source media="(prefers-color-scheme: dark)" srcset="docs/media/demo-summary-dark.svg"><source media="(prefers-color-scheme: light)" srcset="docs/media/demo-summary-light.svg"><img src="docs/media/demo-summary-light.svg" alt="Bir SwiftUI uygulamasında a11ylabel --summary: VoiceOver, Voice Control ve Reduced Motion gözden geçirilecek, Larger Text ve Dark Interface blocked, dört etiket elle kontrol edilecek; 2 error, 6 warning, 4 info"></picture>

<sub>Gerçek CLI'dan kaydedildi; kaynak, testler için yazılmış bir SwiftUI uygulaması olan
<a href="fixtures/native-swiftui-blocked">native-swiftui-blocked
fixture</a> (<code>npm run demo</code>).</sub>

## Öne çıkanlar

- **Dokuz etiket için tek tablo.** VoiceOver, Voice Control, Larger Text, Dark Interface,
  Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions ve Audio
  Descriptions; her biri **blocked**, **review**, **no blocker found** veya **check by hand**
  durumunda ve Apple'ın değerlendirme ölçütlerine bağlantılı.
- **Bir etiketi tüm uygulama için engelleyen şeyi bulur.** Info.plist, bir build setting veya Expo
  yapılandırmasındaki Light `UIUserInterfaceStyle` (anahtar yoksa Expo açık görünüm kullanır);
  `Text.defaultProps`, bir Flutter `MaterialApp.builder`, bir SwiftUI sahnesi veya bir UIKit
  penceresinde kilitlenmiş metin ölçeklemesi.
- **Gözden geçirilecek yerleri de.** Ölçeklenmeyen veya %200'ün altında duran metinler, sabit font
  boyutları, etiketsiz yalnızca simgeli düğmeler, Reduce Motion'ı hiç okumayan kodda sonsuz, parallax
  ve otomatik oynayan hareket, bir de iOS'un hiç ayarlamadığı Flutter denetimi.
- **Platformları bilir.** React Native 0.78 ve sonrası `Text.defaultProps` değerini yok sayar
  (React 19); bu yüzden a11ylabel orada bunu bildirmez. Flutter'ın `disableAnimations` değeri iOS
  Reduce Motion'ı izlemez; Reanimated varsayılan olarak izler.
- **Her kuralın bir kaynağı var.** Kurallar veridir ([rules/nutrition-labels.json](rules/nutrition-labels.json))
  ve Apple'ın, React Native'in, Expo'nun, Flutter'ın ve Reanimated'ın kendi sayfalarını gösterir;
  bir kuralın kaynağı yoksa testler başarısız olur.
- **Simulator'da denendi.** iOS 27.0'da Dark Mode'da en büyük metin boyutunda, blocked fixture sınırlı
  metinle açık kalır; düzeltilmiş olan koyu olur ve metin AX5'tir.
- **CI için yapıldı.** `--labels` yalnızca talep ettiğiniz etiketleri denetler; terminal, düz metin,
  Markdown ve JSON raporları; çıkış kodu 0 temiz, 1 bulgu var, 2 kullanım hatası.

## Hızlı başlangıç

**1. a11ylabel'ı kurun.** Node.js'i de kuran [Homebrew](https://brew.sh/) ile:

```sh
brew install muhittincamdali/tap/a11ylabel
```

Ya da [GitHub release](https://github.com/muhittincamdali/a11ylabel/releases/tag/v0.1.0) üzerinden
npm ile; bunun için [Node.js](https://nodejs.org/) 22.12 veya üstü gerekir (`node --version` sürümü
gösterir):

```sh
npm i -g https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

Paket henüz npm registry'de değil; `@mcamdali/a11ylabel` adıyla oraya yayımlamak planlanıyor. İki
komut da aynı release tarball'unu kurar.

**2. Uygulamanızın klasöründe bir terminal açın**, yani `.xcodeproj`, `pubspec.yaml` veya
`package.json` dosyasının bulunduğu klasörde:

```sh
cd path/to/YourApp
```

**3. a11ylabel'ı çalıştırın:**

```sh
a11ylabel
```

**4. En üstteki tabloyu okuyun.** **blocked** bir etiketin, tüm uygulama için onu durduran bir
error'ı vardır: önce onu düzeltin. **review**, yaygın bir görevi engelleyebilecek yerleri listeler;
her birine özelliği açıkken bakın. **check by hand** etiketleri, kodun göstermediği tasarıma veya
medyaya bağlıdır. Her bulgu, düzeltmesini "How to fix" listesinden belirtir;
[Before you claim a label](docs/guides/claiming-labels.md) gerisini adım adım anlatır.

## a11ylabel neleri denetler

Apple'ın [genel bakışı](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
bir uygulamanın etiketi talep etmeden önce, özellik açıkken insanların uygulamanın tüm yaygın
görevlerini tamamlayabilmesini ister. Kod, onları durduran şeylerin bir kısmını gösterebilir:

| Etiket                            | Kodda  | a11ylabel neye bakar                                                                                                                               |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| VoiceOver                         | kısmen | Etiketsiz yalnızca simgeli düğmeler; denetim türünü söyleyen etiketler                                                                             |
| Voice Control                     | kısmen | Gösterilecek ve söylenecek adı olmayan yalnızca simgeli düğmeler                                                                                   |
| Larger Text                       | evet   | Uygulama veya tek bir görünüm için kapatılmış ya da %200'ün altında sınırlanmış ölçekleme; sabit font boyutları                                    |
| Dark Interface                    | evet   | Info.plist'te, build setting'lerde, Expo yapılandırmasında veya kodda zorlanmış açık görünüm; Flutter `darkTheme` yok; koyu değeri olmayan renkler |
| Differentiate Without Color Alone | hayır  | Hiçbir şey: bir tasarım meselesi                                                                                                                   |
| Sufficient Contrast               | ipucu  | Yüksek kontrast değeri olmayan asset renkleri                                                                                                      |
| Reduced Motion                    | evet   | Reduce Motion'ın okunmadığı sonsuz, dönen, parallax ve otomatik oynayan hareket                                                                    |
| Captions                          | ipucu  | Uygulamanın video oynatıp oynatmadığı                                                                                                              |
| Audio Descriptions                | ipucu  | Uygulamanın video oynatıp oynatmadığı                                                                                                              |

| Kural   | Severity | Bulgu                                                                                | Kod                             |
| ------- | -------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| A11Y101 | error    | Tüm uygulama için kilitlenmiş metin boyutu (%200'ün altında)                         | tümü                            |
| A11Y102 | warning  | Ölçeklenmeyen tek bir metin veya görünüm                                             | tümü                            |
| A11Y103 | warning  | %200'ün altında sınırlanmış tek bir metin veya görünüm                               | tümü                            |
| A11Y104 | warning  | Sabit bir punto: `.system(size:)`, `Font.custom(_:fixedSize:)`, `UIFont(name:size:)` | SwiftUI, UIKit                  |
| A11Y201 | error    | Tüm uygulama için zorlanmış açık görünüm, koyuya geçmenin bir yolu yok               | Info.plist, build setting, Expo |
| A11Y202 | info     | Varsayılan olarak açık, uygulama içi bir ayarla koyu                                 | Info.plist, build setting, Expo |
| A11Y203 | warning  | Kodda ayarlanmış açık renk şeması                                                    | tümü                            |
| A11Y204 | warning  | `darkTheme` olmayan bir `MaterialApp`                                                | Flutter                         |
| A11Y205 | info     | Koyu varyantı olmayan asset renkleri                                                 | asset catalog                   |
| A11Y301 | warning  | Reduce Motion'ı hiç okumayan bir uygulamada hareket                                  | tümü                            |
| A11Y302 | info     | Reduce Motion'ı okumayan bir dosyada hareket                                         | tümü                            |
| A11Y303 | warning  | Flutter'ın okuduğu `disableAnimations`, iOS Reduce Motion tarafından ayarlanmaz      | Flutter                         |
| A11Y304 | warning  | `ReduceMotion.Never` olarak ayarlanmış bir Reanimated animasyonu                     | React Native, Expo              |
| A11Y401 | warning  | Erişilebilirlik etiketi olmayan yalnızca simgeli düğme                               | tümü                            |
| A11Y402 | info     | Denetim türünü söyleyen erişilebilirlik etiketi                                      | tümü                            |
| A11Y501 | info     | Yüksek kontrast varyantı olmayan asset renkleri                                      | asset catalog                   |
| A11Y601 | info     | Uygulama video oynatıyor                                                             | tümü                            |

Kural verisi `nutrition-labels@2026.10.28`, kaynakları 28 Ekim 2026'da okundu. Bir error etiketi
engeller; bir warning etiketi "review" yapar; info bulguları bir etiketin durumunu hiçbir zaman
değiştirmez.

## Simulator ne gösteriyor

Aynı SwiftUI uygulaması düzeltmelerden önce ve sonra; Xcode 27.1 (iOS 27.1 SDK) ile derlendi ve
iOS 27.0 yüklü bir iPhone 17 simulator'ında önce varsayılan metin boyutunda açık görünümde, sonra
en büyük erişilebilirlik boyutunda (AX5) Dark Mode'da çalıştırıldı
([nasıl](fixtures/README.md#what-the-simulator-shows)):

<p align="center"><img src="docs/media/simulator/pantry-default-and-ax5-dark.png" width="720" alt="iOS 27.0 yüklü bir iPhone 17 simulator'ında Pantry uygulaması. Soldan: native-swiftui-blocked varsayılan boyutta açık görünümde, aynısı AX5 ve Dark Mode'da (hâlâ açık, metin pek büyümemiş), native-swiftui-ready varsayılan boyutta ve AX5 ile Dark Mode'da (koyu, büyük metin, miktarlar adların altında)"></p>

| Fixture (iOS 27.0 Simulator) | Parlaklık, varsayılan → AX5 Dark Mode | Değişen piksel | a11ylabel                             |
| ---------------------------- | ------------------------------------- | -------------- | ------------------------------------- |
| native-swiftui-blocked       | 0,97 → 0,97                           | %7             | Larger Text ve Dark Interface blocked |
| native-swiftui-ready         | 0,97 → 0,57                           | %99            | engel yok                             |

Parlaklık, ana ekran göstergesinin üstündeki gri tonlamalı ekran görüntüsünün ortalamasıdır (0 siyah,
1 beyaz); kayıtlar [docs/media/simulator](docs/media/simulator) içindedir. Aynı ayarlarda
[Flutter fixture](docs/media/simulator/flutter-tide-ax5-dark.png) (`darkTheme` yok) açık kalır ve
metni %130'dadır.

## Kurulum

Hızlı başlangıçtaki komutlar, `a11ylabel` komutunu GitHub release'ten kurar. Her
[GitHub release](https://github.com/muhittincamdali/a11ylabel/releases), paketi
`a11ylabel-<version>.tgz` olarak bir `SHA256SUMS` dosyasıyla birlikte sunar. Bir projede release
sabitlemek için:

```sh
npm install --save-dev https://github.com/muhittincamdali/a11ylabel/releases/download/v0.1.0/a11ylabel-0.1.0.tgz
```

`npx a11ylabel` bundan sonra o kopyayı çalıştırır. Paket `@mcamdali/a11ylabel` adıyla kurulur; aşağıdaki
JavaScript API'sinin içe aktardığı ad budur. npm registry'ye yayımlamak planlanıyor; o zamana kadar
`npx @mcamdali/a11ylabel` paketi bulamaz.

## Kullanım

```text
a11ylabel [path] [options]
```

| Seçenek                 | Ne yapar                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `path`                  | Proje klasörü veya `.xcodeproj`; varsayılan geçerli klasördür                         |
| `-f, --format <format>` | `tty` (varsayılan), `text`, `markdown` veya `json`                                    |
| `--json`                | `--format json` ile aynı                                                              |
| `-o, --output <file>`   | Raporu terminal yerine bir dosyaya yazar                                              |
| `-l, --labels <ids>`    | Yalnızca bu etiketleri denetler, virgülle ayrılmış (varsayılan: dokuzu da)            |
| `-s, --summary`         | Yalnızca etiket tablosu ve sonuç (terminal ve text biçimlerinde)                      |
| `--fail-on <severity>`  | `warning` (varsayılan), `error`, `info` veya `none`: çıkış kodunun ne zaman 1 olacağı |
| `--no-color`            | Terminalde bile düz metin (`NO_COLOR` ve `FORCE_COLOR` dikkate alınır)                |

Etiket kimlikleri: `voiceover`, `voice-control`, `larger-text`, `dark-interface`,
`differentiate-without-color`, `sufficient-contrast`, `reduced-motion`, `captions`,
`audio-descriptions`.

Çıkış kodları: `0` `--fail-on` düzeyinde veya üstünde bir şey yok, `1` bu düzeyde veya üstünde
bulgu var, `2` hatalı argümanlar, iOS projesi bulunamadı ya da beklenmeyen bir hata. Dark Interface'e
karar veren Info.plist veya Xcode projesi okunamadığında o etiket "not known" olur ve `--fail-on none`
kullanılmadıkça çıkış kodu yine `1` olur.

a11ylabel iOS uygulamasını kendisi bulur: yerel uygulamalar için kökte veya bir klasör aşağıda bir
`.xcodeproj`, Flutter, React Native ve Expo uygulamaları için `ios/` (bir Flutter plugin'i için
`example/ios/`). Her iOS uygulama hedefinin Info.plist dosyasını (XML veya binary) ve build
setting'lerini, asset catalog'larının renk kümelerini, uygulamanın Swift ve Objective-C dosyalarını,
bir React Native veya Expo uygulamasının JavaScript ve TypeScript kodunu ve `lib/` içindeki Dart
dosyalarını okur; bağımlılıkları, build çıktısını ve testleri atlar. `ios/` klasörü olmayan bir Expo
uygulaması yapılandırmasından denetlenir.

### Yalnızca talep ettiğiniz etiketleri denetleyin

```sh
a11ylabel --labels larger-text,dark-interface,reduced-motion
```

Tablo, bulgular ve çıkış kodu bundan sonra yalnızca bu etiketleri kapsar; böylece bir değişiklik App
Store'da gösterdiğiniz bir etiketi bozacaksa CI başarısız olur.

### Markdown raporunu kodla birlikte saklayın

```sh
a11ylabel --format markdown --output accessibility.md
```

Rapor, a11ylabel ve kural verisi sürümlerini ile kaynakların okunduğu tarihi belirtir ve her etiket
için yalnızca bir insanın kontrol edebileceği şeyleri listeler: kodun o gün gösterdiğinin tarihli
kaydı.

### JSON raporunu betiklerde kullanın

```sh
a11ylabel --json > a11ylabel.json
```

Her etiketin `id`, `name`, `status`, `coverage`, `criteria`, `counts` ve `signals` alanları vardır;
her bulgunun `rule`, `labels`, `severity`, `title`, `message`, `file`, `line`, `target`, adımlarıyla
ve rehberiyle `fix` ve `sources` alanları vardır. Şema `schemaVersion` 0'dır ve 1.0'dan önce
değişebilir. [examples/shell/blocked-labels.sh](examples/shell/blocked-labels.sh) bunu `jq` ile
süzer.

### CI'da çalıştırın

[examples/github-actions/a11ylabel.yml](examples/github-actions/a11ylabel.yml), uygulamaya dokunan
her pull request'te uygulamanın talep ettiği etiketleri denetler, raporu job özetine ekler ve
warning'lerde job'u başarısız yapar. `--fail-on error` yalnızca bir etiket blocked olduğunda
başarısız yapar.

### JavaScript'ten

```js
import { render, scan } from '@mcamdali/a11ylabel';

const report = await scan('path/to/app', { labels: ['larger-text', 'dark-interface'] });
for (const label of report.labels) console.log(label.name, label.status);
console.log(render(report, 'markdown'));
```

Çalıştırılabilir bir sürümü [examples/api/label-matrix.mjs](examples/api/label-matrix.mjs) dosyasıdır.

## Demo

Terminal kayıtları, her biri farklı bir araç zinciriyle yapılmış projeler olan
[fixture'lar](fixtures/README.md) üzerinde CLI'dan alınmıştır:

| Proje                                                         | Kayıt                                                                                                                                               |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| SwiftUI uygulaması, etiket tablosu (`--summary`)              | bu sayfanın en üstü                                                                                                                                 |
| Aynı uygulama, Larger Text ve Dark Interface ile düzeltmeleri | [açık](docs/media/demo-swiftui-light.svg) · [koyu](docs/media/demo-swiftui-dark.svg)                                                                |
| Düzeltmelerden sonra aynı uygulama                            | [açık](docs/media/demo-ready-light.svg) · [koyu](docs/media/demo-ready-dark.svg)                                                                    |
| Metin ölçeği sınırlanmış Flutter 3.47.5 uygulaması            | [açık](docs/media/demo-flutter-light.svg) · [koyu](docs/media/demo-flutter-dark.svg)                                                                |
| React Native 0.88.1 uygulaması                                | [açık](docs/media/demo-react-native-light.svg) · [koyu](docs/media/demo-react-native-dark.svg)                                                      |
| İki SwiftUI uygulamasında `scripts/simulator-compare.sh`      | [blocked](docs/media/demo-simulator-native-swiftui-blocked-27.0-light.svg) · [ready](docs/media/demo-simulator-native-swiftui-ready-27.0-light.svg) |

28 Ekim 2026'da Node.js 26.12.1 ile bir Mac'te (Apple silicon, M5 Max) ölçüldü: yedi fixture üzerinde
`node dist/cli/main.js --json` komutunun 100'er çalıştırmalık üç seti, Node.js başlangıcı dahil. Üç
setin medyanları 0,12, 0,12 ve 0,12 saniyeydi; en yavaş çalıştırma 0,17 saniye sürdü. 5.000 dosyalık
(33,4 MB Swift, 10.000 bulgu, 200'ü listelenir) üretilmiş bir SwiftUI projesi üç çalıştırmada 1,13 ile 1,21 saniye
sürdü; bellek kullanımı en çok 217 MB'tı.

## Durum

| Özellik                                                                                        | Durum         |
| ---------------------------------------------------------------------------------------------- | ------------- |
| Yerel, Flutter (uygulama ve plugin örneği), React Native ve Expo proje algılama                | çalışıyor     |
| Her birinin durumu olan dokuz etiket; A11Y101 – A11Y601                                        | çalışıyor     |
| Terminal, text, Markdown ve JSON raporları; `--labels`, `--summary`, `--fail-on` çıkış kodları | çalışıyor     |
| `.xcconfig` build setting'leri ve yerel Swift paketlerinin kaynakları                          | planlanıyor (0.2) |
| SARIF çıktısı ve bir GitHub Action                                                             | planlanıyor (0.3) |
| Koddaki ve asset catalog'lardaki renk çiftlerinden kontrast oranları                           | planlanıyor (0.4) |
| Desenler yerine Swift, Dart ve TypeScript sözdizimi ağaçları                                   | planlanıyor (0.5) |
| Kararlı kural şeması ve JSON yapısı                                                            | planlanıyor (1.0) |

## Sınırlar

- **Kod, çalışan uygulama değil.** Apple, özellik açıkken her yaygın görevin çalışmasını ister;
  a11ylabel hangi görevlerin yaygın olduğunu ya da ekranların nasıl göründüğünü bilemez. "No blocker
  found", kurallarından hiçbirinin eşleşmediği anlamına gelir; etiketin talep edilebileceği
  anlamına gelmez.
- **Derleyici değil, desenler.** Kurallar, yorumları ve string'leri boşaltılmış kaynak metin üzerinde
  çalışan düzenli ifadeler ve parantez eşlemesidir. Üretilmiş, kendi bileşenlerinize sarılmış (ölçeklemeyi
  kapatan bir `MyText` gibi), çalışma zamanında oluşturulmuş veya alışılmadık biçimde yazılmış kod
  gözden kaçabilir ya da yanlışlıkla eşleşebilir.
- **Yalnızca uygulamanın kendi kaynakları.** Pod'lar, uygulama klasörünün dışındaki Swift paketleri,
  `node_modules` ve Flutter plugin'leri okunmaz; `node_modules` içinden yalnızca a11ylabel'ın sürümünü
  bildirdiği paketlerin `package.json` dosyası okunur.
- **Build setting'ler yalnızca project.pbxproj'dan.** `.xcconfig` dosyaları okunmaz. Bir hedefin
  Info.plist dosyası veya Xcode projesi okunamadığında Dark Interface "not known" olur ve rapor
  nedenini söyler.
- **Expo yapılandırması metin olarak.** `app.config.js` ve `app.config.ts` çalıştırılmaz; bu yüzden bir
  değişken veya config plugin üzerinden ayarlanan `userInterfaceStyle` görülmez.
- **Sınırlı girdi.** Bir proje bir pull request'ten gelebilir; bu yüzden a11ylabel proje dosyası başına
  en çok 32 MB, kaynaklardan ise dosya başına 4 MB, toplamda 20.000 dosya ve 128 MB okur, ayrıca en
  çok 5.000 renk kümesi okur; dışarıda bıraktıkları raporun notlarında listelenir. Plist ve JSON
  dosyaları en çok 64 düzey iç içe olabilir.
- **Sınırlı çıktı.** Bir rapor, bir kuralın bulgularından dosya başına en çok 20, proje başına en çok
  100 tane listeler; yani en çok 1.700 bulgu. Bu sınırları aşan bulgular etiket sayılarında ve özette
  yine sayılır; her kuraldan kaç bulgunun listelenmediğini bir not söyler.

## Dokümantasyon

API başvurusu ve rehberler: [muhittincamdali.github.io/a11ylabel](https://muhittincamdali.github.io/a11ylabel/).

## Rehberler

- [Before you claim a label](docs/guides/claiming-labels.md)
- [Larger Text](docs/guides/larger-text.md)
- [Dark Interface](docs/guides/dark-interface.md)
- [Reduced Motion](docs/guides/reduced-motion.md)
- [VoiceOver and Voice Control](docs/guides/voiceover.md)
- [Contrast, colour and media](docs/guides/contrast-color-media.md)

## Kaynaklar

28 Ekim 2026'da okundu:

- Apple, App Store Connect Help: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels)
  ve her etiketin değerlendirme ölçütleri; rapordan ve her kuralın andığı API sayfalarıyla birlikte
  [rules/nutrition-labels.json](rules/nutrition-labels.json) dosyasından bağlantılıdır.
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

## Gereksinimler

macOS, Linux veya Windows üzerinde Node.js 22.12 veya üstü. Bir projeyi okumak için başka hiçbir şey
gerekmez: Xcode, Flutter ya da React Native araç zinciri gerekmez. Simulator betikleri için Xcode,
XcodeGen, Flutter (Flutter fixture'ı için) ve ImageMagick kurulu bir Mac gerekir.

## Mimari

```text
detectProject      native | flutter | react-native | expo, the iOS folder, package versions
  ─► collectApp    app targets, Info.plist files, build settings, asset colours, blanked sources
  ─► checkApp      A11Y1xx Larger Text · A11Y2xx Dark Interface · A11Y3xx Reduced Motion
                   A11Y4xx VoiceOver and Voice Control · A11Y5xx contrast · A11Y6xx media
                   rules/nutrition-labels.json: labels, rules, fixes, sources (validated with zod)
  ─► scan          findings, a status per label, verdict, signals
  ─► render        tty | text | markdown | json
```

- Kural verisi koddan ayrıdır ve sürümlüdür (`nutrition-labels@2026.10.28`); bir kuralın kaynağı yoksa
  ya da var olmayan bir rehber bölümüne bağlanıyorsa testler başarısız olur.
- CLI (`src/cli/`) yalnızca argümanları ayrıştırır, renkleri ve genişlikleri seçer ve çıkış kodunu belirler.

## İlgili projeler

[glassready](https://github.com/muhittincamdali/glassready), iOS 27 SDK ile derlenen bir uygulamada
Liquid Glass'ın neyi değiştirdiğini, [sdkbump](https://github.com/muhittincamdali/sdkbump) ise
uygulamanın yayına çıkıp çıkamayacağını gösterir. a11ylabel, onu kimin kullanabileceğini yanıtlar.

## SSS

**a11ylabel, Larger Text için "no blocker found" diyor. Etiketi talep edebilir miyim?** Yalnızca buna
dayanarak hayır. Bu, kurallardan hiçbirinin bir şey bulmadığı anlamına gelir; etiketi, Apple'ın
ölçütlerinin anlattığı gibi, yaygın görevler en büyük metin boyutunda metin üst üste binmeden ve
kesilmeden çalıştığında talep edin.

**Her A11Y102 veya A11Y401 warning'i bir sorun mu?** Hayır. Küçük kalan bir tab bar etiketi, Large
Content Viewer gibi okunabileceği başka bir yol olduğunda Apple için kabul edilebilir; bir düğme de
etiketini a11ylabel'ın göremediği bir yolla alıyor olabilir. Yere özellik açıkken bakın ve karar verin.

**a11ylabel projemi değiştirir mi?** Hayır. Projeyi okur ve yalnızca istediğiniz raporu yazar.

## Katkıda bulunma

Katkılarınızı bekliyoruz: pull request açmadan önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını ve
[davranış kurallarını](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) okuyun;
güvenlik sorunlarını [SECURITY.md](SECURITY.md) dosyasında anlatıldığı gibi bildirin.

## Lisans

MIT lisansıyla yayımlanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
