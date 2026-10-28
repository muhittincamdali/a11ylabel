import { infoPlist, minimalPbxproj, tree } from './tree.js';

/** A native app with the given Info.plist body and sources, in a new temporary folder. */
export function nativeApp(plist = '', sources: Record<string, string> = {}): string {
  return tree({
    'App.xcodeproj/project.pbxproj': minimalPbxproj(),
    'App/Info.plist': infoPlist(plist),
    ...Object.fromEntries(Object.entries(sources).map(([name, text]) => [`App/${name}`, text])),
  });
}

export const LIGHT = '\t<key>UIUserInterfaceStyle</key>\n\t<string>Light</string>';

/** A SwiftUI app with nothing a11ylabel reports: text styles, a labelled button, no motion. */
export const CLEAN_VIEW = `import SwiftUI
@main
struct CleanApp: App {
    var body: some Scene {
        WindowGroup {
            VStack {
                Text("Orders").font(.title)
                Button("Refresh", action: {})
            }
        }
    }
}
`;
