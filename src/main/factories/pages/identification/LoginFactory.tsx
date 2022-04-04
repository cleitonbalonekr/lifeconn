import React from 'react';

import { Login } from '@/presentation/modules/identification';

import { makeLoginValidation } from '../../validation/loginValidationFactory';

export const MakeLogin: React.FC = () => {
  return <Login validation={makeLoginValidation()} />;
};
