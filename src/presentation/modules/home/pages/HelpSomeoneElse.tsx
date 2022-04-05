import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Validation } from '@/presentation/protocols';

import Header from '../components/Header';

interface Props {
  validation: Validation;
}

const HelpSomeoneElse: React.FC<Props> = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 p-6')}>
      <Header from="help" />
    </View>
  );
};

export default HelpSomeoneElse;
