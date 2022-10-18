import { useNavigation, useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { Text, Image, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import liliImg from '@/presentation/shared/assets/lili.gif';
import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Notification from '@/presentation/shared/services/localNotifications';
import callEmergency from '@/presentation/shared/services/phonecall';
import { codeTextTTS } from '@/presentation/shared/services/tts/formatTextSpeed';

const CreateEvent: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = route.params as { token: string };
  const tailwind = useTailwind();

  function handleTextVoice() {
    const info = `Atenção, informe o código,
    ${codeTextTTS(token)} durante a chamada!
    Atenção, informe o código,
    ${codeTextTTS(token)} durante a chamada!
    Atenção, informe o código,
    ${codeTextTTS(token)} durante a chamada!`;
    Speech.speak(info);
    setTimeout(() => {
      Notification.NotificationCodeCall(token);
      callEmergency();
    }, 15000);
  }

  function handleNavigateToHome() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    handleTextVoice();
  }, []);

  return (
    <Container bgColor="bg-black">
      <Image
        source={liliImg}
        resizeMode="contain"
        style={tailwind('w-full mb-2')}
      />
      <Text style={tailwind('text-white text-lg text-center')}>
        Assistente Lili sempre cuidando da sua segurança!
      </Text>
      <View style={tailwind('mt-6')}>
        <Button label="Voltar" onPress={handleNavigateToHome} />
      </View>
    </Container>
  );
};

export default CreateEvent;
