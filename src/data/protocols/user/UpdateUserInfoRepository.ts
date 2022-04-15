import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

export interface UpdateUserInfoRepository {
  updateUser(
    params: UpdateUserInfoRepository.Params,
    userId: string
  ): Promise<UpdateUserInfoRepository.Result>;
}

export namespace UpdateUserInfoRepository {
  export type Params = UpdateUserInfo.Params;
  export type Result = AuthUser;
}
