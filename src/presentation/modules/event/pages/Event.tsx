/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
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
  const { showError } = useFeedbackMessage();
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

  async function confirm() {
    try {
      handleStopTextVoice();
      const { fromHelpSomeoneElse, victim } = route.params as Params;
      let token: string;
      if (!fromHelpSomeoneElse) {
        token = await createCall.add({
          userId: authUser.id,
          location: location as CallLocation
        });
      } else {
        token = await createCallForAnotherPerson.add(
          {
            location: location as CallLocation,
            victim
          },
          authUser.id
        );
      }
      await sendContactsNotification.notifyContacts(authUser.id);
      navigation.navigate('CreateEvent', { token });
    } catch (error: any) {
      showError(error);
    }
  }

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({
      mayShowUserSettingsDialog: true
    });
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  useEffect(() => {
    handleTextVoice();
    getLocation();
  }, []);

  return (
    <Container>
      <Container scroll>
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
      </Container>
      <Button
        label="CONFIRMAR"
        type="primary"
        onPress={confirm}
        disabled={!location}
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
