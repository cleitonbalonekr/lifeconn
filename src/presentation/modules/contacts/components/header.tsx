import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Share, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import Button from '@/presentation/shared/components/form/button';
import { useAuth } from '@/presentation/shared/context/auth';

const Header: React.FC = () => {
  const { authUser } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToCreateContacts() {
    navigation.navigate('CreateContacts');
  }
  async function handleNavigationToSharedContact() {
    const token = `Olá me adicione no app Lifeconn.\nMeu número é ${authUser.phoneNumber}`;

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
