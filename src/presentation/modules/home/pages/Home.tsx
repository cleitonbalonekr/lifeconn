import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

const Home: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('container flex-1 items-center justify-center')}>
      <Text>home page</Text>
    </View>
  );
};

export default Home;
