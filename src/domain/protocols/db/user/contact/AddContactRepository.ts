import { AuthUser } from '@/domain/models';

export interface AddContactRepository {
  addContact(
    params: AddContactRepository.Params,
    currentUserId: string
  ): Promise<AddContactRepository.Result>;
}

export namespace AddContactRepository {
  export type Params = {
    nickname: string;
    phoneNumber: string;
  };
  export type Result = AuthUser;
}
