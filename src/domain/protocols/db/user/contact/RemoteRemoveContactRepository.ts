import { AuthUser } from '@/domain/models';

export interface RemoteRemoveContactRepository {
  removeContact(
    phoneNumber: string,
    userId: string
  ): Promise<RemoteRemoveContactRepository.Result>;
}

export namespace RemoteRemoveContactRepository {
  export type Result = AuthUser;
}
