import { setDoc } from 'firebase/firestore';

import FirebaseUserRepository from '@/infra/firebase/FirebaseUserRepository';
import { fakeId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import { fakeUseRegisterData, getUserDoc } from '../mock';

const makeSut = () => {
  return new FirebaseUserRepository();
};

describe('FirebaseUserRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });
  describe('GetUser', () => {
    it('Should return NULL if no user are found', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const response = await sut.getUser(userId);
      expect(response).toBeNull();
    });
    it('Should return AuthUser', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const userDoc = getUserDoc(userId);
      await setDoc(userDoc, {
        ...fakeUseRegisterData(),
        authId: fakeId,
        id: userId
      });
      const response = await sut.getUser(userId);
      expect(response).toHaveProperty('id', userId);
      expect(response).toHaveProperty('authId', userId);
    });
  });
});
