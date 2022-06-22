/* eslint-disable max-classes-per-file */
import { GetUserContactsNotificationToken } from '@/domain/protocols/db/user';
import { SendPushNotification } from '@/domain/protocols/notification';

export class GetUserContactsNotificationTokenSpy
  implements GetUserContactsNotificationToken
{
  public response: GetUserContactsNotificationToken.Result = {
    tokens: [''],
    fullName: ''
  };

  public callCount = 0;

  async getNotificationTokens(
    userId: string
  ): Promise<GetUserContactsNotificationToken.Result> {
    this.callCount += 1;
    return this.response;
  }
}
export class SendPushNotificationSpy implements SendPushNotification {
  public callCount = 0;

  public response = true;

  async notify(tokens: string[], victimName: string): Promise<boolean> {
    this.callCount += 1;
    return this.response;
  }
}
