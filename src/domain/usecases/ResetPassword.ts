export interface ResetPassword {
  recovery: (email: ResetPassword.Params) => Promise<ResetPassword.Model>;
}

export namespace ResetPassword {
  export type Params = string;

  export type Model = boolean;
}
