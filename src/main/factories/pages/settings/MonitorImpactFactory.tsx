import React from 'react';

import { MonitorImpact } from '@/presentation/modules/settings';

import { makeRemoteSendContactsNotification } from '../../usecases';
import { makeRemoteCreateCall } from '../../usecases/call';

export const MakeMonitorImpact: React.FC = () => {
  return (
    <MonitorImpact
      createCall={makeRemoteCreateCall()}
      sendContactsNotification={makeRemoteSendContactsNotification()}
    />
  );
};
