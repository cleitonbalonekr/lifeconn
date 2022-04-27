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

const NotificationUserData = () => {
  Notification.scheduleNotificationAsync({
    content: {
      title: 'Meus Dados - Lifeconn',
      body: `Meus dados: [Nome: Aldair Camargo / Tel.: (22) 98153-3173]`,
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

export default { NotificationSpeedLimit, NotificationUserData };
