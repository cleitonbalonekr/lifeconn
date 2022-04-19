import { RemoteUpdateUserInfo } from '@/data/usecases';
import { UserNotFoundError } from '@/domain/errors';
import { fakeId } from '@/tests/shared/mocks';

import {
  makeUpdateUserParams,
  UpdateUserInfoRepositorySpy
} from '../mock/user-mock';

const makeSut = () => {
  const updateUserInfoRepositorySpy = new UpdateUserInfoRepositorySpy();
  const remoteUpdateUserInfo = new RemoteUpdateUserInfo(
    updateUserInfoRepositorySpy
  );
  return {
    remoteUpdateUserInfo,
    updateUserInfoRepositorySpy
  };
};

describe('RemoteUpdateUserInfo', () => {
  it('should throw UserNotFoundError when not find user with the given id', async () => {
    const { remoteUpdateUserInfo, updateUserInfoRepositorySpy } = makeSut();
    const fakeUpdateInfo = makeUpdateUserParams();
    updateUserInfoRepositorySpy.response = null;
    const promise = remoteUpdateUserInfo.update(fakeUpdateInfo, fakeId);
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('should return authUser info', async () => {
    const { remoteUpdateUserInfo } = makeSut();
    const fakeUpdateInfo = makeUpdateUserParams();
    const response = await remoteUpdateUserInfo.update(
      { ...fakeUpdateInfo, totalVoiceToken: undefined },
      fakeId
    );
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('authId');
    expect(response).toHaveProperty('email');
  });
});
