import { RemoteRemoveContact } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { fakeId, throwError } from '@/tests/shared/mocks';

import {
  makeAddContactParams,
  RemoteRemoveContactRepositorySpy
} from '../mock/contact-mock';

const makeSut = () => {
  const remoteRemoveContactRepositorySpy =
    new RemoteRemoveContactRepositorySpy();
  const remoteRemoveContact = new RemoteRemoveContact(
    remoteRemoveContactRepositorySpy
  );
  return {
    remoteRemoveContact,
    remoteRemoveContactRepositorySpy
  };
};

describe('RemoteRemoveContact', () => {
  it('Should throw UnexpectedError if an some error happens', async () => {
    const { remoteRemoveContact, remoteRemoveContactRepositorySpy } = makeSut();
    jest
      .spyOn(remoteRemoveContactRepositorySpy, 'removeContact')
      .mockImplementationOnce(throwError);
    const promise = remoteRemoveContact.remove(
      makeAddContactParams().phoneNumber,
      fakeId
    );
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('Should call  remoteRemoveContactRepository ', async () => {
    const { remoteRemoveContact, remoteRemoveContactRepositorySpy } = makeSut();
    const user = await remoteRemoveContact.remove(
      makeAddContactParams().phoneNumber,
      fakeId
    );
    expect(user).toHaveProperty('phoneNumber');
    expect(remoteRemoveContactRepositorySpy.count).toBe(1);
  });
});
