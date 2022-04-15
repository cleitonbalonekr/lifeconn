import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

import {
  GetUserByIdRepository,
  UpdateUserInfoRepository
} from '../protocols/user';

export class RemoteUpdateUserInfo implements UpdateUserInfo {
  constructor(
    private getUserByIdRepository: GetUserByIdRepository,
    private updateUserInfoRepository: UpdateUserInfoRepository
  ) {}

  async update(params: UpdateUserInfo.Params, userId: string) {
    try {
      const foundUser = await this.getUserByIdRepository.getUser(userId);
      if (!foundUser) {
        throw new UserNotFoundError();
      }
      const response = await this.updateUserInfoRepository.updateUser(
        params,
        foundUser.id
      );
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
