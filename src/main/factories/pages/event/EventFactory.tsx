import React from 'react';

import { Event } from '@/presentation/modules/event';

import { makeRemoteSendContactsNotification } from '../../usecases';
import {
  makeRemoteCreateCall,
  makeRemoteCreateCallForAnotherPerson
} from '../../usecases/call';

export const MakeEvent: React.FC = () => {
  return (
    <Event
      createCall={makeRemoteCreateCall()}
      createCallForAnotherPerson={makeRemoteCreateCallForAnotherPerson()}
      sendContactsNotification={makeRemoteSendContactsNotification()}
    />
  );
};
