#!/bin/bash
# Launches a fixture twice on the same simulator, as most people see it (default text size, light
# appearance) and as someone who needs the Larger Text and Dark Interface labels sets it up (the
# largest accessibility text size, AX5, in Dark Mode), and measures what changed. Needs
# ImageMagick (brew install imagemagick).
#
#   scripts/simulator-compare.sh <fixture> [runtime] [output-folder]
#
# Two numbers come out, both over the screen above the home indicator (the bottom 60 pixels
# animate and are left out):
#
# - brightness: the mean of the greyscale screenshot, 0 (black) to 1 (white). A screen that
#   follows Dark Mode gets much darker; one with UIUserInterfaceStyle Light stays where it was.
# - changed: the share of pixels that differ by more than 2% between the two screenshots. Text
#   that grows to AX5 moves almost every row; text capped at xLarge moves little.
#
# The screenshots go to <output-folder>/<fixture>-<runtime>-{default,ax5-dark}.png (default
# folder: .simulator-work/screenshots). This is how docs/media/simulator/*.txt were recorded.
set -euo pipefail
# Numbers with a decimal point, whatever the locale of the Mac.
export LC_ALL=C

fixture="${1:?usage: scripts/simulator-compare.sh <fixture> [runtime] [output-folder]}"
version="${2:-27.0}"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="${3:-$root/.simulator-work/screenshots}"
mkdir -p "$out"
before="$out/$fixture-$version-default.png"
after="$out/$fixture-$version-ax5-dark.png"

"$root/scripts/simulator-check.sh" "$fixture" "$before" large light "$version"
echo
"$root/scripts/simulator-check.sh" "$fixture" "$after" accessibility-extra-extra-extra-large dark "$version"
echo
width="$(magick identify -format '%w' "$before")"
height="$(magick identify -format '%h' "$before")"
area="${width}x$((height - 60))+0+0"
brightness() { magick "$1" -crop "$area" +repage -colorspace gray -format '%[fx:mean]' info:; }
changed="$(magick compare -precision 16 -metric AE -fuzz 2% \
  \( "$before" -crop "$area" +repage \) \( "$after" -crop "$area" +repage \) null: 2>&1 |
  cut -d' ' -f1 || true)"
total=$((width * (height - 60)))
printf 'compared:   %s x %s pixels above the home indicator, 2%% tolerance\n' "$width" "$((height - 60))"
printf 'brightness: %.2f at the default size in light, %.2f at AX5 in Dark Mode\n' \
  "$(brightness "$before")" "$(brightness "$after")"
printf 'changed:    %s of %s pixels (%s%%)\n' "$changed" "$total" "$(awk -v c="$changed" -v t="$total" 'BEGIN { printf "%.0f", c * 100 / t }')"
