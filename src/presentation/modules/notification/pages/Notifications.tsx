import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { Call } from '@/domain/models/Call';
import { LoadCalls } from '@/domain/usecases';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

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

interface Props {
  loadCalls: LoadCalls;
}

const Notifications: React.FC<Props> = ({ loadCalls }) => {
  const tailwind = useTailwind();
  const { authUser } = useAuth();
  const { showError } = useFeedbackMessage();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Call[]>([]);

  async function loadNotifications() {
    try {
      const calls = await loadCalls.load({
        userId: authUser.id,
        contacts: authUser.contacts
      });
      setNotifications(calls);
    } catch (error: any) {
      showError(error);
    }
  }

  function handleNavigationToDetails() {
    navigation.navigate('DetailsNotification');
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container>
      <FlatList
        style={tailwind('mt-2 flex-1')}
        contentContainerStyle={tailwind('flex-grow')}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<NotificationEmpty />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={item.token}
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
