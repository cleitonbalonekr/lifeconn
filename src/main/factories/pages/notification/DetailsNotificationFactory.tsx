import React from 'react';

import { DetailsNotification } from '@/presentation/modules/notification';

import { makeRemoteCloseCall } from '../../usecases/call';

export const MakeDetailsNotification: React.FC = () => {
  return <DetailsNotification closeCall={makeRemoteCloseCall()} />;
};
