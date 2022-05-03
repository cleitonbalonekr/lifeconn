/* eslint-disable prefer-const */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { CallLocation } from '@/domain/models/Call';
import { CreateCall, SendContactsNotification } from '@/domain/usecases';
import liliImg from '@/presentation/shared/assets/lili.gif';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import { useAuth } from '@/presentation/shared/context/auth';
import Accelerometer from '@/presentation/shared/services/accelerometer';
import Task from '@/presentation/shared/services/backgroundServices';
import registerTTS from '@/presentation/shared/services/tts';

Task.runService();

interface Props {
  createCall: CreateCall;
  sendContactsNotification: SendContactsNotification;
}

const MonitorImpact: React.FC<Props> = ({
  createCall,
  sendContactsNotification
}) => {
  const { authUser } = useAuth();
  const [statusAccelerometer, setStatusAccelerometer] = useState(false);
  const [statusContact, setStatusContact] = useState(false);
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [location, setLocation] = useState<CallLocation | null>(null);

  Accelerometer.register(setStatusAccelerometer);

  function handleTextVoice() {
    const info = `Olá, sou sua assistente lili, estarei monitorando eventuais colisões, e notificando autoridades responsáveis caso necessário!`;
    Speech.speak(info);
  }

  async function handleEvent() {
    getLocation();
    let token: string;
    token = await createCall.add({
      userId: authUser.id,
      location: location as CallLocation
    });
    await sendContactsNotification.notifyContacts(authUser.id);

    if (location)
      registerTTS({
        name: authUser.fullName ? authUser.fullName : authUser.email,
        phone: authUser.phoneNumber,
        token,
        location: location as CallLocation,
        totalVoiceToken: authUser.totalVoiceToken
      });
  }

  const getLocation = async () => {
    await Location.requestBackgroundPermissionsAsync();
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }
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
  }, []);

  useEffect(() => {
    if (statusAccelerometer) {
      Speech.stop();
      setStatusContact(true);
      const info = [
        `Detectei um impacto, estarei acionando as autoridades em 2 minutos, caso queira cancelar clique em cancelar! `,
        `Estarei acionando as autoridades em 1 minuto, caso queira cancelar clique em cancelar! `,
        `Estarei acionando as autoridades agora! `,
        `Acionamento cancelado! `
      ];
      Speech.speak(info[0]);
      setTimeout(() => {
        if (statusContact) {
          Speech.speak(info[1]);
          setTimeout(() => {
            if (statusContact) {
              Speech.speak(info[2]);
              setTimeout(() => {
                if (statusContact) {
                  handleEvent();
                } else {
                  Speech.speak(info[3]);
                  navigation.navigate('Home');
                }
              }, 5000);
            } else {
              Speech.speak(info[3]);
              navigation.navigate('Home');
            }
          }, 60000);
        } else {
          Speech.speak(info[3]);
          navigation.navigate('Home');
        }
      }, 60000);
    }
  }, [statusAccelerometer]);

  return (
    <Container style={tailwind('flex-1 bg-black')}>
      <Image
        source={liliImg}
        resizeMode="contain"
        style={tailwind('w-full mb-2')}
      />
      <Text style={tailwind('text-white text-lg text-center')}>
        Assistente Lili sempre cuidando da sua segurança!
      </Text>
      {statusContact ? (
        <Button
          type="danger"
          label="Cancelar acionamento"
          onPress={() => {
            setStatusContact(false);
          }}
        >
          <Ionicons
            name="close-sharp"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MonitorImpact;
