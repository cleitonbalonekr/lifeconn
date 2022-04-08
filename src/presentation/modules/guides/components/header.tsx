import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Header: React.FC = () => {
  const tailwind = useTailwind();

  function handleNavigationToDetailsFirstAid() {
    // navigation.navigate('DetailsFirstAid');
  }
  function handleNavigationToDetailsBasicMechanics() {
    // navigation.navigate('DetailsBasicMechanics');
  }
  return (
    <View style={tailwind('flex-row justify-center py-3')}>
      <View style={tailwind('flex-1 mr-2')}>
        <TouchableOpacity
          style={tailwind('items-center justify-center ')}
          onPress={handleNavigationToDetailsFirstAid}
        >
          <Ionicons
            name="heart-half"
            size={30}
            style={tailwind('text-red-600')}
          />
          <Text>Primeiros socorros</Text>
          <View style={tailwind('border w-full border-red-700 my-1.5 ')} />
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex-1 ml-2')}>
        <TouchableOpacity
          style={tailwind('items-center justify-center ')}
          onPress={handleNavigationToDetailsBasicMechanics}
        >
          <Ionicons
            name="car-outline"
            size={30}
            style={tailwind('text-zinc-500')}
          />
          <Text>Mecânica Básica</Text>
          <View style={tailwind('border w-full border-red-700 my-1.5 ')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
