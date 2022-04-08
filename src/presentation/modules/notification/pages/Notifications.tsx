import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';

import NotificationEmpty from '../components/NotificationEmpty';

const fakeNotificationData = [
  {
    id: '1',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '2',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '3',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '4',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '5',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '6',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '7',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '8',
    victimName: 'Fulano',
    date: new Date()
  },
  {
    id: '9',
    victimName: 'Fulano',
    date: new Date()
  }
];

const Notifications: React.FC = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  function handleNavigationToDetails() {
    navigation.navigate('DetailsNotification');
  }
  return (
    <Container>
      <FlatList
        style={tailwind('mt-2 flex-1')}
        contentContainerStyle={tailwind('justify-center flex-grow')}
        showsVerticalScrollIndicator={false}
        data={fakeNotificationData}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<NotificationEmpty />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={item.victimName}
            onPress={handleNavigationToDetails}
          >
            <Ionicons
              name="alert-circle-outline"
              style={tailwind('text-yellow-600')}
              size={32}
            />
          </BaseListItem>
        )}
      />
    </Container>
  );
};

export default Notifications;
