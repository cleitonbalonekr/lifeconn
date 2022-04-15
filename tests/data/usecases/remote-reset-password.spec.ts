import { RemoteResetPassword } from '@/data/usecases';
import { UnexpectedError, UserNotFoundError } from '@/domain/errors';

import {
  getFakeCredentials,
  SendEmailToRecoveryPasswordSpy,
  throwError
} from '../mock/auth-mock';

const makeSut = () => {
  const sendEmailToRecoveryPasswordSpy = new SendEmailToRecoveryPasswordSpy();
  const remoteResetPassword = new RemoteResetPassword(
    sendEmailToRecoveryPasswordSpy
  );
  return {
    remoteResetPassword,
    sendEmailToRecoveryPasswordSpy
  };
};

describe('RemoteResetPassword ', () => {
  it('should call SendEmailToRecoveryPassword ', async () => {
    const { remoteResetPassword, sendEmailToRecoveryPasswordSpy } = makeSut();
    const { email } = getFakeCredentials();
    await remoteResetPassword.recovery(email);
    expect(sendEmailToRecoveryPasswordSpy.callCount).toBe(1);
  });
  it('should throw unexpectedError is some erro happen ', async () => {
    const { remoteResetPassword, sendEmailToRecoveryPasswordSpy } = makeSut();
    const { email } = getFakeCredentials();
    jest
      .spyOn(sendEmailToRecoveryPasswordSpy, 'sendEmail')
      .mockImplementationOnce(throwError);
    const promise = remoteResetPassword.recovery(email);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UserNotFoundError if user not exist ', async () => {
    const { remoteResetPassword, sendEmailToRecoveryPasswordSpy } = makeSut();
    const { email } = getFakeCredentials();
    sendEmailToRecoveryPasswordSpy.response = false;
    const promise = remoteResetPassword.recovery(email);
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
});
