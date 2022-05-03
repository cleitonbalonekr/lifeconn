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
import { useEffect } from 'react';
import * as React from 'react';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { TailwindProvider } from 'tailwind-rn';
import '@/configs/firebase';
import 'react-native-get-random-values';

import { MakeSubscribeToNotifications } from '@/main/factories/services/notification/subscribeToNotificationsFactory';
import Routes from '@/main/routes/index';
import { AuthProvider } from '@/presentation/shared/context/auth';
import { SubscribeToBackgroundServices } from '@/presentation/shared/services/backgroundServices';
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

  LogBox.ignoreLogs([
    'Setting a timer for a long period of time, i.e. multiple minutes, is a'
  ]);
  return (
    <>
      <StatusBar translucent />
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <AuthProvider>
            <SubscribeToBackgroundServices />
            <MakeSubscribeToNotifications />
            <Routes />
          </AuthProvider>
        </TailwindProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
}
