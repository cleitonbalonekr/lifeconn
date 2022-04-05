import { Octicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Header from '../components/Header';

const Home: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 p-6')}>
      <Header />
      <View style={tailwind('mt-6 items-center justify-center')}>
        <Octicons name="heart" size={250} style={tailwind('text-red-700 ')} />
      </View>
    </View>
  );
};

export default Home;
