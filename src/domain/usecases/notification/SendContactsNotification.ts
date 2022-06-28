import { UnexpectedError, UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { GetUserContactsNotificationToken } from '@/domain/protocols/db/user';
import { SendPushNotification } from '@/domain/protocols/notification';

export type SendContactsNotificationModel = void;

export class SendContactsNotification {
  constructor(
    private readonly getUserContactsNotificationToken: GetUserContactsNotificationToken,
    private readonly sendNotification: SendPushNotification
  ) {}

  async notifyContacts(userId: string) {
    try {
      const response =
        await this.getUserContactsNotificationToken.getNotificationTokens(
          userId
        );
      if (!response) {
        throw new UserNotFoundError();
      }
      const { tokens, fullName } = response;
      if (tokens.length > 0) {
        const send = await this.sendNotification.notify(tokens, fullName);
        if (!send) {
          throw new UnexpectedError();
        }
      }
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
