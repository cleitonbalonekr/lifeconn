import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Share, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '@/presentation/shared/components/form/button';

const Header: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToCreateContacts() {
    navigation.navigate('CreateContacts');
  }
  async function handleNavigationToSharedContact() {
    const token = 'Olá me adicione no app Lifeconn. Meu número é 22 11111111';

    await Share.share({
      message: token
    });
  }
  return (
    <View style={tailwind('flex-row justify-center border-b py-3')}>
      <View style={tailwind('w-32 mr-2')}>
        <Button type="primary" onPress={handleNavigationToCreateContacts}>
          <Ionicons name="add" size={20} style={tailwind('text-white')} />
        </Button>
      </View>
      <View style={tailwind('flex-1 ml-2')}>
        <Button
          label="Compartilhar"
          type="primary"
          onPress={handleNavigationToSharedContact}
        >
          <Ionicons
            name="share-social-outline"
            size={20}
            style={tailwind('text-white')}
          />
        </Button>
      </View>
    </View>
  );
};

export default Header;
