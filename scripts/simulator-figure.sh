#!/bin/bash
# Puts simulator screenshots side by side for the README and the guides (needs ImageMagick).
#
#   scripts/simulator-figure.sh <output.png> <screenshot.png>...
#
# Each screenshot is scaled to 300 pixels wide; they are joined left to right with a 24-pixel gap
# on the light background of the repository kit (#EAF4FF). The screenshots come from
# scripts/simulator-check.sh and scripts/simulator-compare.sh.
set -euo pipefail

output="${1:?usage: scripts/simulator-figure.sh <output.png> <screenshot.png>...}"
shift
[ "$#" -gt 0 ] || { echo "no screenshots given" >&2; exit 2; }

magick "$@" -resize 300x -bordercolor '#EAF4FF' -border 12 +append \
  -bordercolor '#EAF4FF' -border 12 -strip -define png:compression-level=9 "$output"
echo "${output}: $(magick identify -format '%w x %h' "$output")"
