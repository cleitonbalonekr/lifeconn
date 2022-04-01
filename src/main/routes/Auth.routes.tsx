import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MakeLogin } from '@/main/factories/pages/identification';

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Login"
        component={MakeLogin}
      />
    </Stack.Navigator>
  );
}
