import faker from '@faker-js/faker';

import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases/account';
import { throwError } from '@/tests/shared/mocks';

import {
  AddAccountRepositorySpy,
  AddAccountToExistenteUserRepositorySpy,
  CheckAccountByEmailRepositorySpy,
  CheckAccountPhoneNumberRepositorySpy,
  fakeUseRegisterData,
  AddUserIdToExistentContactRepositorySpy
} from '../mock';

const makeSut = () => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const addAccountToExistenteUserRepositorySpy =
    new AddAccountToExistenteUserRepositorySpy();
  const checkAccountPhoneNumberRepositorySpy =
    new CheckAccountPhoneNumberRepositorySpy();
  const checkAccountByEmailRepositorySpy =
    new CheckAccountByEmailRepositorySpy();
  const addUserIdToExistentContactRepositorySpy =
    new AddUserIdToExistentContactRepositorySpy();
  const remoteAddAccount = new AddAccount(
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountPhoneNumberRepositorySpy,
    addAccountToExistenteUserRepositorySpy,
    addUserIdToExistentContactRepositorySpy
  );
  return {
    remoteAddAccount,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountPhoneNumberRepositorySpy,
    addAccountToExistenteUserRepositorySpy,
    addUserIdToExistentContactRepositorySpy
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
  it('should call addAccountToExistenteUserRepository when phone number is in use ', async () => {
    const {
      remoteAddAccount,
      checkAccountPhoneNumberRepositorySpy,
      addAccountToExistenteUserRepositorySpy,
      addUserIdToExistentContactRepositorySpy
    } = makeSut();
    checkAccountPhoneNumberRepositorySpy.isInUse = true;
    const fakeRegisterData = fakeUseRegisterData();
    checkAccountPhoneNumberRepositorySpy.userId = faker.random.alphaNumeric(8);
    const response = await remoteAddAccount.add(fakeRegisterData);
    expect(addAccountToExistenteUserRepositorySpy.callCount).toBe(1);
    expect(addUserIdToExistentContactRepositorySpy.callCount).toBe(1);
    expect(response).toHaveProperty('id');
    expect(response).toEqual({
      ...addAccountToExistenteUserRepositorySpy.fakeResponse,
      id: checkAccountPhoneNumberRepositorySpy.userId
    });
  });
  it('should throw UnexpectedError when a error that is not expect happen', async () => {
    const { remoteAddAccount, addAccountRepositorySpy } = makeSut();
    jest
      .spyOn(addAccountRepositorySpy, 'register')
      .mockImplementationOnce(throwError);

    const fakeRegisterData = fakeUseRegisterData();
    const promise = remoteAddAccount.add(fakeRegisterData);

    await expect(promise).rejects.toThrow(new UnexpectedError());
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
