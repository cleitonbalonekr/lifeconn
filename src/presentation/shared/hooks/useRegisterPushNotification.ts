import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

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

const RegisterPushNotification = () => {
  const navigation = useNavigation();
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }
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
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    registerForPushNotificationsAsync();
  });
  return null;
};

export default RegisterPushNotification;
