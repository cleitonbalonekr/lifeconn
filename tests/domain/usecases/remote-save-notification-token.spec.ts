import { UnexpectedError, UserNotFoundError } from '@/domain/errors';
import { SaveNotificationToken } from '@/domain/usecases';
import { fakeId, throwError } from '@/tests/shared/mocks';

import {
  makeUpdateUserParams,
  UpdateNotificationTokenRepositorySpy
} from '../mock/user-mock';

const makeSut = () => {
  const updateNotificationTokenRepository =
    new UpdateNotificationTokenRepositorySpy();
  const remoteSaveNotificationToken = new SaveNotificationToken(
    updateNotificationTokenRepository
  );
  return {
    remoteSaveNotificationToken,
    updateNotificationTokenRepository
  };
};

describe('RemoteSaveNotificationToken', () => {
  it('should throw UserNotFoundError when not find user with the given id', async () => {
    const { remoteSaveNotificationToken, updateNotificationTokenRepository } =
      makeSut();

    updateNotificationTokenRepository.response = null;
    const promise = remoteSaveNotificationToken.update({
      notificationToken: fakeId,
      userId: fakeId
    });
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('should throw UnexpectedError when some unexpected error occurs', async () => {
    const { remoteSaveNotificationToken, updateNotificationTokenRepository } =
      makeSut();
    jest
      .spyOn(updateNotificationTokenRepository, 'updateNotificationToken')
      .mockImplementationOnce(throwError);

    const promise = remoteSaveNotificationToken.update({
      notificationToken: fakeId,
      userId: fakeId
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should call updateNotificationTokenRepository', async () => {
    const { remoteSaveNotificationToken, updateNotificationTokenRepository } =
      makeSut();
    const params = {
      notificationToken: fakeId,
      userId: fakeId
    };
    const response = await remoteSaveNotificationToken.update(params);
    expect(updateNotificationTokenRepository.callCount).toEqual(1);
  });
});
