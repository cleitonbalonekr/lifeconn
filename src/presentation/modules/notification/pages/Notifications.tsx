import React from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import Container from '@/presentation/shared/components/Container';
import ListEmpty from '@/presentation/shared/components/form/listEmpty';
import Option from '@/presentation/shared/components/form/option';

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
  return (
    <Container>
      <FlatList
        style={tailwind('mt-2 flex-1')}
        contentContainerStyle={tailwind('justify-center flex-grow')}
        showsVerticalScrollIndicator={false}
        data={fakeNotificationData}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<ListEmpty />}
        renderItem={({ item }) => (
          <Option item={{ ...item, router: 'DetailsNotification' }} />
        )}
      />
    </Container>
  );
};

export default Notifications;
