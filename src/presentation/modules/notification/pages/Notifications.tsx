import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

import { AuthUser } from '@/domain/models';
import { Call } from '@/domain/models/Call';
import { LoadCalls } from '@/domain/usecases';
import BaseListItem from '@/presentation/shared/components/BaseListItem';
import Container from '@/presentation/shared/components/Container';
import LoadingOverlay, {
  LoadingOverlayRefProps
} from '@/presentation/shared/components/LoadingOverlay';
import { useAuth } from '@/presentation/shared/context/auth';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import NotificationEmpty from '../components/NotificationEmpty';

interface Props {
  loadCalls: LoadCalls;
}

const Notifications: React.FC<Props> = ({ loadCalls }) => {
  const tailwind = useTailwind();
  const { authUser } = useAuth();
  const { showError } = useFeedbackMessage();
  const loadingOverlayRef = useRef<LoadingOverlayRefProps>(null);
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Call[]>([]);

  async function loadNotifications() {
    try {
      loadingOverlayRef.current?.showLoading();
      const calls = await loadCalls.load({
        userId: authUser.id,
        contacts: authUser.contacts
      });

      setNotifications(calls);
    } catch (error: any) {
      showError(error);
    } finally {
      loadingOverlayRef.current?.hideLoading();
    }
  }

  function handleNavigationToDetails(item: Call) {
    const notification = JSON.parse(JSON.stringify(item));
    navigation.navigate('DetailsNotification', { notification });
  }

  function chooseIcon(item: Call) {
    if (item.helper) {
      return 'alert-circle';
    }
    if (item.userId && (item.userId as AuthUser).id === authUser.id) {
      return 'person-circle-outline';
    }

    return 'people';
  }

  function chooseName(item: Call) {
    const itemUser = item.userId as AuthUser;
    if (item.helper) {
      return itemUser
        ? String(itemUser.fullName)
        : 'Desconhecido ajudado por mim';
    }
    const name = itemUser.fullName || itemUser.email;
    return String(name);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container>
      <LoadingOverlay ref={loadingOverlayRef} />
      <FlatList
        style={tailwind('mt-2 flex-1')}
        contentContainerStyle={tailwind('flex-grow')}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<NotificationEmpty />}
        renderItem={({ item }) => (
          <BaseListItem
            itemName={chooseName(item)}
            onPress={() => handleNavigationToDetails(item)}
          >
            <Ionicons
              name={chooseIcon(item)}
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
