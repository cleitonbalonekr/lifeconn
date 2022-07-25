/* eslint-disable no-unused-vars */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';

import { Call } from '@/domain/models/Call';
import { MakeChat } from '@/main/factories/pages/chat';
import {
  MakeContacts,
  MakeCreateContacts,
  MakeDetailsContact
} from '@/main/factories/pages/contacts';
import { MakeDonate } from '@/main/factories/pages/donate';
import { MakeEvent, MakeCreateEvent } from '@/main/factories/pages/event';
import { MakeGuides } from '@/main/factories/pages/guides';
import {
  MakeHome,
  MakeHelpSomeoneElse,
  MakeTerm
} from '@/main/factories/pages/home';
import {
  MakeNotifications,
  MakeDetailsNotification
} from '@/main/factories/pages/notification';
import {
  MakeSettings,
  MakeMedicalInfo,
  MakeMonitorImpact,
  MakeAdvanced
} from '@/main/factories/pages/settings';

export type AppStackParamList = {
  Home: undefined;
  HelpSomeoneElse: undefined;
  Term: undefined;
  Settings: undefined;
  Advanced: undefined;
  MedicalInfo: undefined;
  MonitorImpact: undefined;
  Notifications: undefined;
  DetailsNotification: { notification: Call };
  Contacts: undefined;
  CreateContacts: undefined;
  SharedContact: undefined;
  DetailsContact: { phoneNumber: string; nickname: string };
  Donate: undefined;
  Guides: undefined;
  DetailsFirstAid: undefined;
  DetailsBasicMechanics: undefined;
  Event: {
    fromHelpSomeoneElse: boolean;
    victim?: {
      fullName: string;
      phoneNumber: string;
    };
  };
  CreateEvent: {
    token: string;
  };
  Chat: {
    callId: string;
  };
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
        headerStyle: tailwind('bg-red-400 text-white font-ubuntu'),
        headerTitleStyle: tailwind('font-ubuntu text-black')
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
          headerShown: false
        }}
        name="Term"
        component={MakeTerm}
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
          title: 'Avançado'
        }}
        name="Advanced"
        component={MakeAdvanced}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Informações médicas'
        }}
        name="MedicalInfo"
        component={MakeMedicalInfo}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="MonitorImpact"
        component={MakeMonitorImpact}
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
          title: 'Detalhes'
        }}
        name="DetailsNotification"
        component={MakeDetailsNotification}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Pessoas Próximas'
        }}
        name="Contacts"
        component={MakeContacts}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Adicionar pessoa Próxima'
        }}
        name="CreateContacts"
        component={MakeCreateContacts}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Detalhes'
        }}
        name="DetailsContact"
        component={MakeDetailsContact}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Doação'
        }}
        name="Donate"
        component={MakeDonate}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Guia'
        }}
        name="Guides"
        component={MakeGuides}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Solicitar ajuda'
        }}
        name="Event"
        component={MakeEvent}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="CreateEvent"
        component={MakeCreateEvent}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mensagens'
        }}
        name="Chat"
        component={MakeChat}
      />
    </Stack.Navigator>
  );
}
