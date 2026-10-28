# Security policy

## Supported versions

Security fixes are made for the latest release of each project. If you are on an older version,
the fix will be in a new release and the upgrade notes will say if anything changes for you.

## Reporting a vulnerability

Please report vulnerabilities privately, not in a public issue, pull request or discussion.

1. **Preferred:** open the repository's **Security** tab and choose
   **Report a vulnerability** ([how private reporting works](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately)).
2. **Or** email [muhittincamdali@gmail.com](mailto:muhittincamdali@gmail.com) with
   "Security" in the subject.

Include what you can of the following:

- the affected repository and version (tag or commit),
- what an attacker can do and under which conditions,
- steps or a small project that reproduces it,
- any fix or mitigation you already have in mind.

## What happens next

- You get a reply within 7 days confirming that the report arrived.
- I confirm the issue, work on a fix and agree a disclosure date with you. Fixes are released as
  soon as they are ready, together with a GitHub security advisory.
- You are credited in the advisory unless you prefer not to be.

Please give a reasonable amount of time to fix the issue before disclosing it publicly.

## Scope for a11ylabel

a11ylabel reads files of the project you point it at (project.pbxproj, Info.plist files, the
Contents.json of asset catalog colour sets, Swift, Objective-C, JavaScript, TypeScript and Dart
sources, package.json, package-lock.json, app.json, app.config.js/ts as text, pubspec.yaml and
.fvmrc, and the package.json of the packages it lists in node_modules) and writes only the report
you ask for with `--output`. It makes no network requests and never runs project code. Reports
that fit this policy include, for example: a crafted project file that makes a11ylabel write outside
the `--output` file, run code, hang or exhaust memory, or print terminal escape sequences,
Markdown links or report lines of its own from file names or values in the project. Every report
replaces control and bidirectional characters in them with U+FFFD; the terminal and text reports
replace line breaks too, so a file name with a newline stays on the line of its finding.

The project you check may come from a pull request, so a11ylabel limits what it reads: 32 MB per
project file; for sources 4 MB per file, 20,000 files and 128 MB in total; 5,000 colour sets;
100,000 values per binary plist, whose strings and data together may not decode to more bytes
than the file holds, and 64 levels of nesting per plist or JSON file. Files over a limit are
skipped with a note in the report. A report lists at most 20 findings of a rule per file and 100
per project; the rest are counted, not listed, so a file with a finding on every line cannot make
the output grow with it. Names and values from the project (target names, versions, build
setting and Info.plist values) are cut to 200 characters in the report. Sources are read only
from folders that, with symbolic links resolved, are inside the project; a source folder such as
`lib/` that links out of it is skipped with a note. A file under these limits that still takes much longer or much more memory than a
real project of its size is in scope.
