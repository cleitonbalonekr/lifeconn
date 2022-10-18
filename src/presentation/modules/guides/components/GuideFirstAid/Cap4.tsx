import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Cap1: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('mt-8 justify-center')}>
      <Text>Teste</Text>
    </View>
  );
};

export default Cap1;
