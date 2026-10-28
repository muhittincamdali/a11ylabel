# Contributing to a11ylabel

Thanks for taking the time to improve a11ylabel. The
[shared contributing guide](https://github.com/muhittincamdali/.github/blob/main/CONTRIBUTING.md)
applies (small fixes as a pull request, larger changes as an issue first, security issues through
[SECURITY.md](SECURITY.md), the
[code of conduct](https://github.com/muhittincamdali/.github/blob/main/CODE_OF_CONDUCT.md) for
everyone). This file adds what is specific to this repository.

## Set up

Node.js 22.12 or later, then:

```sh
git clone https://github.com/muhittincamdali/a11ylabel.git
cd a11ylabel
npm ci
npm test          # builds dist/ first, then runs every test
```

CI runs `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` on Node.js 22 and 24;
if they pass locally they pass on your pull request. Tests read only files in the repository and
write only to `.test-work/`; they need neither the network nor Xcode.

| Command                                                          | What it does                                                                                                                |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                                   | Biome (code) and Prettier (formatting); `npm run format` fixes formatting                                                   |
| `npm run typecheck`                                              | TypeScript in strict mode over `src/`, `test/` and `scripts/`                                                               |
| `npm test`                                                       | Unit, integration, snapshot and end-to-end tests                                                                            |
| `npm run demo`                                                   | Records the terminal SVGs in `docs/media/` from the CLI                                                                     |
| `npm run docs`                                                   | Builds the documentation site into `site/` (run `npm ci --prefix docs/site` once first)                                     |
| `npm run smoke`                                                  | Packs the package, installs the tarball and runs it                                                                         |
| `node scripts/rule-schema.ts`                                    | Writes `rules/schema.json` from the zod schema of the rule data                                                             |
| `scripts/simulator-check.sh <fixture> <png> [size] [appearance]` | Mac with Xcode and XcodeGen (or Flutter): builds a fixture, launches it with a text size and appearance, takes a screenshot |
| `scripts/simulator-compare.sh <fixture> [27.0]`                  | Same at the default size in light and at AX5 in Dark Mode, and measures the change                                          |

## Where things live

- `src/detect/`: what kind of project a folder holds and the package versions that matter.
- `src/collect/`: readers for Info.plist (XML and binary), project.pbxproj, asset catalog colours
  and source files with comments and strings blanked. No rule logic here.
- `src/core/syntax.ts`: bracket matching, call arguments and JSX elements, in linear time.
- `src/rules/`: one file per label group (`larger-text.ts`, `dark-interface.ts`, `motion.ts`,
  `labels.ts`, `media.ts`), `check.ts` that runs them, and the data loader (`data.ts`).
- `rules/nutrition-labels.json`: the labels, what each rule says, with sources and fixes.
- `src/scan.ts`: findings, the status of each label and the verdict.
- `src/report/`: terminal, Markdown and JSON output. `src/cli/`: arguments and exit codes.
- `fixtures/`: real projects; [fixtures/README.md](fixtures/README.md) says how each was made.

## Tests

- A bug fix starts with a test that fails without it. A false positive or a missed finding is
  best reported with the smallest code that shows it; the rule tests in `test/unit/` take a source
  string, and `test/helpers/tree.ts` builds a small project in `.test-work/`.
- Fixture reports are recorded in `test/__snapshots__/fixtures`. When output changes on purpose,
  run `npm test -- -u`, read the diff, and run `npm run demo` if the terminal output changed.
- `test/integration/fixtures.test.ts` lists the expected findings of each fixture; change that
  list deliberately, never to make a run pass.

## Adding to the rule data

Every rule in `rules/nutrition-labels.json` needs at least one https source that says what the rule
says, in the publisher's own words: Apple's documentation and App Store Connect Help, or React
Native's, React's, Expo's, Flutter's or Reanimated's pages. A behaviour you saw in the simulator goes into a guide with how to reproduce it,
labelled with the simulator runtime and the Xcode build. Bump `dataVersion` to the date of your
change, and run `node scripts/rule-schema.ts` when the schema changes.

## Wording

a11ylabel reports what it can show. It never says a label can be claimed: "no blocker found" is
as far as code goes. Do not write that a screen "breaks" unless a source or a recorded run says
so, say "simulator" when a result is from the simulator, and keep planned features marked as
planned. The hygiene check in CI rejects unverifiable superlatives.

## Commits and pull requests

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `docs:`,
`test:`, `refactor:`, `build:`, `ci:`, `chore:`), one topic per pull request, and an entry under
"Unreleased" in [CHANGELOG.md](CHANGELOG.md) for anything a user would notice.

Every change reaches `main` through a pull request whose CI checks pass. The branches up to the
0.1.0 release, from `build/package-setup` to `chore/release-0.1.0`, were merged locally on 28
October 2026 before the repository was first pushed, so they have no pull request or CI run; that
history is kept as it is rather than rewritten.

## Releases

Maintainers bump `version` in `package.json`, move the "Unreleased" entries under the new version
in `CHANGELOG.md`, and push a `v<version>` tag. The release workflow checks, packs and publishes;
see the comment at the top of `.github/workflows/release.yml`.

## License

By contributing, you agree that your contributions are licensed under the [MIT license](LICENSE).
