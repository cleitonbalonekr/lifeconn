import { AuthUser } from '@/domain/models';

export interface GetUserByIdRepository {
  getUser(
    userId: GetUserByIdRepository.Params
  ): Promise<GetUserByIdRepository.Result>;
}

export namespace GetUserByIdRepository {
  export type Params = string;
  export type Result = AuthUser | null;
}
