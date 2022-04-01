import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { TailwindProvider } from 'tailwind-rn';

import Routes from '@/main/routes/index';
import utilities from '@/presentation/shared/styles/tailwind.json';

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <Routes />
        </TailwindProvider>
      </NavigationContainer>
    </>
  );
}
