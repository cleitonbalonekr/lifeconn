import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import liliImg from '@/presentation/shared/assets/lili.gif';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Accelerometer from '@/presentation/shared/hooks/backgroundServices/useAccelerometer';
import Task from '@/presentation/shared/hooks/backgroundServices/useBackgroundService';

Task.register();

const MonitorImpact: React.FC = () => {
  const [statusAccelerometer, setStatusAccelerometer] = useState(false);
  const [statusContact, setStatusContact] = useState(false);
  const tailwind = useTailwind();
  const navigation = useNavigation();

  Accelerometer.register(setStatusAccelerometer);

  function handleTextVoice() {
    const info = `Olá, sou sua assistente lili, estarei monitorando eventuais colisões, e acionarei autoridades responsaveis caso necessário! `;
    Speech.speak(info);
  }

  useEffect(() => {
    Speech.stop();
    handleTextVoice();
    if (statusAccelerometer) {
      const info = `Detectei um impacto, estarei acionando as autoridades em 2 minutos, caso queira cancelar clique em cancelar! `;
      Speech.speak(info);
      setTimeout(() => {
        const info2 = `Estarei acionando as autoridades em 1 minuto, caso queira cancelar clique em cancelar! `;
        Speech.speak(info2);
        setTimeout(() => {
          const info3 = `Estarei acionando as autoridades agora! `;
          Speech.speak(info3);
          setTimeout(() => {
            navigation.navigate('Event');
          }, 5000);
        }, 60000);
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
        <Button type="danger" label="Cancelar acionamento">
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
