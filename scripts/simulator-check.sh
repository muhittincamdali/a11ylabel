#!/bin/bash
# Builds one of the fixtures with the installed Xcode, launches it on an iOS simulator with the
# given text size and appearance, and takes a screenshot. This is how the screenshots in
# docs/media/simulator were recorded; it needs macOS, Xcode with an iOS simulator runtime, and
# XcodeGen (native fixtures) or Flutter (FLUTTER names the flutter command, default `flutter`).
#
#   scripts/simulator-check.sh <fixture> <screenshot.png> [text-size] [appearance] [runtime]
#
#   text-size   a `simctl ui content_size` value: large (the default size) or
#               accessibility-extra-extra-extra-large (AX5, the largest)
#   appearance  light or dark
#   runtime     iOS runtime version of the simulator, e.g. 27.0 (default)
#
# The fixture itself is never changed: the build runs on a copy in .simulator-work/ (ignored by
# git). It creates (once) and boots a simulator named "a11ylabel-iPhone-17-<runtime>", so it never
# touches your other simulators, and resets its text size and appearance when it is done.
set -euo pipefail

usage="usage: scripts/simulator-check.sh <fixture> <screenshot.png> [text-size] [appearance] [runtime]"
fixture="${1:?$usage}"
screenshot="${2:?$usage}"
size="${3:-large}"
appearance="${4:-light}"
version="${5:-27.0}"
root="$(cd "$(dirname "$0")/.." && pwd)"
dir="$root/fixtures/$fixture"
[ -f "$dir/project.yml" ] || [ -f "$dir/pubspec.yaml" ] ||
  { echo "fixtures/$fixture has no project.yml or pubspec.yaml" >&2; exit 2; }
case "$screenshot" in /*) ;; *) screenshot="$PWD/$screenshot" ;; esac

runtime="com.apple.CoreSimulator.SimRuntime.iOS-${version//./-}"
name="a11ylabel-iPhone-17-$version"
udid="$(xcrun simctl list devices -j | node -e '
  const [name] = process.argv.slice(1);
  const devices = Object.values(JSON.parse(require("fs").readFileSync(0, "utf8")).devices).flat();
  const found = devices.find((device) => device.name === name && device.isAvailable);
  process.stdout.write(found ? found.udid : "");' "$name")"
if [ -z "$udid" ]; then
  udid="$(xcrun simctl create "$name" com.apple.CoreSimulator.SimDeviceType.iPhone-17 "$runtime")"
fi
xcrun simctl boot "$udid" 2> /dev/null || true
xcrun simctl bootstatus "$udid" -b > /dev/null
# The same status bar on every screenshot: 9:41, full battery and signal.
xcrun simctl status_bar "$udid" override --time 9:41 --batteryState charged --batteryLevel 100 \
  --cellularBars 4 --wifiBars 3 > /dev/null 2>&1 || true
reset() {
  xcrun simctl ui "$udid" content_size large > /dev/null 2>&1 || true
  xcrun simctl ui "$udid" appearance light > /dev/null 2>&1 || true
}
trap reset EXIT

work="$root/.simulator-work/$fixture"
mkdir -p "$work"
find "$work" -mindepth 1 -maxdepth 1 ! -name dd ! -name build -exec rm -rf {} +
cp -R "$dir/." "$work/"
if [ -f "$work/pubspec.yaml" ]; then
  (cd "$work" && "${FLUTTER:-flutter}" build ios --simulator --debug > "$work/build.log" 2>&1) || true
  app="$(find "$work" -type d -name Runner.app -path '*iphonesimulator*' | head -1)"
  [ -n "$app" ] || { tail -20 "$work/build.log"; exit 1; }
else
  (cd "$work" && xcodegen generate --quiet)
  project="$(cd "$work" && ls -d ./*.xcodeproj | head -1)"
  scheme="$(basename "$project" .xcodeproj)"
  xcodebuild -project "$work/$project" -scheme "$scheme" -destination "id=$udid" \
    -derivedDataPath "$work/dd" build > "$work/build.log" 2>&1 || { tail -20 "$work/build.log"; exit 1; }
  app="$(find "$work/dd/Build/Products" -maxdepth 2 -name '*.app' | head -1)"
fi
bundle="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "$app/Info.plist")"
sdk="$(/usr/libexec/PlistBuddy -c 'Print :DTSDKName' "$app/Info.plist")"
style="$(/usr/libexec/PlistBuddy -c 'Print :UIUserInterfaceStyle' "$app/Info.plist" 2> /dev/null || echo 'not set')"

xcrun simctl ui "$udid" content_size "$size"
xcrun simctl ui "$udid" appearance "$appearance"
echo "fixture:    fixtures/$fixture"
echo "built with: $(xcodebuild -version | head -1) ($(xcodebuild -version | tail -1 | sed 's/Build version //')), SDK $sdk"
echo "simulator:  iPhone 17, iOS $version, text size $size, $appearance appearance"
echo "Info.plist: UIUserInterfaceStyle = $style in the built app"
xcrun simctl uninstall "$udid" "$bundle" 2> /dev/null || true
xcrun simctl install "$udid" "$app"
xcrun simctl launch --terminate-running-process "$udid" "$bundle" > /dev/null
sleep "${SETTLE_SECONDS:-4}"
xcrun simctl io "$udid" screenshot "$screenshot" > /dev/null 2>&1
echo "screenshot: ${screenshot#"$root/"}"
xcrun simctl terminate "$udid" "$bundle" 2> /dev/null || true
