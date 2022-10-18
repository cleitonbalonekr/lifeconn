import React from 'react';

import {
  makeRemoteAddMedicalData,
  makeRemoteUpdateMedicalData,
  makeRemoteDeleteMedicalData
} from '@/main/factories/usecases/medicalData';
import { MedicalInfo } from '@/presentation/modules/settings';

import { makeMedicalInfoValidation } from '../../validation/medicalInfoValidationFactory';

export const MakeMedicalInfo: React.FC = () => {
  return (
    <MedicalInfo
      validation={makeMedicalInfoValidation()}
      addMedicalData={makeRemoteAddMedicalData()}
      updateMedicalData={makeRemoteUpdateMedicalData()}
      deleteMedicalData={makeRemoteDeleteMedicalData()}
    />
  );
};
