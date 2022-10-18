import React from 'react';

import { HelpSomeoneElse } from '@/presentation/modules/home';

import { makeHelpSomeoneElseValidation } from '../../validation/helpSomeoneElseValidationFactory';

export const MakeHelpSomeoneElse: React.FC = () => {
  return <HelpSomeoneElse validation={makeHelpSomeoneElseValidation()} />;
};
