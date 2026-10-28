/**
 * Courier: today's deliveries.
 *
 * @format
 */

import { useEffect, useRef } from 'react';
import {
  Animated,
  Appearance,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// The brand colours were only designed for a light background.
Appearance.setColorScheme('light');

type Delivery = { id: string; place: string; eta: string };

const deliveries: Delivery[] = [
  { id: '1', place: '14 Harbour Street', eta: '09:40' },
  { id: '2', place: 'Unit 3, Mill Lane', eta: '10:15' },
  { id: '3', place: 'The Old Bakery', eta: '11:05' },
];

function LivePulse() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    ).start();
  }, [opacity]);
  return <Animated.View style={[styles.pulse, { opacity }]} />;
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title} maxFontSizeMultiplier={1.2}>
        Courier
      </Text>
      <LivePulse />
      <Pressable onPress={() => {}} style={styles.iconButton}>
        <Image source={require('./assets/search.png')} style={styles.icon} />
      </Pressable>
    </View>
  );
}

function DeliveryRow({ item }: { item: Delivery }) {
  return (
    <View style={styles.row}>
      <Text style={styles.place}>{item.place}</Text>
      <Text style={styles.eta} allowFontScaling={false}>
        {item.eta}
      </Text>
      <Pressable accessibilityLabel="Call courier button" onPress={() => {}}>
        <Image source={require('./assets/phone.png')} style={styles.icon} />
      </Pressable>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        <Header />
        <FlatList
          data={deliveries}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DeliveryRow item={item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
  title: { flex: 1, fontSize: 28, fontWeight: '700', color: '#111111' },
  pulse: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1E8E3E' },
  iconButton: { padding: 8 },
  icon: { width: 24, height: 24 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  place: { flex: 1, fontSize: 17, color: '#111111' },
  eta: { fontSize: 15, color: '#6B6B6B' },
});

export default App;
