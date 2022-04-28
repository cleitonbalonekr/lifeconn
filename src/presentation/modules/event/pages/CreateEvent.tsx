/* eslint-disable no-unused-expressions */
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import liliImg from '@/presentation/shared/assets/lili.gif';
import Container from '@/presentation/shared/components/Container';
import Notification from '@/presentation/shared/services/localnotifications';
import callEmergency from '@/presentation/shared/services/phonecall';

const CreateEvent: React.FC = () => {
  const [token, setToken] = useState('H,,J,,5,,5');
  const tailwind = useTailwind();

  function handleTextVoice() {
    const info = `Atenção, informe o código,
    ${token} durante a chamada!
    Atenção, informe o código,
    ${token} durante a chamada!
    Atenção, informe o código,
    ${token} durante a chamada!`;
    Speech.speak(info);
    setTimeout(() => {
      Notification.NotificationCodeCall();
      callEmergency();
    }, 15000);
  }

  useEffect(() => {
    handleTextVoice();
  }, []);

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
    </Container>
  );
};

export default CreateEvent;
