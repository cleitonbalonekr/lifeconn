import * as auth from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { AuthInstance } from '@/configs/firebase';
import { FirebaseContactRepository } from '@/infra/firebase';
import { makeAddContactParams } from '@/tests/data/mock/contact-mock';
import { fakeId, randomId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import {
  fakeUseRegisterData,
  getUserDoc,
  makeMedicalData,
  makeUser,
  makeUserUpdateInfo
} from '../mock';

const makeSut = () => {
  return new FirebaseContactRepository();
};

describe('FirebaseContactRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  describe('AddContact', () => {
    it('should create a new contact and return its info', async () => {
      const firebaseContactRepository = makeSut();
      const contactParams = makeAddContactParams();
      const userId = fakeId;
      await makeUser(userId, {
        authId: userId
      });
      const response = await firebaseContactRepository.addContact(
        contactParams,
        userId
      );
      expect(response).toHaveProperty('contacts');
      expect(response.contacts).toHaveLength(1);
      expect(response.contacts[0]).toHaveProperty(
        'nickname',
        contactParams.nickname
      );
      expect(response.contacts[0]).toHaveProperty('hasAccount', false);
    });
  });
  describe('addExistentContact', () => {
    it('should create a new contact that exist and return its info', async () => {
      const firebaseContactRepository = makeSut();
      const userId = fakeId;
      const contactId = randomId();
      const contactParams = { ...makeAddContactParams(), contactId };
      await makeUser(userId, {
        authId: userId
      });
      await makeUser(contactId, {
        authId: contactId,
        phoneNumber: contactParams.phoneNumber,
        notificationToken: 'token'
      });
      const response = await firebaseContactRepository.addExistentContact(
        contactParams,
        userId
      );
      if (!response) {
        throw new Error('fail');
      }

      expect(response).toHaveProperty('contacts');
      expect(response.contacts).toHaveLength(1);
      expect(response.contacts[0]).toHaveProperty(
        'nickname',
        contactParams.nickname
      );
      expect(response.contacts[0]).toHaveProperty('hasAccount', true);
      expect(response.contacts[0]).toHaveProperty('contactId', contactId);
      expect(response.contacts[0]).toHaveProperty('notificationToken');
    });
    it('should return null if contact does not exist', async () => {
      const firebaseContactRepository = makeSut();
      const userId = fakeId;
      const contactParams = {
        ...makeAddContactParams(),
        contactId: randomId()
      };
      await makeUser(userId, {
        authId: userId
      });

      const response = await firebaseContactRepository.addExistentContact(
        contactParams,
        userId
      );
      expect(response).toBeNull();
    });
  });
});
