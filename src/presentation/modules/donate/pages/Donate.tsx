import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import ButtonLink from '@/presentation/shared/components/form/link';

const Donate: React.FC = () => {
  const tailwind = useTailwind();
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
        <ButtonLink label="Assista o video para mais detalhes" />
        <View style={tailwind('flex-1 mt-10')}>
          <Text style={tailwind('text-lg text-center font-ubuntu')}>
            Quantidade de ligações disponíveis:{'\n'}
            <Text style={tailwind('text-xl  text-green-600 font-ubuntu')}>
              100
            </Text>
          </Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Button label="Doar">
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
