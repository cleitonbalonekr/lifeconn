import { SendPushNotification } from '@/data/protocols/notification/SendPushNotification';
import { GetUserContactsNotificationToken } from '@/data/protocols/user';
import { SendContactsNotification } from '@/domain/usecases/notification';

export class RemoteSendContactsNotification
  implements SendContactsNotification
{
  constructor(
    private readonly getUserContactsNotificationToken: GetUserContactsNotificationToken,
    private readonly sendNotification: SendPushNotification
  ) {}

  async notifyContacts(userId: string) {
    const { tokens, fullName } =
      await this.getUserContactsNotificationToken.getNotificationTokens(userId);
    await this.sendNotification.notify(tokens, fullName);
  }
}
