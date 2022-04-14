import { RemoteAuthentication } from '@/data/usecases';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { UserNotFoundError } from '@/domain/errors/UserNotFoundError';

import {
  getFakeCredentials,
  GetUserInfoByAuthRepositorySpy,
  SignInWithEmailAndPasswordRepositorySpy,
  throwError
} from '../mock/auth-mock';

const makeSut = () => {
  const signInWithEmailAndPasswordRepositorySpy =
    new SignInWithEmailAndPasswordRepositorySpy();
  const getUserInfoByAuthRepositorySpy = new GetUserInfoByAuthRepositorySpy();
  const remoteAuthentication = new RemoteAuthentication(
    signInWithEmailAndPasswordRepositorySpy,
    getUserInfoByAuthRepositorySpy
  );
  return {
    remoteAuthentication,
    signInWithEmailAndPasswordRepositorySpy,
    getUserInfoByAuthRepositorySpy
  };
};

describe('RemoteAuthentication', () => {
  it('should throw InvalidCredentialsError if invalid credenciais are provided', async () => {
    const { remoteAuthentication, signInWithEmailAndPasswordRepositorySpy } =
      makeSut();
    signInWithEmailAndPasswordRepositorySpy.response = null;
    const fakeCredentials = getFakeCredentials();
    const promise = remoteAuthentication.auth(fakeCredentials);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
  it('should throw UserNotFoundError if invalid authId is provided', async () => {
    const { remoteAuthentication, getUserInfoByAuthRepositorySpy } = makeSut();
    getUserInfoByAuthRepositorySpy.response = null;
    const fakeCredentials = getFakeCredentials();
    const promise = remoteAuthentication.auth(fakeCredentials);

    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('should throw UnexpectedError when a error that is not expect happen', async () => {
    const { remoteAuthentication, getUserInfoByAuthRepositorySpy } = makeSut();
    jest
      .spyOn(getUserInfoByAuthRepositorySpy, 'getUserByAuthId')
      .mockImplementationOnce(throwError);

    const fakeCredentials = getFakeCredentials();
    const promise = remoteAuthentication.auth(fakeCredentials);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should return AuthUser', async () => {
    const {
      remoteAuthentication,
      getUserInfoByAuthRepositorySpy,
      signInWithEmailAndPasswordRepositorySpy
    } = makeSut();

    const fakeCredentials = getFakeCredentials();
    const response = await remoteAuthentication.auth(fakeCredentials);
    const expectedResponse = {
      ...getUserInfoByAuthRepositorySpy.response,
      authId: signInWithEmailAndPasswordRepositorySpy.response.authId
    };
    expect(response).toEqual(expectedResponse);
  });
});
