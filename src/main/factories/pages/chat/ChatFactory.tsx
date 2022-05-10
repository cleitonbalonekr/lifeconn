import React from 'react';

import { Chat } from '@/presentation/modules/chat';

import {
  makeRemoteCreateMessage,
  makeRemoteLoadCallMessage,
  makeRemoteSubscribeToMessages
} from '../../usecases';

export const MakeChat: React.FC = () => {
  return (
    <Chat
      sendMessage={makeRemoteCreateMessage()}
      loadMessages={makeRemoteLoadCallMessage()}
      subscribeToMessages={makeRemoteSubscribeToMessages()}
    />
  );
};
