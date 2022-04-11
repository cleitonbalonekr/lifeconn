import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Input from '@/presentation/shared/components/form/input';

import Cap1 from './Cap1';

const DetailsBasicMechanics: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <ScrollView>
      <View style={tailwind('mt-3 justify-center')}>
        <Input placeholder="Buscar" label="Digite sua busca" />
        <Cap1 />
      </View>
    </ScrollView>
  );
};

export default DetailsBasicMechanics;
