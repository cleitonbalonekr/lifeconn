import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Header from '@/presentation/modules/contacts/components/header';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';

import EmptyContacts from '../components/EmptyContacts';

const fakeContactData = [
  {
    id: '1',
    contactName: 'Fulano'
  },
  {
    id: '2',
    contactName: 'Fulano'
  },
  {
    id: '3',
    contactName: 'Fulano'
  },
  {
    id: '4',
    contactName: 'Fulano'
  },
  {
    id: '5',
    contactName: 'Fulano'
  },
  {
    id: '6',
    contactName: 'Fulano'
  },
  {
    id: '7',
    contactName: 'Fulano'
  },
  {
    id: '8',
    contactName: 'Fulano'
  },
  {
    id: '9',
    contactName: 'Fulano'
  }
];

const Contacts: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToDetailContact() {
    navigation.navigate('DetailsContact');
  }
  return (
    <Container>
      <Header />
      <FlatList
        style={tailwind('mt-4 flex-1')}
        contentContainerStyle={tailwind('justify-center flex-grow')}
        showsVerticalScrollIndicator={false}
        data={fakeContactData}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyContacts />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={item.contactName}
            onPress={handleNavigationToDetailContact}
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
