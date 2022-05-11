import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

const LocalNotificationSubscriber: React.FC = () => {
  const navigation = useNavigation();
  const notification = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const route = notification?.notification.request.content.data.route;
    if (route === 'MonitorImpact' || route === 'Home' || route === 'Advanced') {
      navigation.navigate(route);
    }
  }, [notification]);
  return null;
};

export default LocalNotificationSubscriber;
