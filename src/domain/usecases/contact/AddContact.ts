import { AuthUser } from '@/domain/models';

export interface AddContact {
  add: (
    params: AddContact.Params,
    currentUserId: string
  ) => Promise<AddContact.Result>;
}

export namespace AddContact {
  export type Params = {
    phoneNumber: string;
    nickname: string;
  };

  export type Result = AuthUser;
}
