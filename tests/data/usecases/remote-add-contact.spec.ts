import { RemoteAddContact } from '@/data/usecases';
import {
  ContactAlreadyAddedError,
  ContactNotFoundError,
  InvalidContactError,
  UnexpectedError
} from '@/domain/errors';
import { fakeId, randomId, throwError } from '@/tests/shared/mocks';

import {
  AddContactRepositorySpy,
  AddExistentContactRepositorySpy,
  CheckAccountPhoneNumberRepositorySpy,
  makeAddContactParams,
  VerifyContactExistToUserRepositorySpy
} from '../mock/contact-mock';

const makeSut = () => {
  const checkAccountPhoneNumberRepositorySpy =
    new CheckAccountPhoneNumberRepositorySpy();
  const addExistentContactRepositorySpy = new AddExistentContactRepositorySpy();
  const addContactRepositorySpy = new AddContactRepositorySpy();
  const verifyContactExistToUserRepositorySpy =
    new VerifyContactExistToUserRepositorySpy();
  const remoteAddContact = new RemoteAddContact(
    checkAccountPhoneNumberRepositorySpy,
    verifyContactExistToUserRepositorySpy,
    addExistentContactRepositorySpy,
    addContactRepositorySpy
  );
  return {
    remoteAddContact,
    verifyContactExistToUserRepositorySpy,
    checkAccountPhoneNumberRepositorySpy,
    addExistentContactRepositorySpy,
    addContactRepositorySpy
  };
};

describe('RemoteAddContact', () => {
  it('Should throw ContactAlreadyAddedError if an contact is already added', async () => {
    const { remoteAddContact, verifyContactExistToUserRepositorySpy } =
      makeSut();
    verifyContactExistToUserRepositorySpy.response = true;
    const promise = remoteAddContact.add(makeAddContactParams(), fakeId);
    await expect(promise).rejects.toThrow(new ContactAlreadyAddedError());

    expect(verifyContactExistToUserRepositorySpy.count).toBe(1);
  });
  it('Should throw InvalidContactError if when user try add herself', async () => {
    const { remoteAddContact, checkAccountPhoneNumberRepositorySpy } =
      makeSut();
    const userId = fakeId;
    checkAccountPhoneNumberRepositorySpy.response = {
      phoneNumberInUse: true,
      userId
    };
    const promise = remoteAddContact.add(makeAddContactParams(), userId);
    await expect(promise).rejects.toThrow(new InvalidContactError());
  });
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
      userId: randomId()
    };
    await remoteAddContact.add(makeAddContactParams(), fakeId);
    expect(addExistentContactRepositorySpy.count).toBe(1);
    expect(addContactRepositorySpy.count).toBe(0);
  });
  it('Should throw ContactNotFoundError in case of addExistentContactRepositorySpy dos not find the contact', async () => {
    const {
      remoteAddContact,
      addExistentContactRepositorySpy,
      checkAccountPhoneNumberRepositorySpy,
      addContactRepositorySpy
    } = makeSut();
    checkAccountPhoneNumberRepositorySpy.response = {
      phoneNumberInUse: true,
      userId: randomId()
    };
    addExistentContactRepositorySpy.response = null;
    const promise = remoteAddContact.add(makeAddContactParams(), fakeId);
    await expect(promise).rejects.toThrow(new ContactNotFoundError());
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
