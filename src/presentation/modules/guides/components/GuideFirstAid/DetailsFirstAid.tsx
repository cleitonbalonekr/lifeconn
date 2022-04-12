import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Input from '@/presentation/shared/components/form/input';
import useInputState from '@/presentation/shared/hooks/useInputState';

import { Cap1 } from './index';

const DetailsFirstAid: React.FC = () => {
  const tailwind = useTailwind();
  const search = useInputState({
    name: 'searchBasicMechanics'
  });
  return (
    <ScrollView>
      <View style={tailwind('mt-3 justify-center')}>
        <Input
          placeholder="Buscar"
          label="Digite sua busca"
          onChangeText={search.set}
        />
        <Cap1 toSearch={search.value} />
      </View>
    </ScrollView>
  );
};

export default DetailsFirstAid;
