import { RemoteAddContact } from '@/data/usecases';
import { ContactAlreadyAddedError, UnexpectedError } from '@/domain/errors';
import { fakeId, throwError } from '@/tests/shared/mocks';

import {
  AddContactRepositorySpy,
  AddExistentContactRepositorySpy,
  CheckAccountPhoneNumberRepositorySpy,
  makeAddContactParams
} from '../mock/contact-mock';

const makeSut = () => {
  const checkAccountPhoneNumberRepositorySpy =
    new CheckAccountPhoneNumberRepositorySpy();
  const addExistentContactRepositorySpy = new AddExistentContactRepositorySpy();
  const addContactRepositorySpy = new AddContactRepositorySpy();
  const remoteAddContact = new RemoteAddContact(
    checkAccountPhoneNumberRepositorySpy,
    addExistentContactRepositorySpy,
    addContactRepositorySpy
  );
  return {
    remoteAddContact,
    checkAccountPhoneNumberRepositorySpy,
    addExistentContactRepositorySpy,
    addContactRepositorySpy
  };
};

describe('RemoteAddContact', () => {
  it('Should call checkAccountPhoneNumberRepository', async () => {
    const { remoteAddContact, checkAccountPhoneNumberRepositorySpy } =
      makeSut();
    await remoteAddContact.add(makeAddContactParams(), fakeId);
    expect(checkAccountPhoneNumberRepositorySpy.count).toBe(1);
  });
  it('Should call addExistentContactRepositorySpy to existent contact', async () => {
    const {
      remoteAddContact,
      addExistentContactRepositorySpy,
      checkAccountPhoneNumberRepositorySpy,
      addContactRepositorySpy
    } = makeSut();
    checkAccountPhoneNumberRepositorySpy.response = {
      phoneNumberInUse: true,
      userId: fakeId
    };
    await remoteAddContact.add(makeAddContactParams(), fakeId);
    expect(addExistentContactRepositorySpy.count).toBe(1);
    expect(addContactRepositorySpy.count).toBe(0);
  });
  it('Should throw ContactAlreadyAddedError to an existent user that is already added', async () => {
    const {
      remoteAddContact,
      addExistentContactRepositorySpy,
      checkAccountPhoneNumberRepositorySpy,
      addContactRepositorySpy
    } = makeSut();
    checkAccountPhoneNumberRepositorySpy.response = {
      phoneNumberInUse: true,
      userId: fakeId
    };
    addExistentContactRepositorySpy.response = null;
    const promise = remoteAddContact.add(makeAddContactParams(), fakeId);
    await expect(promise).rejects.toThrow(new ContactAlreadyAddedError());
    expect(addContactRepositorySpy.count).toBe(0);
  });
  it('Should call addContactRepositorySpy to an inexistent contact', async () => {
    const {
      remoteAddContact,
      addContactRepositorySpy,
      addExistentContactRepositorySpy
    } = makeSut();
    await remoteAddContact.add(makeAddContactParams(), fakeId);
    expect(addContactRepositorySpy.count).toBe(1);
    expect(addExistentContactRepositorySpy.count).toBe(0);
  });
  it('Should throw UnexpectedError if something unexpected happens', async () => {
    const { remoteAddContact, checkAccountPhoneNumberRepositorySpy } =
      makeSut();
    jest
      .spyOn(checkAccountPhoneNumberRepositorySpy, 'checkPhoneNumber')
      .mockImplementationOnce(throwError);

    const promise = remoteAddContact.add(makeAddContactParams(), fakeId);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
