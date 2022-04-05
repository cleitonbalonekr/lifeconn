/* eslint-disable no-unused-vars */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MakeHome, MakeHelpSomeoneElse } from '@/main/factories/pages/home';

type AppStackParamList = {
  Home: undefined;
  HelpSomeoneElse: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Home"
        component={MakeHome}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="HelpSomeoneElse"
        component={MakeHelpSomeoneElse}
      />
    </Stack.Navigator>
  );
}
