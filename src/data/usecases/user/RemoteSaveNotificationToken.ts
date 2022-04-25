import { UpdateNotificationTokenRepository } from '@/data/protocols/user';
import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SaveNotificationToken } from '@/domain/usecases';

export class RemoteSaveNotificationToken implements SaveNotificationToken {
  constructor(
    private readonly updateNotificationTokenRepository: UpdateNotificationTokenRepository
  ) {}

  async update({ userId, notificationToken }: SaveNotificationToken.Params) {
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
