import React from 'react';

import { CreateContacts } from '@/presentation/modules/contacts';

import { makeRemoteAddContact } from '../../usecases';
import { makeCreateContactValidationFactory } from '../../validation/makeCreateContactValidationFactory';

export const MakeCreateContacts: React.FC = () => {
  return (
    <CreateContacts
      validation={makeCreateContactValidationFactory()}
      addContact={makeRemoteAddContact()}
    />
  );
};
