import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Linking from 'expo-linking';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { AuthUser } from '@/domain/models';
import { Call } from '@/domain/models/Call';
import { EventStatus } from '@/domain/models/CallEvent';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import MedicalInfoElse from '../components/MedicalInfoElse';

const NO_LOCATION = 'Não informado';

const DetailsNotification: React.FC = () => {
  const tailwind = useTailwind();
  const { showError } = useFeedbackMessage();
  const route = useRoute();
  const { notification } = route.params as { notification: Call };
  const user = notification.userId as AuthUser;
  const { location } = notification;

  function handleOpenMaps() {
    if (location) {
      const url = `https://www.google.pt/maps?q=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    } else {
      showError('Localização não informada.');
    }
  }
  function getNotificationStatus() {
    switch (notification.lastEvent?.status) {
      case EventStatus.AUTHOR_CANCELLED:
        return 'Criado pela vítima';
      case EventStatus.ORG_VIEWED:
        return 'Visualizado';
      case EventStatus.ORG_ANSWERED:
        return 'Atendido';
      default: {
        return 'Status desconhecido';
      }
    }
  }
  function formatDate() {
    return format(new Date(notification.createdAt), 'dd/MM/yyyy  HH:mm', {
      locale: ptBR
    });
  }

  return (
    <Container scroll>
      <View
        style={tailwind(
          'flex flex-row justify-between border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-3')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text
          numberOfLines={2}
          style={tailwind('text-lg  px-2 font-ubuntu w-40')}
        >
          {user.fullName}
        </Text>
        <Text style={tailwind('text-center px-2 font-ubuntu')}>
          {getNotificationStatus()}
        </Text>
      </View>
      <View style={tailwind('flex-1 border-b border-gray-300')}>
        <Input label="Email" editable value={user.email} />
        <Input label="Telefone" editable value={user.phoneNumber} />
        <View style={tailwind('flex-row flex-1 justify-around')}>
          <View style={tailwind('flex-1  mr-1')}>
            <Input label="Data de criação" editable value={formatDate()} />
          </View>
          <View style={tailwind('flex-1  ml-1')}>
            <Input label="Token" editable value={notification.token} />
          </View>
        </View>
        <View style={tailwind('flex-row flex-1 justify-around')}>
          <View style={tailwind('flex-1  mr-1')}>
            <Input
              editable
              label="Latitude"
              value={String(location?.latitude || NO_LOCATION)}
            />
          </View>
          <View style={tailwind('flex-1 ml-1')}>
            <Input
              editable
              label="Longitude"
              value={String(location?.longitude || NO_LOCATION)}
            />
          </View>
        </View>
      </View>
      <View style={tailwind('flex-1 py-4')}>
        <Text style={tailwind('text-lg font-ubuntu')}>Informações médicas</Text>
        <FlatList
          data={user.medicalData}
          style={tailwind('mt-4')}
          contentContainerStyle={tailwind('flex-grow')}
          keyExtractor={(item) => String(item.id)}
          horizontal
          renderItem={({ item }) => (
            <MedicalInfoElse
              item={{
                id: item.id,
                title: item.title,
                value: item.description
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View style={tailwind('flex-1 h-36 items-center justify-center')}>
              <Text style={tailwind('font-ubuntu-bold')}>
                Nenhuma informação médica
              </Text>
            </View>
          )}
        />
      </View>
      <View style={tailwind('flex-1 justify-end')}>
        <Button label="Traçar rota" type="primary" onPress={handleOpenMaps}>
          <Ionicons
            name="navigate-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </Container>
  );
};

export default DetailsNotification;
