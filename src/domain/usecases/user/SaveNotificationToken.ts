import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { UpdateNotificationTokenRepository } from '@/domain/protocols/db/user';

export type SaveNotificationTokenParams = {
  notificationToken: string;
  userId: string;
};

export type SaveNotificationTokenModel = AuthUser;

export class SaveNotificationToken {
  constructor(
    private readonly updateNotificationTokenRepository: UpdateNotificationTokenRepository
  ) {}

  async update({ userId, notificationToken }: SaveNotificationTokenParams) {
    try {
      const response =
        await this.updateNotificationTokenRepository.updateNotificationToken(
          notificationToken,
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
