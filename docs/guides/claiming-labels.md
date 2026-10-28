# Before you claim a label

Accessibility Nutrition Labels appear on an app's App Store product page on devices running iOS 26,
iPadOS 26, macOS 26, tvOS 26, visionOS 26 and watchOS 26 or later. App Store Connect asks for them
per device. Apple's [overview](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels)
says that providing them "will be voluntary to start", and that "over time, you'll be required to
share accessibility support details to submit new apps and app updates". On 28 October 2026 that
page gave no date for the requirement.

To claim a label, people must be able to complete all of the app's common tasks with the feature
on: the primary functions, plus first launch, sign-in, purchase and settings. App Review can ask a
developer to change labels that look misleading (App Review Guideline 2.3).

## Where a11ylabel fits

a11ylabel reads the project, not the running app. It finds what in the code stops a label for the
whole app (an error), what may stop a task (a warning), and what it cannot see (a manual check).
It does not replace the evaluation Apple describes; it tells you what to fix before you start it,
and keeps it from silently breaking afterwards.

1. **Run it on the app.**

   ```sh
   a11ylabel path/to/YourApp
   ```

2. **Fix the errors first.** A blocked label cannot be claimed until its error is gone: a forced
   light appearance, text locked below 200% for the whole app. Then look at each warning at the
   largest text size, in Dark Mode, with Reduce Motion and with VoiceOver on.

3. **Test the common tasks by hand.** For each device and each label you want to claim, go through
   the tasks with the feature on. Apple suggests a matrix of tasks by feature. The Markdown report
   lists, for every label, what only a person can check:

   ```sh
   a11ylabel --format markdown --output accessibility.md
   ```

4. **Set the labels in App Store Connect** (App Accessibility, per device), and the accessibility
   URL if you have a page about it.

5. **Keep them true in CI.** Check only the labels you claim, so a change that would break one
   fails the pull request:

   ```sh
   a11ylabel --labels larger-text,dark-interface,reduced-motion
   ```

   [examples/github-actions/a11ylabel.yml](../../examples/github-actions/a11ylabel.yml) runs this
   and puts the Markdown report in the job summary.

## A record of what was checked

The Markdown report names the a11ylabel version, the rule data version and the date its sources
were read, the label table and every finding with its source. Kept with the code (for example
`accessibility.md` per release), it records what the code showed on that day.

In the European Union, the [European Accessibility Act](https://eur-lex.europa.eu/eli/dir/2019/882/oj)
(Directive (EU) 2019/882) applies to services such as e-commerce and consumer banking from 28 June
2025 (Article 31). a11ylabel does not assess conformity with that directive or with any standard,
and its report is not a legal statement. It can be one piece of the evidence an accessibility
review collects.

## Sources

- Apple: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels),
  [Manage Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels),
  and the evaluation criteria of each label (linked from the report).
- European Union: [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj).
