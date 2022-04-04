import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Toast from 'react-native-toast-message';
import { TailwindProvider } from 'tailwind-rn';

import Routes from '@/main/routes/index';
import { AuthProvider } from '@/presentation/shared/context/auth';
import utilities from '@/presentation/shared/styles/tailwind.json';

export default function App() {
  return (
    <>
      <StatusBar />
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
