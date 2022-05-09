import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    };
  }
});

const NotificationUserData = async (fullName: string, phoneNumber: string) => {
  Notification.scheduleNotificationAsync({
    content: {
      title: 'Meus Dados - Lifeconn',
      body: `#Nome: ${fullName}
      #Tel.: ${phoneNumber}]`,
      priority: Notification.AndroidNotificationPriority.MAX,
      data: {
        route: 'Home'
      }
    },
    identifier: 'NotiACC1',
    trigger: {
      seconds: 1
    }
  });
  Notification.setNotificationChannelAsync('NotiACC1', {
    name: 'NotiACC1',
    importance: Notification.AndroidImportance.MAX,
    lockscreenVisibility: Notification.AndroidNotificationVisibility.PUBLIC
  });
};

const NotificationSpeedLimit = () => {
  Notification.scheduleNotificationAsync({
    content: {
      title: 'Atenção - Lifeconn',
      body: 'Você atingiu o limite de monitoramente! Abra o app para sua segurança!',
      priority: Notification.AndroidNotificationPriority.MAX,
      data: {
        route: 'MonitorImpact'
      }
    },
    identifier: 'NotiACC2',
    trigger: {
      seconds: 1
    }
  });
  Notification.setNotificationChannelAsync('NotiACC2', {
    name: 'NotiACC2',
    importance: Notification.AndroidImportance.MAX,
    lockscreenVisibility: Notification.AndroidNotificationVisibility.PUBLIC
  });
};

const NotificationCodeCall = (code: string) => {
  Notification.scheduleNotificationAsync({
    content: {
      title: code,
      body: code,
      priority: Notification.AndroidNotificationPriority.MAX,
      data: {
        route: 'home'
      }
    },
    identifier: 'NotiCALL3',
    trigger: {
      seconds: 1
    }
  });
  Notification.setNotificationChannelAsync('NotiCALL3', {
    name: 'NotiCALL3',
    importance: Notification.AndroidImportance.MAX,
    lockscreenVisibility: Notification.AndroidNotificationVisibility.PUBLIC
  });
};

export default {
  NotificationSpeedLimit,
  NotificationUserData,
  NotificationCodeCall
};
