import React from 'react';

import { MedicalInfo } from '@/presentation/modules/settings';

import { makeMedicalInfoValidation } from '../../validation/medicalInfoValidationFactory';

export const MakeMedicalInfo: React.FC = () => {
  return <MedicalInfo validation={makeMedicalInfoValidation()} />;
};
