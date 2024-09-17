import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from './src/global/fonts';
import { colors } from './src/global/colors';
import MainNavigator from './src/navigation/MainNavigator';
import { store } from './src/app/store';
import { Provider } from 'react-redux';

export default function App() {
  const [fontsLoaded, error] = useFonts(fonts);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error loading fonts: {error.message}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
      <StatusBar style="light" backgroundColor={colors.background} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
