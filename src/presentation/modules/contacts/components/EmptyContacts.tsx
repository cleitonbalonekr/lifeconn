import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

const EmptyContacts: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1  items-center justify-center ')}>
      <Ionicons name="close" size={60} />
      <Text style={tailwind('text-lg mt-3')}>Nenhuma contato cadastrado</Text>
    </View>
  );
};

export default EmptyContacts;
