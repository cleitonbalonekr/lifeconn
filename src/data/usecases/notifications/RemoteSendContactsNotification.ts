import { SendPushNotification } from '@/data/gateways/notification';
import { GetUserContactsNotificationToken } from '@/data/protocols/user';
import { UnexpectedError, UserNotFoundError } from '@/domain/errors';
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
      const send = await this.sendNotification.notify(tokens, fullName);
      if (!send) {
        throw new UnexpectedError();
      }
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
