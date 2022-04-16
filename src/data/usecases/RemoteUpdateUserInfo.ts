import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

import { UpdateUserInfoRepository } from '../protocols/user';

export class RemoteUpdateUserInfo implements UpdateUserInfo {
  constructor(private updateUserInfoRepository: UpdateUserInfoRepository) {}

  async update(params: UpdateUserInfo.Params, userId: string) {
    try {
      const response = await this.updateUserInfoRepository.updateUser(
        params,
        userId
      );
      if (!response) {
        throw new UserNotFoundError();
      }
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
