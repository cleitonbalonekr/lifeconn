import { RemoteLogoutUser } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { throwError } from '@/tests/shared/mocks';

import { SignOutRepositorySpy } from '../mock/auth-mock';

const makeSut = () => {
  const signOutRepositorySpy = new SignOutRepositorySpy();
  const remoteLogoutUser = new RemoteLogoutUser(signOutRepositorySpy);
  return {
    signOutRepositorySpy,
    remoteLogoutUser
  };
};

describe('RemoteLogoutUser', () => {
  it('Should call signOutRepository', async () => {
    const { remoteLogoutUser, signOutRepositorySpy } = makeSut();
    await remoteLogoutUser.signOut();
    expect(signOutRepositorySpy.callCount).toBe(1);
  });
  it('Should throw UnexpectedError if some error happens', async () => {
    const { remoteLogoutUser, signOutRepositorySpy } = makeSut();
    jest
      .spyOn(signOutRepositorySpy, 'signOut')
      .mockImplementationOnce(throwError);
    const promise = remoteLogoutUser.signOut();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
