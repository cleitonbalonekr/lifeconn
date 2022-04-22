import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    };
  }
});

Permissions.getAsync(Permissions.NOTIFICATIONS)
  .then((statusObj) => {
    if (statusObj.status !== 'granted') {
      return Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    return statusObj;
  })
  .then((statusObj) => {
    if (statusObj.status !== 'granted') {
      alert('Notifications will be unavailable now');
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
