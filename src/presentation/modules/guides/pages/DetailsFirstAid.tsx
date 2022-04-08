import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Container from '@/presentation/shared/components/Container';
import Input from '@/presentation/shared/components/form/input';

import { Cap1 } from '../components/GuideFirstAid';

const DetailsFirstAid: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <Container scroll>
      <View style={tailwind('mt-8 justify-center')}>
        <Input placeholder="Buscar" label="Digite sua busca" />
        <Cap1 />
      </View>
    </Container>
  );
};

export default DetailsFirstAid;
