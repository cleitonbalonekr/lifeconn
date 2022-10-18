import { AuthUser } from '../models';

export interface UpdateUserInfo {
  update: (
    params: UpdateUserInfo.Params,
    userId: string
  ) => Promise<UpdateUserInfo.Model>;
}

export namespace UpdateUserInfo {
  export type Params = {
    fullName: string;
    email: string;
    phoneNumber: string;
    totalVoiceToken?: string;
    impactActivation: boolean;
  };

  export type Model = AuthUser;
}
