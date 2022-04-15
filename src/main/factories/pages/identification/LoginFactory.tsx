import React from 'react';

import { Login } from '@/presentation/modules/identification';

import {
  makeRemoteAddAccount,
  makeRemoteAuthentication,
  makeRemoteResetPassword
} from '../../usecases';
import { makeLoginValidation } from '../../validation/loginValidationFactory';

export const MakeLogin: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidation()}
      authentication={makeRemoteAuthentication()}
      addAccount={makeRemoteAddAccount()}
      resetPassword={makeRemoteResetPassword()}
    />
  );
};
