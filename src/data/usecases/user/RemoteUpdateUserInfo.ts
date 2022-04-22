import { UpdateUserInfoRepository } from '@/data/protocols/user';
import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { UpdateUserInfo } from '@/domain/usecases';

export class RemoteUpdateUserInfo implements UpdateUserInfo {
  constructor(private updateUserInfoRepository: UpdateUserInfoRepository) {}

  async update(params: UpdateUserInfo.Params, userId: string) {
    try {
      const payload = { ...params };
      if (!payload.totalVoiceToken) {
        delete payload.totalVoiceToken;
      }

      const response = await this.updateUserInfoRepository.updateUser(
        payload,
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
