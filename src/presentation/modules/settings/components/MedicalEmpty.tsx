import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

const NotificationEmpty: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1  items-center justify-center ')}>
      <FontAwesome5 name="bell-slash" size={60} />
      <Text style={tailwind('text-lg mt-3')}>Nenhum dado médico</Text>
    </View>
  );
};

export default NotificationEmpty;
