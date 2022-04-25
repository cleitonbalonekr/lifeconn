import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});
// send notification
// curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
//   "to": "ExponentPushToken[VJYqaOFa1iqKvD0Znw6jAT]",
//   "title":"Ajuda o maluco que ta doente",
//   "body": "world",
//   "data":{"test":true}
// }'

const SubscribeToNotifications = () => {
  const navigation = useNavigation();
  const { showError } = useFeedbackMessage();

  const getPermissions = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      showError('Permissão para receber notificações negada');
    }
  };

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' }
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  }

  const registerForPushNotificationsAsync = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    // if (Platform.OS === 'android') {
    //   Notifications.setNotificationChannelAsync('default', {
    //     name: 'default',
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: '#FF231F7C'
    //   });
    // }
  };

  const handleNotification = (notification: Notifications.Notification) => {
    console.log('notification', notification.date);
  };
  const handleNotificationResponse = (
    notification: Notifications.NotificationResponse
  ) => {
    const { eventId } = notification.notification.request.content.data;
    navigation.navigate('Notifications');
  };

  useEffect(() => {
    getPermissions();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
  });

  return null;
};

export default SubscribeToNotifications;
