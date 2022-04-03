import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MakeHome } from '@/main/factories/pages/home';

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
}
