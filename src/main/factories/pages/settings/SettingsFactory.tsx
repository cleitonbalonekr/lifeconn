import React from 'react';

import { Settings } from '@/presentation/modules/settings';

import { makeSettingsValidation } from '../../validation/settingsValidationFactory';

export const MakeSettings: React.FC = () => {
  return <Settings validation={makeSettingsValidation()} />;
};
