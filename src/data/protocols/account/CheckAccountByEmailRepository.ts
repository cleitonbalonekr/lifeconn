/* eslint-disable no-redeclare */
export interface CheckAccountByEmailRepository {
  checkByEmail: (
    email: string
  ) => Promise<CheckAccountByEmailRepository.Result>;
}

export namespace CheckAccountByEmailRepository {
  export type Result = {
    emailInUse: boolean;
    userId: string;
  };
}
