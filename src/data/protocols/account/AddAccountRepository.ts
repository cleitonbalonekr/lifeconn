/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */

import { Contact, MedicalData } from '@/domain/models';

export interface AddAccountRepository {
  register: (
    params: AddAccountRepository.Params
  ) => Promise<AddAccountRepository.Result>;
}

export namespace AddAccountRepository {
  export type Params = {
    phoneNumber: string;
    email: string;
    password: string;
  };

  export type Result = {
    authId: string;
    id: string;
    email: string;
    phoneNumber: string;
    medicalData: MedicalData[];
    contacts: Contact[];
  };
}
