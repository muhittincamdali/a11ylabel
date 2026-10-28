import AVKit
import SwiftUI

struct RecipeView: View {
    @State private var player = AVPlayer()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                VideoPlayer(player: player)
                    .frame(height: 200)
                Text("Weeknight dal")
                    .font(.title)
                Text("Rinse the lentils, then simmer them with turmeric and cumin for twenty minutes.")
                    .font(.custom("Georgia", fixedSize: 16))
            }
            .padding()
        }
        .navigationTitle("Recipe")
    }
}
