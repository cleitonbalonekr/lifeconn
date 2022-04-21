// VerifyContactExistToUserRepository
import { AuthUser } from '@/domain/models';

export interface VerifyContactExistToUserRepository {
  contactAlreadyAddedToUser(
    params: VerifyContactExistToUserRepository.Params
  ): Promise<VerifyContactExistToUserRepository.Result>;
}

export namespace VerifyContactExistToUserRepository {
  export type Params = {
    userId: string;
    contactPhoneNumber: string;
  };
  export type Result = boolean;
}
