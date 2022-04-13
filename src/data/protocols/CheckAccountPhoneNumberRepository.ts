/* eslint-disable no-redeclare */
export interface CheckAccountPhoneNumberRepository {
  checkPhoneNumber: (
    phoneNumber: string
  ) => Promise<CheckAccountPhoneNumberRepository.Result>;
}

export namespace CheckAccountPhoneNumberRepository {
  export type Result = boolean;
}
