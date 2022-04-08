import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Button from '@/presentation/shared/components/form/button';
import Input from '@/presentation/shared/components/form/input';
import useInputState from '@/presentation/shared/hooks/useInputState';

const DetailsContact: React.FC = () => {
  const tailwind = useTailwind();
  const token = useInputState({
    name: 'token'
  });
  useEffect(() => {
    token.set(
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789'
    );
  }, []);

  return (
    <Container>
      <View
        style={tailwind(
          'flex flex-row border-b border-gray-300 items-center py-4 '
        )}
      >
        <View style={tailwind('rounded-full bg-slate-300 p-4')}>
          <Ionicons name="person-outline" size={20} />
        </View>
        <Text style={tailwind('text-lg text-center px-2')}>Fulano</Text>
      </View>
      <View style={tailwind('mt-8 justify-center')}>
        <Input placeholder="Token" label="Token" value={token.value} />
        <Button label="Remover" type="danger" onPress={() => {}}>
          <Ionicons
            name="trash-bin-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </Container>
  );
};

export default DetailsContact;
