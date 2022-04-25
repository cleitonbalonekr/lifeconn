/* eslint-disable max-classes-per-file */
import { SendPushNotification } from '@/data/protocols/notification';
import { GetUserContactsNotificationToken } from '@/data/protocols/user';
import { randomId } from '@/tests/shared/mocks';

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

  async notify(tokens: string[], victimName: string): Promise<void> {
    this.callCount += 1;
  }
}
