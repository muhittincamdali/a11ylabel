import 'package:flutter/material.dart';

void main() => runApp(const TideApp());

class TideApp extends StatelessWidget {
  const TideApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tide',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0B6E99)),
      ),
      // Long harbour names wrapped badly at large text sizes.
      builder: (context, child) => MediaQuery.withClampedTextScaling(
        maxScaleFactor: 1.3,
        child: child!,
      ),
      home: const TidesPage(),
    );
  }
}

class Tide {
  const Tide(this.place, this.time, this.height);

  final String place;
  final String time;
  final String height;
}

const tides = [
  Tide('Kingsbridge Quay', 'High water 06:42', '4.8 m'),
  Tide('Salcombe Harbour', 'High water 06:51', '5.1 m'),
  Tide('Dartmouth', 'Low water 13:05', '0.9 m'),
];

class TidesPage extends StatefulWidget {
  const TidesPage({super.key});

  @override
  State<TidesPage> createState() => _TidesPageState();
}

class _TidesPageState extends State<TidesPage> with SingleTickerProviderStateMixin {
  late final AnimationController _wave = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 2),
  )..repeat(reverse: true);

  @override
  void dispose() {
    _wave.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.disableAnimationsOf(context)) _wave.stop();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tide'),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: () {}),
          IconButton(
            icon: const Icon(Icons.settings),
            tooltip: 'Settings',
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(24),
            child: RotationTransition(
              turns: Tween(begin: -0.02, end: 0.02).animate(_wave),
              child: const Icon(Icons.waves, size: 64, color: Color(0xFF0B6E99)),
            ),
          ),
          for (final tide in tides)
            ListTile(
              title: Text(tide.place),
              subtitle: Text(tide.time),
              trailing: Text(tide.height, textScaler: TextScaler.noScaling),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.notification_add),
      ),
    );
  }
}
