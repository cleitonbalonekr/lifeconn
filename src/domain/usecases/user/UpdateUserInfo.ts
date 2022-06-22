import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfoRepository } from '@/domain/protocols/db/user';

export type UpdateUserInfoParams = {
  fullName: string;
  email: string;
  phoneNumber: string;
  totalVoiceToken?: string;
  impactActivation: boolean;
};

export type UpdateUserInfoModel = AuthUser;

export class UpdateUserInfo {
  constructor(private updateUserInfoRepository: UpdateUserInfoRepository) {}

  async update(params: UpdateUserInfoParams, userId: string) {
    try {
      const payload = { ...params };
      if (payload.totalVoiceToken !== '' && !payload.totalVoiceToken) {
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
