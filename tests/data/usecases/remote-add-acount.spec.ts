import { RemoteAddAccount } from '@/data/usecases/RemoteAddAccount';
import { EmailInUseError } from '@/domain/errors';

import {
  AddAccountRepositorySpy,
  CheckAccountByEmailRepositorySpy,
  CheckAccountPhoneNumberRepositorySpy,
  fakeUseRegisterData
} from '../mock';

const makeSut = () => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const checkAccountPhoneNumberRepositorySpy =
    new CheckAccountPhoneNumberRepositorySpy();
  const checkAccountByEmailRepositorySpy =
    new CheckAccountByEmailRepositorySpy();
  const remoteAddAccount = new RemoteAddAccount(
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountPhoneNumberRepositorySpy
  );
  return {
    remoteAddAccount,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
  };
};

describe('RemoteAddAccount', () => {
  it('should throw EmailInUseError when email is in use', async () => {
    const { remoteAddAccount, checkAccountByEmailRepositorySpy } = makeSut();
    checkAccountByEmailRepositorySpy.isInUse = true;
    const fakeRegisterData = fakeUseRegisterData();
    const promise = remoteAddAccount.add(fakeRegisterData);
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
  it('should call AddAccountRepository and return authUser', async () => {
    const { remoteAddAccount, addAccountRepositorySpy } = makeSut();
    const fakeRegisterData = fakeUseRegisterData();
    const response = await remoteAddAccount.add(fakeRegisterData);
    expect(addAccountRepositorySpy.callCount).toBe(1);
    expect(response).toHaveProperty('id');
    expect(response).toEqual(addAccountRepositorySpy.fakeResponse);
  });
});
