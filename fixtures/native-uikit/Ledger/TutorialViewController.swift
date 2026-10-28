import AVKit
import UIKit

final class TutorialViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Tutorial"
        view.backgroundColor = .systemBackground
        let player = AVPlayerViewController()
        addChild(player)
        player.view.frame = view.bounds
        view.addSubview(player.view)
        player.didMove(toParent: self)
    }
}
