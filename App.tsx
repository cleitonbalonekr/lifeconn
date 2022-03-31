import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

import Routes from '@/main/routes/index';

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}
