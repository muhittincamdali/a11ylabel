import UIKit

final class BalanceViewController: UIViewController {
    private let titleLabel = UILabel()
    private let amountLabel = UILabel()
    private let card = UIView()
    private let hideButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Ledger"
        view.backgroundColor = .systemGroupedBackground

        titleLabel.text = "Available balance"
        titleLabel.font = .preferredFont(forTextStyle: .subheadline)
        titleLabel.adjustsFontForContentSizeCategory = true

        amountLabel.text = "€2,418.60"
        amountLabel.font = .systemFont(ofSize: 34, weight: .bold)
        amountLabel.adjustsFontForContentSizeCategory = false

        hideButton.setImage(UIImage(systemName: "eye.slash"), for: .normal)
        hideButton.addTarget(self, action: #selector(toggleAmount), for: .touchUpInside)

        card.backgroundColor = .secondarySystemGroupedBackground
        card.layer.cornerRadius = 16
        // The card tilts with the device.
        let tilt = UIInterpolatingMotionEffect(keyPath: "center.x", type: .tiltAlongHorizontalAxis)
        tilt.minimumRelativeValue = -12
        tilt.maximumRelativeValue = 12
        card.addMotionEffect(tilt)

        let stack = UIStackView(arrangedSubviews: [titleLabel, amountLabel, hideButton])
        stack.axis = .vertical
        stack.spacing = 8
        stack.translatesAutoresizingMaskIntoConstraints = false
        card.translatesAutoresizingMaskIntoConstraints = false
        card.addSubview(stack)
        view.addSubview(card)
        NSLayoutConstraint.activate([
            card.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
            card.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
            card.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
            stack.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 16),
            stack.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -16),
            stack.topAnchor.constraint(equalTo: card.topAnchor, constant: 16),
            stack.bottomAnchor.constraint(equalTo: card.bottomAnchor, constant: -16),
        ])

        let export = UIBarButtonItem(
            image: UIImage(systemName: "square.and.arrow.up"),
            style: .plain,
            target: self,
            action: #selector(exportStatement)
        )
        let tutorial = UIBarButtonItem(
            image: UIImage(systemName: "play.rectangle"),
            style: .plain,
            target: self,
            action: #selector(showTutorial)
        )
        tutorial.accessibilityLabel = "Tutorial video"
        navigationItem.rightBarButtonItems = [export, tutorial]
        tabBarItem.accessibilityLabel = "Balance tab"
    }

    @objc private func toggleAmount() {
        amountLabel.isHidden.toggle()
    }

    @objc private func exportStatement() {}

    @objc private func showTutorial() {
        navigationController?.pushViewController(TutorialViewController(), animated: true)
    }
}
