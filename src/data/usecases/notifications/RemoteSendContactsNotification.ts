import { SendPushNotification } from '@/data/protocols/notification/SendPushNotification';
import { GetUserContactsNotificationToken } from '@/data/protocols/user';
import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SendContactsNotification } from '@/domain/usecases/notification';

export class RemoteSendContactsNotification
  implements SendContactsNotification
{
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
      await this.sendNotification.notify(tokens, fullName);
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
