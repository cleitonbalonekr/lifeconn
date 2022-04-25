import { RemoteSendContactsNotification } from '@/data/usecases';
import { UnexpectedError, UserNotFoundError } from '@/domain/errors';
import { fakeId, randomId, throwError } from '@/tests/shared/mocks';

import {
  SendPushNotificationSpy,
  GetUserContactsNotificationTokenSpy
} from '../mock/notification-mock';

const makeSut = () => {
  const getUserContactsNotificationTokenSpy =
    new GetUserContactsNotificationTokenSpy();
  const sendPushNotificationSpy = new SendPushNotificationSpy();
  const remoteSendContactsNotifications = new RemoteSendContactsNotification(
    getUserContactsNotificationTokenSpy,
    sendPushNotificationSpy
  );
  return {
    remoteSendContactsNotifications,
    getUserContactsNotificationTokenSpy,
    sendPushNotificationSpy
  };
};

describe('RemoteSendContactsNotification', () => {
  const userId = randomId();
  it('should throw UserNotFoundError when not find user with the given id', async () => {
    const {
      remoteSendContactsNotifications,
      getUserContactsNotificationTokenSpy
    } = makeSut();

    getUserContactsNotificationTokenSpy.response = null;
    const promise = remoteSendContactsNotifications.notifyContacts(userId);
    expect(getUserContactsNotificationTokenSpy.callCount).toEqual(1);
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('should throw UnexpectedError when some unexpected error occurs', async () => {
    const {
      remoteSendContactsNotifications,
      getUserContactsNotificationTokenSpy
    } = makeSut();
    jest
      .spyOn(getUserContactsNotificationTokenSpy, 'getNotificationTokens')
      .mockImplementationOnce(throwError);

    const promise = remoteSendContactsNotifications.notifyContacts(userId);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should call getUserContactsNotificationTokenSpy', async () => {
    const { remoteSendContactsNotifications, sendPushNotificationSpy } =
      makeSut();

    await remoteSendContactsNotifications.notifyContacts(userId);
    expect(sendPushNotificationSpy.callCount).toEqual(1);
  });
});
