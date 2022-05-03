import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import liliImg from '@/presentation/shared/assets/lili.gif';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Accelerometer from '@/presentation/shared/services/accelerometer';
import Task from '@/presentation/shared/services/backgroundServices';
import registerTTS from '@/presentation/shared/services/tts';

Task.runService();

const MonitorImpact: React.FC = () => {
  const [statusAccelerometer, setStatusAccelerometer] = useState(false);
  const [statusContact, setStatusContact] = useState(false);
  const tailwind = useTailwind();
  const navigation = useNavigation();

  Accelerometer.register(setStatusAccelerometer);

  function handleTextVoice() {
    const info = `Olá, sou sua assistente lili, estarei monitorando eventuais colisões, e notificando autoridades responsáveis caso necessário!`;
    Speech.speak(info);
  }

  useEffect(() => {
    handleTextVoice();
  }, []);

  useEffect(() => {
    if (statusAccelerometer) {
      Speech.stop();
      setStatusContact(true);
      const info = `Detectei um impacto, estarei acionando as autoridades em 2 minutos, caso queira cancelar clique em cancelar! `;
      Speech.speak(info);
      setTimeout(() => {
        const info2 = `Estarei acionando as autoridades em 1 minuto, caso queira cancelar clique em cancelar! `;
        Speech.speak(info2);
        setTimeout(() => {
          const info3 = `Estarei acionando as autoridades agora! `;
          Speech.speak(info3);
          setTimeout(() => {
            registerTTS({
              name: 'Aldair Camargo',
              phone: '22 9 8 1 5 3 3 1 7 3',
              token: 'H,,J,,5,,5'
            });
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
