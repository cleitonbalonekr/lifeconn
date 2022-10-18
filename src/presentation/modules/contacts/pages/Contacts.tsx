import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Contact } from '@/domain/models';
import Header from '@/presentation/modules/contacts/components/header';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';
import { useAuth } from '@/presentation/shared/context/auth';

import EmptyContacts from '../components/EmptyContacts';

const Contacts: React.FC = () => {
  const { authUser } = useAuth();
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToDetailContact({ phoneNumber, nickname }: Contact) {
    navigation.navigate('DetailsContact', { phoneNumber, nickname });
  }
  return (
    <Container>
      <Header />
      <FlatList
        style={tailwind('mt-4 flex-1')}
        contentContainerStyle={tailwind('flex-grow')}
        showsVerticalScrollIndicator={false}
        data={authUser.contacts}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyContacts />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={item.nickname}
            onPress={() => handleNavigationToDetailContact(item)}
          >
            <Ionicons
              name="person-outline"
              style={tailwind('text-gray-600')}
              size={32}
            />
          </BaseListItem>
        )}
      />
    </Container>
  );
};

export default Contacts;
