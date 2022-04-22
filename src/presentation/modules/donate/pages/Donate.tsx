import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import ButtonLink from '@/presentation/shared/components/form/link';

const Donate: React.FC = () => {
  const tailwind = useTailwind();
  const [balance, setBalance] = useState(0);

  function handleOpenYoutube() {
    const url = `https://www.youtube.com/watch?v=8NU3qpD1ChE`;
    Linking.openURL(url);
  }

  function handleDonate() {
    const url = `https://voice-app.zenvia.com/recarga/index.php?id=271107&public_key=d41d8cd98f00b204e9800998ecf8427e&src=api`;
    Linking.openURL(url);
  }

  async function getBalance() {
    try {
      const token = Constants.manifest?.extra?.zenviaToken;
      const result = await fetch('https://voice-api.zenvia.com/saldo', {
        method: 'GET',
        headers: {
          'Access-Token': token
        }
      });
      result.json().then((response) => {
        setBalance(response.dados.saldo);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Container scroll>
      <View style={tailwind('flex-1 justify-center mt-10')}>
        <Text style={tailwind('text-lg text-justify font-ubuntu')}>
          Nossa plataforma utiliza os serviços da Total Voice para efetuar a
          função de envio de áudio para Bombeiros. Infelizmente esse serviço não
          é gratuito, para que cada ligação seja efetuada é necessário pagar uma
          pequena taxa de ligação, para isso contamos com sua colaboração para
          salvas vidas!
        </Text>
        <Text style={tailwind('text-lg text-justify font-ubuntu')}>
          Outra forma de nos ajudar é criando uma conta na Total Voice, assim
          você tem seu próprio Token, o que nos permite usá-lo para fazer
          chamadas em sua conta.
        </Text>
        <ButtonLink
          label="Assista o video de criar token privado"
          onPress={handleOpenYoutube}
        />
        <View style={tailwind('flex-1 my-3')}>
          <Text
            style={tailwind(
              'border rounded-lg p-2 text-sm text-center font-ubuntu mb-2'
            )}
          >
            Saldo / custo(por minuto):{'\n'}
            <Text style={tailwind('text-lg text-green-600 font-ubuntu')}>
              R$ {balance.toFixed(2)} / R$ 0.34 =
              <Ionicons
                name="ios-call-outline"
                size={20}
                style={tailwind('text-green-600')}
              />{' '}
              {Math.trunc(balance / 0.34)} ligações
            </Text>
          </Text>
          <Text
            style={tailwind(
              'border rounded-lg p-2 text-lg text-center font-ubuntu'
            )}
          >
            Quantidade de ligações disponíveis:{'\n'}
            <Text style={tailwind('text-xl  text-green-600 font-ubuntu')}>
              [
              <Ionicons
                name="ios-call-outline"
                size={20}
                style={tailwind('text-green-600')}
              />{' '}
              {Math.trunc(balance / 0.34)} ligações] ou [
              <Ionicons
                name="time-outline"
                size={20}
                style={tailwind('text-green-600')}
              />{' '}
              {Math.trunc(balance / 0.34)} minutos]
            </Text>
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Button label="Doar" onPress={handleDonate}>
            <Ionicons
              name="heart-outline"
              size={20}
              style={tailwind('text-white')}
            />
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default Donate;
