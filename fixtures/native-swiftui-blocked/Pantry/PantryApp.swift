import SwiftUI

@main
struct PantryApp: App {
    var body: some Scene {
        WindowGroup {
            PantryListView()
                // Keeps every row on one line, whatever text size people choose.
                .dynamicTypeSize(...DynamicTypeSize.xLarge)
        }
    }
}
