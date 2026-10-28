/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Kept from the React Native 0.72 version of the app; React 19 no longer applies it to Text.
Text.defaultProps = { ...Text.defaultProps, allowFontScaling: false };

AppRegistry.registerComponent(appName, () => App);
