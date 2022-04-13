import { FirebaseError } from 'firebase/app';

import { FirebaseAddAccountRepository } from '@/infra/firebase/FirebaseAddAccountRepository';
import {
  setupEmulators,
  cleanEmulators,
  closeFirebase
} from '@/tests/utils/firebase-emulator';

import { fakeUseRegisterData } from '../mock';

const makeSut = () => {
  return new FirebaseAddAccountRepository();
};

describe('AuthAddAccount', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });
  it('Should not register an user with the same email', async () => {
    const sut = makeSut();
    const fakeData = fakeUseRegisterData();
    await sut.register(fakeData);
    const promise = sut.register(fakeData);

    await expect(promise).rejects.toThrow(
      new FirebaseError('000', 'Firebase: Error (auth/email-already-in-use).')
    );
  });
  it('Should register an user an create an user collection', async () => {
    const sut = makeSut();
    const fakeData = fakeUseRegisterData();
    const response = await sut.register(fakeData);
    expect(response.email).toEqual(fakeData.email);
    expect(response.phoneNumber).toEqual(fakeData.phoneNumber);
    expect(response).toHaveProperty('id');
  });
});
