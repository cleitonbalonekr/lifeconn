import { AuthUser } from '@/domain/models';

export interface AddExistentContactRepository {
  addExistentContact(
    params: AddExistentContactRepository.Params,
    currentUserId: string
  ): Promise<AddExistentContactRepository.Result>;
}

export namespace AddExistentContactRepository {
  export type Params = {
    nickname: string;
    phoneNumber: string;
    contactId: string;
  };
  export type Result = AuthUser | null;
}
