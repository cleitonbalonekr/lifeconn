import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '@/presentation/shared/components/form/button';

const Header: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToDetailsFirstAid() {
    navigation.navigate('DetailsFirstAid');
  }
  function handleNavigationToDetailsBasicMechanics() {
    navigation.navigate('DetailsBasicMechanics');
  }
  return (
    <View style={tailwind('flex-row justify-center border-b py-3')}>
      <View style={tailwind('mr-2')}>
        <Button
          label="Primeiros socorros"
          type="danger"
          onPress={handleNavigationToDetailsFirstAid}
        >
          <Ionicons
            name="heart-half"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
      <View style={tailwind('ml-2')}>
        <Button
          label="Mecânica Básica"
          type="success"
          onPress={handleNavigationToDetailsBasicMechanics}
        >
          <Ionicons
            name="car-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </View>
  );
};

export default Header;
