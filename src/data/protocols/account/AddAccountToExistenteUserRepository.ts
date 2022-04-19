/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */

export interface AddAccountToExistenteUserRepository {
  registerExistentUser: (
    params: AddAccountToExistenteUserRepository.Params,
    userId: string
  ) => Promise<AddAccountToExistenteUserRepository.Result>;
}

export namespace AddAccountToExistenteUserRepository {
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
    medicalData: [];
  };
}
