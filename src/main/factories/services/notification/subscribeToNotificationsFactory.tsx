import React from 'react';

import SubscribeToNotifications from '@/presentation/shared/services/notifications';

import { makeRemoteSaveNotificationToken } from '../../usecases';

export const MakeSubscribeToNotifications: React.FC = () => {
  return (
    <SubscribeToNotifications
      saveNotificationToken={makeRemoteSaveNotificationToken()}
    />
  );
};
