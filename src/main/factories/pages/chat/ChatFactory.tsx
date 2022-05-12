import React from 'react';

import { Chat } from '@/presentation/modules/chat';

import {
  makeRemoteCreateMessage,
  makeRemoteLoadCallMessage,
  makeRemoteSubscribeToMessages
} from '../../usecases';
import { makeRemoteStoreFile } from '../../usecases/messages/remoteStoreFileFactory';

export const MakeChat: React.FC = () => {
  return (
    <Chat
      sendMessage={makeRemoteCreateMessage()}
      loadMessages={makeRemoteLoadCallMessage()}
      subscribeToMessages={makeRemoteSubscribeToMessages()}
      storeFile={makeRemoteStoreFile()}
    />
  );
};
