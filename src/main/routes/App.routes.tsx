/* eslint-disable no-unused-vars */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';

import {
  MakeContacts,
  MakeCreateContacts
} from '@/main/factories/pages/contacts';
import { MakeHome, MakeHelpSomeoneElse } from '@/main/factories/pages/home';
import { MakeNotifications } from '@/main/factories/pages/notification';
import { MakeSettings } from '@/main/factories/pages/settings';

export type AppStackParamList = {
  Home: undefined;
  HelpSomeoneElse: undefined;
  Settings: undefined;
  Notifications: undefined;
  Contacts: undefined;
  CreateContacts: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: tailwind('bg-red-400')
      }}
    >
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
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Configurações'
        }}
        name="Settings"
        component={MakeSettings}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Notificações'
        }}
        name="Notifications"
        component={MakeNotifications}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Contatos'
        }}
        name="Contacts"
        component={MakeContacts}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Adicionar contato'
        }}
        name="CreateContacts"
        component={MakeCreateContacts}
      />
    </Stack.Navigator>
  );
}
