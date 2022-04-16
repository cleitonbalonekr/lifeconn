import { RemoteUpdateUserInfo } from '@/data/usecases';
import { UserNotFoundError } from '@/domain/errors';
import { fakeId } from '@/tests/shared/mocks';

import {
  GetUserByIdRepositorySpy,
  makeUpdateUserParams,
  UpdateUserInfoRepositorySpy
} from '../mock/user-mock';

const makeSut = () => {
  const getUserByIdRepositorySpy = new GetUserByIdRepositorySpy();
  const updateUserInfoRepositorySpy = new UpdateUserInfoRepositorySpy();
  const remoteUpdateUserInfo = new RemoteUpdateUserInfo(
    getUserByIdRepositorySpy,
    updateUserInfoRepositorySpy
  );
  return {
    remoteUpdateUserInfo,
    getUserByIdRepositorySpy,
    updateUserInfoRepositorySpy
  };
};

describe('RemoteUpdateUserInfo', () => {
  it('should throw UserNotFoundError when not find user with the given id', async () => {
    const { remoteUpdateUserInfo, getUserByIdRepositorySpy } = makeSut();
    const fakeUpdateInfo = makeUpdateUserParams();
    getUserByIdRepositorySpy.response = null;
    const promise = remoteUpdateUserInfo.update(fakeUpdateInfo, fakeId);
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('should return authUser info', async () => {
    const { remoteUpdateUserInfo } = makeSut();
    const fakeUpdateInfo = makeUpdateUserParams();
    const response = await remoteUpdateUserInfo.update(fakeUpdateInfo, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('authId');
    expect(response).toHaveProperty('email');
  });
});
