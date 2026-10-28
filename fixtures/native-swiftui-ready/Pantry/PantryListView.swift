import SwiftUI

struct PantryItem: Identifiable {
    let id = UUID()
    let name: String
    let quantity: String
}

struct PantryListView: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @State private var items = [
        PantryItem(name: "Oat milk", quantity: "2 cartons"),
        PantryItem(name: "Basmati rice", quantity: "1 kg"),
        PantryItem(name: "Chickpeas", quantity: "3 tins"),
        PantryItem(name: "Red lentils", quantity: "500 g"),
    ]
    @State private var syncing = true

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(items) { item in
                        // At accessibility sizes the quantity moves under the name instead of
                        // being squeezed next to it.
                        let layout = dynamicTypeSize.isAccessibilitySize
                            ? AnyLayout(VStackLayout(alignment: .leading))
                            : AnyLayout(HStackLayout())
                        layout {
                            Text(item.name)
                                .font(.headline)
                            Spacer()
                            Text(item.quantity)
                                .font(.subheadline)
                                .foregroundStyle(Color("Muted"))
                        }
                        .listRowBackground(Color("Card"))
                        .swipeActions {
                            Button(role: .destructive) {
                                remove(item)
                            } label: {
                                Label("Delete", systemImage: "trash")
                            }
                        }
                    }
                } header: {
                    HStack {
                        Text("In stock")
                        Circle()
                            .fill(Color("Brand"))
                            .frame(width: 8, height: 8)
                            .opacity(syncing ? 0.2 : 1)
                            .animation(
                                reduceMotion ? nil : .easeInOut(duration: 0.8).repeatForever(),
                                value: syncing
                            )
                    }
                }
                Section("Recipes") {
                    NavigationLink("Weeknight dal") { RecipeView() }
                }
            }
            .navigationTitle("Pantry")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button(action: showFilters) {
                        Image("Filter")
                    }
                    .accessibilityLabel("Filters")
                }
                ToolbarItem(placement: .primaryAction) {
                    Button(action: add) { Label("Add item", systemImage: "plus") }
                }
            }
            .onAppear { syncing = false }
        }
    }

    private func add() {
        items.append(PantryItem(name: "Tahini", quantity: "1 jar"))
    }

    private func remove(_ item: PantryItem) {
        items.removeAll { $0.id == item.id }
    }

    private func showFilters() {}
}
