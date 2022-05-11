import NetInfo from '@react-native-community/netinfo';

import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import Notification from '../localNotifications/index';

const isConnected = async () => {
  const state = await NetInfo.fetch();
  const { showWarning } = useFeedbackMessage();

  if (!state.isInternetReachable) {
    Notification.NotificationIsConnected();
    showWarning('Você está offline!');
  }

  return state.isInternetReachable;
};

export default isConnected;
