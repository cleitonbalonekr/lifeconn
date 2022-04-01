import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
// import { Container } from './styles';

const pages: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex flex-1  justify-center items-center ')}>
      <Text style={tailwind('text-yellow-400 text-lg')}>Hello world</Text>
    </View>
  );
};

export default pages;
