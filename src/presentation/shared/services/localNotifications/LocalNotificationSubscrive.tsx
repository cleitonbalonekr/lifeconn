import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

const LocalNotificationSubscriber: React.FC = () => {
  const navigation = useNavigation();
  const notification = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (notification?.notification.request.content.data.route)
      navigation.navigate('MonitorImpact');
  }, [notification]);
  return null;
};

export default LocalNotificationSubscriber;
