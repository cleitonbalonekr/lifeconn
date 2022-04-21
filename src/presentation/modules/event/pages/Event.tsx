/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';

const Event: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleTextVoice() {
    const info = `laificom informa, 
    Você está prestes a acionar o corpo de bombeiros e notificar familiares!
    Para continuar clique no botão "CONFIRMAR"! Atenção, só assione o corpo de bombeiros nos seguintes casos:
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

  function confirm() {
    handleStopTextVoice();
    navigation.navigate('CreateEvent');
  }

  useEffect(() => {
    handleTextVoice();
  }, []);

  return (
    <Container>
      <Container scroll>
        <Ionicons
          name="volume-mute"
          size={20}
          style={tailwind('text-black')}
          onPress={handleStopTextVoice}
        />
        <Text style={tailwind('mb-2 text-lg font-bold text-center')}>
          LIFECONN INFORMA
        </Text>
        <Text style={tailwind('mb-2 text-center font-bold')}>
          Vocês está prestes a acionar o corpo de bombeiros e notificar
          familiares! Para continuar clique no botão "CONFIRMAR"!
        </Text>
        <Text style={tailwind('mb-2 text-red-500')}>
          Atenção, só assione o corpo de bombeiros nos seguintes casos:
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
      <Button label="CONFIRMAR" type="primary" onPress={confirm}>
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
