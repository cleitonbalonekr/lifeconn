/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { AuthUser } from '@/domain/models';

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>;
}

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Model = AuthUser;
}
