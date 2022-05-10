import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { AuthUser } from '@/domain/models';
import { Call } from '@/domain/models/Call';
import { EventStatus } from '@/domain/models/CallEvent';
import { CloseCall } from '@/domain/usecases';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import ButtonOutline from '@/presentation/shared/components/form/buttonOutline';
import Input from '@/presentation/shared/components/form/input';
import LoadingOverlay, {
  LoadingOverlayRefProps
} from '@/presentation/shared/components/LoadingOverlay';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import MedicalInfoElse from '../components/MedicalInfoElse';

const NO_LOCATION = 'Não informado';

interface Props {
  closeCall: CloseCall;
}

const DetailsNotification: React.FC<Props> = ({ closeCall }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { authUser } = useAuth();
  const [address, setAddress] = useState('');
  const loadingOverlayRef = useRef<LoadingOverlayRefProps>(null);
  const { showError, showSuccess } = useFeedbackMessage();
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
  function handleChat() {
    navigation.navigate('Chat');
  }
  async function handleCloseCall() {
    try {
      loadingOverlayRef.current?.showLoading();
      await closeCall.close({
        userId: user.id,
        callId: notification.id
      });
      showSuccess({ description: 'Chamado fechado com sucesso.' });
      loadingOverlayRef.current?.hideLoading();
      navigation.navigate('Home');
    } catch (error: any) {
      showError(error);
    } finally {
      loadingOverlayRef.current?.hideLoading();
    }
  }
  function getNotificationStatus() {
    switch (notification.lastEvent?.status) {
      case EventStatus.AUTHOR_CREATED:
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

  async function getReverseLocation() {
    if (address !== '') {
      return;
    }
    if (!location) {
      return;
    }
    const reverseLocation = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude
    });
    const firstAddress = reverseLocation[0];

    if (!firstAddress.street) {
      return;
    }
    const formatAddress = `${firstAddress.street || ''}, ${
      firstAddress.district || ''
    } - ${firstAddress.city || firstAddress.subregion}`;
    setAddress(formatAddress);
  }
  useEffect(() => {
    getReverseLocation();
  }, []);

  return (
    <Container scroll>
      <LoadingOverlay ref={loadingOverlayRef} />
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
        <Text style={tailwind('text-center px-2 font-ubuntu-bold')}>
          STATUS {'\n'}
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
        <Input editable label="Endereço aproximado" value={address} />
        <ButtonOutline label="Mensagens" type="warning" onPress={handleChat}>
          <Ionicons
            name="chatbubbles"
            size={20}
            style={tailwind('text-yellow-600')}
          />
        </ButtonOutline>
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
      <View style={tailwind('flex-1 flex-row justify-end mb-3')}>
        <View style={tailwind('flex-1')}>
          <Button label="Traçar rota" type="primary" onPress={handleOpenMaps}>
            <Ionicons
              name="navigate-outline"
              size={20}
              style={tailwind('text-white')}
            />
          </Button>
        </View>
        {authUser.id === user.id && (
          <View style={tailwind('ml-1 w-2/5')}>
            <Button label="Cancelar" type="danger" onPress={handleCloseCall}>
              <Ionicons name="trash" size={20} style={tailwind('text-white')} />
            </Button>
          </View>
        )}
      </View>
    </Container>
  );
};

export default DetailsNotification;
