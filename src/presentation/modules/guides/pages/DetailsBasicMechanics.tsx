import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Input from '@/presentation/shared/components/form/input';

const DetailsBasicMechanics: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <Container>
      <View style={tailwind('mt-8 justify-center')}>
        <Input placeholder="Buscar" label="Digite sua busca" />
        <Text>Teste</Text>
      </View>
    </Container>
  );
};

export default DetailsBasicMechanics;
