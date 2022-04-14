import { AuthUser } from '@/domain/models';

export interface GetUserInfoByAuthRepository {
  getUserByAuthId(
    authId: GetUserInfoByAuthRepository.Params
  ): Promise<GetUserInfoByAuthRepository.Result>;
}

export namespace GetUserInfoByAuthRepository {
  export type Params = string;

  export type Result = AuthUser | null;
}
