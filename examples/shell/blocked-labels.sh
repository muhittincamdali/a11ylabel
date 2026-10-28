#!/bin/sh
# Lists the labels the code blocks, each with the errors that block it, as
# "Label: file:line message", so a release script can stop or open the files. Needs jq.
#
#   sh examples/shell/blocked-labels.sh [project folder]
#
# Prints nothing when no label is blocked. Inside this repository it runs the build in dist/;
# elsewhere set A11YLABEL to the command you run a11ylabel with (for example "a11ylabel" once it
# is installed from Homebrew or the GitHub release).
set -eu
project="${1:-.}"
here="$(cd "$(dirname "$0")" && pwd)"
a11ylabel="${A11YLABEL:-node $here/../../dist/cli/main.js}"
$a11ylabel "$project" --json --fail-on none |
  jq -r '. as $report
    | .labels[]
    | select(.status == "blocked")
    | . as $label
    | $report.findings[]
    | select(.severity == "error" and (.labels | index($label.id)))
    | "\($label.name): \(.file)\(if .line then ":\(.line)" else "" end) \(.message)"'
