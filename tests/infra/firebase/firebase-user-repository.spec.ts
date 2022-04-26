import * as auth from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { AuthInstance } from '@/configs/firebase';
import { FirebaseUserRepository } from '@/infra/firebase/FirebaseUserRepository';
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
  makeContact,
  makeUser,
  makeUserUpdateInfo
} from '../mock';

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
  describe('UpdateUser', () => {
    it('Should return NULL when try to update a inexistent user', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const userMock = makeUserUpdateInfo();
      const response = await sut.updateUser(userMock, userId);
      expect(response).toBeNull();
    });
    it('Should update a existent user', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const userMock = makeUserUpdateInfo();
      const oldUserInfo = makeUserUpdateInfo();
      const userDoc = getUserDoc(userId);
      await setDoc(userDoc, {
        ...oldUserInfo,
        authId: fakeId,
        id: userId
      });
      const response = await sut.updateUser(userMock, userId);

      expect(response).toHaveProperty('email', userMock.email);
      expect(response).toHaveProperty('fullName', userMock.fullName);
      expect(response).toHaveProperty('phoneNumber', userMock.phoneNumber);
      expect(response).toHaveProperty('medicalData');
      expect(response).toHaveProperty('contacts');
    });
    it('Should update a existent user auth email', async () => {
      const sut = makeSut();
      const { email, password } = fakeUseRegisterData();
      const authUser = await auth.createUserWithEmailAndPassword(
        AuthInstance,
        email,
        password
      );
      await auth.signInWithEmailAndPassword(AuthInstance, email, password);
      const userId = fakeId;
      const userMock = makeUserUpdateInfo();
      const oldUserInfo = makeUserUpdateInfo();
      const userDoc = getUserDoc(userId);
      await setDoc(userDoc, {
        ...oldUserInfo,
        authId: authUser.user.uid,
        id: userId,
        email
      });
      const response = await sut.updateUser(userMock, userId);
      const authenticatedUser = auth.getAuth().currentUser;

      expect(authenticatedUser).toHaveProperty('email', response?.email);
    });
  });
  describe('UpdateNotificationToken', () => {
    it('should return NULL if does not find user', async () => {
      const sut = makeSut();
      const notificationToken = randomId();
      const userId = randomId();
      const response = await sut.updateNotificationToken(
        notificationToken,
        userId
      );
      expect(response).toBeNull();
    });
    it('should return update notificationToken', async () => {
      const sut = makeSut();
      const notificationToken = randomId();
      const userId = randomId();
      await makeUser(userId, { id: userId, authId: userId });
      const response = await sut.updateNotificationToken(
        notificationToken,
        userId
      );
      expect(response).toHaveProperty('notificationToken', notificationToken);
    });
  });
  describe('GetNotificationTokens', () => {
    it('should return contacts notificationToken', async () => {
      const sut = makeSut();

      const userId = randomId();
      const userInfo = makeUserUpdateInfo();
      const contactId = randomId();
      const contactId2 = randomId();

      const contactParams = {
        ...makeAddContactParams(),
        hasAccount: true
      };
      const contactParams2 = {
        ...makeAddContactParams(),
        hasAccount: true
      };

      await makeUser(userId, {
        id: userId,
        authId: userId,
        ...userInfo
      });
      // contacts
      await makeUser(contactId, {
        id: contactId,
        authId: contactId,
        phoneNumber: contactParams.phoneNumber,
        notificationToken: randomId()
      });
      await makeUser(contactId2, {
        id: contactId2,
        authId: contactId2,
        phoneNumber: contactParams2.phoneNumber,
        notificationToken: randomId()
      });

      await makeContact(userId, contactParams.phoneNumber, contactParams);
      await makeContact(userId, contactParams2.phoneNumber, contactParams2);

      const response = await sut.getNotificationTokens(userId);

      expect(response).toHaveProperty('fullName', userInfo.fullName);
      expect(response?.tokens).toHaveLength(2);
    });
  });
});
