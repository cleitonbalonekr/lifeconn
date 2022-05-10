import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';

const Chat: React.FC = () => {
  const tailwind = useTailwind();

  return (
    <Container scroll>
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('font-bold mb-12 italic')}>
          <Ionicons name="person-outline" size={20} />
          Vocẽ está conversando com um atendente do corpo de Bombeiros!
        </Text>
        <View style={tailwind('bg-gray-200 rounded-lg p-2 mr-24 mb-2')}>
          <Text style={tailwind('text-sm mb-2')}>
            Olá você poderia me fornecer mais dados sobre o ocorrido?
          </Text>
          <Text style={tailwind('text-xs')}>
            {`${format(new Date(), 'dd-MM-yyyy HH:mm')}`}
          </Text>
        </View>
        <View style={tailwind('bg-teal-200 rounded-lg p-2 ml-24 mb-2')}>
          <Text style={tailwind('text-sm mb-2')}>Claro só um minutinho!</Text>
          <Text style={tailwind('text-xs')}>
            {`${format(new Date(), 'dd-MM-yyyy HH:mm')}`}
          </Text>
        </View>
      </View>
      <View style={tailwind('flex-row justify-center items-center')}>
        <View style={tailwind('flex-1')}>
          <Input placeholder="Escrever mensagem" />
        </View>
        <View style={tailwind('items-center justify-center ml-1 ')}>
          <Button>
            <Ionicons name="send" size={20} style={tailwind('text-white')} />
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default Chat;
