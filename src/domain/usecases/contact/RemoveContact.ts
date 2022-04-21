import { AuthUser } from '@/domain/models';

export interface RemoveContact {
  remove: (
    phoneNumber: string,
    userId: string
  ) => Promise<RemoveContact.Result>;
}

export namespace RemoveContact {
  export type Result = AuthUser;
}
