import React from 'react';

import { Notifications } from '@/presentation/modules/notification';

import { makeRemoteLoadCalls } from '../../usecases/call';

export const MakeNotifications: React.FC = () => {
  return <Notifications loadCalls={makeRemoteLoadCalls()} />;
};
