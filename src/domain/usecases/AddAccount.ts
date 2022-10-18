/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { AuthUser } from '@/domain/models';

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Model>;
}

export namespace AddAccount {
  export type Params = {
    phoneNumber: string;
    email: string;
    password: string;
  };

  export type Model = AuthUser;
}
