import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import { SaveNotificationToken } from '@/domain/usecases';
import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import { useAuth } from '../../context/auth';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

interface Props {
  saveNotificationToken: SaveNotificationToken;
}

const GRANTED_PERMISSION = 'granted';

const SubscribeToNotifications = ({ saveNotificationToken }: Props) => {
  const navigation = useNavigation();
  const { authUser, saveUserSate } = useAuth();
  const { showError } = useFeedbackMessage();

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== GRANTED_PERMISSION) {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (authUser) {
      const notificationToken = (await Notifications.getExpoPushTokenAsync())
        .data;
      if (
        !authUser.notificationToken ||
        authUser.notificationToken !== notificationToken
      ) {
        const user = await saveNotificationToken.update({
          userId: authUser.id,
          notificationToken
        });
        saveUserSate(user);
      }
    }

    if (finalStatus !== GRANTED_PERMISSION) {
      showError('Permissão para receber notificações negada');
    }
  };

  const handleNotification = (notification: Notifications.Notification) => {};
  const handleNotificationResponse = (
    notification: Notifications.NotificationResponse
  ) => {
    const route = notification?.notification.request.content.data.route;
    if (route !== 'Home' && route !== 'MonitorImpact' && route !== 'Advanced') {
      navigation.navigate('Notifications');
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
  });

  return null;
};

export default SubscribeToNotifications;
