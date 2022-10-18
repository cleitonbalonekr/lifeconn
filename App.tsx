/* eslint-disable camelcase */
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold
} from '@expo-google-fonts/ubuntu';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import { TailwindProvider } from 'tailwind-rn';
import '@/configs/firebase';
import 'react-native-get-random-values';

import Routes from '@/main/routes/index';
import { AuthProvider } from '@/presentation/shared/context/auth';
import utilities from '@/presentation/shared/styles/tailwind.json';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar translucent />
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </TailwindProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
}
