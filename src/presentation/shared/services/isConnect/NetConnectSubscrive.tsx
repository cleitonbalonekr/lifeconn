import NetInfo from '@react-native-community/netinfo';
import React, { useEffect } from 'react';

import useFeedbackMessage from '@/presentation/shared/hooks/useFeedbackMessage';

import isConnected from './index';

const NetConnectSubscriber: React.FC = () => {
  const { showWarning } = useFeedbackMessage();
  function isConnect() {
    NetInfo.addEventListener((state) => {
      if (!state.isInternetReachable) {
        showWarning('Você está offline!');
      }
    });
  }

  useEffect(() => {
    isConnected();
    isConnect();
  }, []);
  return null;
};

export default NetConnectSubscriber;
