/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { CallLocation } from '@/domain/models/Call';
import {
  CreateCall,
  CreateCallForAnotherPerson,
  SendContactsNotification
} from '@/domain/usecases';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import ConfirmNoLocationModal, {
  ConfirmNoLocationModalRefProps
} from '../components/ConfirmNoLocationModal';

interface Props {
  createCall: CreateCall;
  createCallForAnotherPerson: CreateCallForAnotherPerson;
  sendContactsNotification: SendContactsNotification;
}
interface Params {
  fromHelpSomeoneElse: boolean;
  victim?: {
    fullName: string;
    phoneNumber: string;
  };
}

const Event: React.FC<Props> = ({
  createCall,
  createCallForAnotherPerson,
  sendContactsNotification
}) => {
  const { authUser } = useAuth();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const confirmNoLocationModalRef =
    useRef<ConfirmNoLocationModalRefProps>(null);
  const { showError, showWaiting, hide } = useFeedbackMessage();
  const [muteSpeech, setMuteSpeech] = useState(true);
  const [location, setLocation] = useState<CallLocation | null>(null);
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleTextVoice() {
    const info = `laificom informa, 
    Você está prestes a acionar o corpo de bombeiros e notificar familiares!
    Para continuar clique no botão "CONFIRMAR"! Atenção, só acione o corpo de bombeiros nos seguintes casos:
    Incêndios em residências, empresas, estruturas e em vegetação.
    Acidentes de trânsito com vítimas.
    Afogamentos.
    Acidentes domésticos (queimaduras, intoxicação, explosões e ferimentos em geral).
    Quedas de plano elevado ou de mesmo nível que resultem em lesões.
    Busca de pessoas.
    Salvamento em ambientes hostis.
    Lesões provenientes de agressão e ataques de animais.
    Ferimentos por arma de fogo e objetos cortantes/perfurantes.
    Emergências com produtos perigosos e combustíveis.
    Desabamentos, soterramentos e deslizamentos.
    Emergências resultantes de vendavais, enchentes, temporais e chuvas de granizo.`;
    Speech.speak(info);
  }
  function handleStopTextVoice() {
    Speech.stop();
  }
  function toggleSpeech() {
    setMuteSpeech(!muteSpeech);
    if (muteSpeech) {
      handleStopTextVoice();
    } else {
      handleTextVoice();
    }
  }

  function handleValidateLocation() {
    handleStopTextVoice();
    if (!location) {
      confirmNoLocationModalRef.current?.handleOpenModal();
    } else {
      confirm();
    }
  }

  async function confirm() {
    try {
      setLoading(true);
      const { fromHelpSomeoneElse, victim } = route.params as Params;
      let token: string;
      if (!fromHelpSomeoneElse) {
        token = await createCall.add({
          userId: authUser.id,
          location
        });
        await sendContactsNotification.notifyContacts(authUser.id);
      } else {
        const payload = { location, victim };
        const response = await createCallForAnotherPerson.add(
          payload,
          authUser.id
        );
        token = response.token;
        if (response.victimId)
          await sendContactsNotification.notifyContacts(response.victimId);
      }
      navigation.navigate('CreateEvent', { token });
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
      confirmNoLocationModalRef.current?.handleCloseModal();
    }
  }

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    await Location.requestBackgroundPermissionsAsync();
    if (!granted) {
      showError('Permissão para obter localização não concedida.');
    }
    showWaiting('Obtendo localização');
    const { coords } = await Location.getCurrentPositionAsync({
      mayShowUserSettingsDialog: true,
      accuracy: Location.Accuracy.Balanced
    });
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    hide();
  };

  useEffect(() => {
    handleTextVoice();
    getLocation();
  }, []);

  return (
    <Container scroll>
      <ConfirmNoLocationModal
        ref={confirmNoLocationModalRef}
        confirmWithoutLocation={confirm}
      />
      <View style={tailwind('flex-1')}>
        <Ionicons
          name={!muteSpeech ? 'volume-high' : 'volume-mute'}
          size={20}
          style={tailwind('text-black')}
          onPress={toggleSpeech}
        />
        <Text style={tailwind('mb-2 text-lg font-bold text-center')}>
          LIFECONN INFORMA
        </Text>
        <Text style={tailwind('mb-2 text-center font-bold')}>
          Vocês está prestes a acionar o corpo de bombeiros e notificar
          familiares! Para continuar clique no botão "CONFIRMAR"!
        </Text>
        <Text style={tailwind('mb-2 text-red-500')}>
          Atenção, só acione o corpo de bombeiros nos seguintes casos:
        </Text>
        <Text>
          * Incêndios em residências, empresas, estruturas e em vegetação.
        </Text>
        <Text>* Acidentes de trânsito com vítimas.</Text>
        <Text>* Afogamentos.</Text>
        <Text>
          * Acidentes domésticos (queimaduras, intoxicação, explosões e
          ferimentos em geral).
        </Text>
        <Text>
          * Quedas de plano elevado ou de mesmo nível que resultem em lesões.
        </Text>
        <Text>* Busca de pessoas.</Text>
        <Text>* Salvamento em ambientes hostis.</Text>
        <Text>* Lesões provenientes de agressão e ataques de animais.</Text>
        <Text>
          * Ferimentos por arma de fogo e objetos cortantes/perfurantes.
        </Text>
        <Text>* Emergências com produtos perigosos e combustíveis.</Text>
        <Text>* Desabamentos, soterramentos e deslizamentos.</Text>
        <Text>
          * Emergências resultantes de vendavais, enchentes, temporais e chuvas
          de granizo.
        </Text>
      </View>

      <Button
        label="CONFIRMAR"
        type="primary"
        onPress={handleValidateLocation}
        loading={loading}
      >
        <Ionicons
          name="checkmark-done"
          size={20}
          style={tailwind('text-white')}
        />
      </Button>
    </Container>
  );
};

export default Event;
