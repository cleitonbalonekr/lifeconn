/* eslint-disable no-redeclare */
export interface SendEmailToRecoveryPassword {
  sendEmail: (
    email: SendEmailToRecoveryPassword.Params
  ) => Promise<SendEmailToRecoveryPassword.Result>;
}

export namespace SendEmailToRecoveryPassword {
  export type Result = boolean;
  export type Params = string;
}
