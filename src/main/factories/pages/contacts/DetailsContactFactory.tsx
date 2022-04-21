import React from 'react';

import { DetailsContact } from '@/presentation/modules/contacts';

import { makeRemoteRemoveContact } from '../../usecases';

export const MakeDetailsContact: React.FC = () => {
  return <DetailsContact removeContact={makeRemoteRemoveContact()} />;
};
