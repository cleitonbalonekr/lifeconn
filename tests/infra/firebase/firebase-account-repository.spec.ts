import { FirebaseError } from 'firebase/app';
import * as firestore from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { FirebaseAccountRepository } from '@/infra/firebase/FirebaseAccountRepository';
import {
  setupEmulators,
  cleanEmulators,
  closeFirebase
} from '@/tests/utils/firebase-emulator';

import { fakeId, fakeUseRegisterData } from '../mock';

const makeSut = () => {
  return new FirebaseAccountRepository();
};
const getUserDoc = (userId = fakeId) => {
  const userCollection = firestore.collection(FirestoreInstance, 'users');
  const userDoc = firestore.doc(userCollection, userId);
  return userDoc;
};

describe('FirebaseAccountRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  describe('Register', () => {
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
      expect(response).toHaveProperty('authId');
    });
  });
  describe('CheckByEmail', () => {
    it('Should return true and the userId of an email that is in use', async () => {
      const sut = makeSut();
      const { email } = fakeUseRegisterData();
      const userDoc = getUserDoc();
      await firestore.setDoc(userDoc, {
        email
      });
      const response = await sut.checkByEmail(email);
      expect(response.emailInUse).toBe(true);
      expect(response.userId).toBe(userDoc.id);
    });
    it('Should return false and empty userId if email is not in use', async () => {
      const sut = makeSut();
      const { email } = fakeUseRegisterData();

      const response = await sut.checkByEmail(email);
      expect(response.emailInUse).toBe(false);
      expect(response.userId).toBe('');
    });
  });
  describe('CheckByPhoneNumber', () => {
    it('Should return true and the userId of an phoneNumber that is in use', async () => {
      const sut = makeSut();
      const { phoneNumber } = fakeUseRegisterData();
      const userDoc = getUserDoc();
      await firestore.setDoc(userDoc, {
        phoneNumber
      });
      const response = await sut.checkPhoneNumber(phoneNumber);
      expect(response.phoneNumberInUse).toBe(true);
      expect(response.userId).toBe(userDoc.id);
    });
    it('Should return false and empty userId if phoneNumber is not in use', async () => {
      const sut = makeSut();
      const { phoneNumber } = fakeUseRegisterData();

      const response = await sut.checkPhoneNumber(phoneNumber);
      expect(response.phoneNumberInUse).toBe(false);
      expect(response.userId).toBe('');
    });
  });
});
