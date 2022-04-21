import { FirebaseError } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import app, { AuthInstance } from '@/configs/firebase';
import { FirebaseAccountRepository } from '@/infra/firebase/FirebaseAccountRepository';
import { fakeId, randomId } from '@/tests/shared/mocks';
import {
  setupEmulators,
  cleanEmulators,
  closeFirebase
} from '@/tests/utils/firebase-emulator';

import {
  fakeUseRegisterData,
  getUserDoc,
  makeContact,
  makeUser
} from '../mock';

const makeSut = () => {
  return new FirebaseAccountRepository();
};
const makeUserWithContact = async (phoneNumber: string, userId: string) => {
  const userDoc = getUserDoc(userId);
  await firestore.setDoc(userDoc, {
    phoneNumber
  });
  // make contacts
  const contactId = randomId();
  await makeUser(contactId, {
    id: contactId,
    ...fakeUseRegisterData()
  });
  const contactDoc = await makeContact(contactId, phoneNumber, {
    phoneNumber,
    id: phoneNumber,
    nickname: 'asd',
    hasAccount: false
  });
  return { contactDoc, userDoc };
};

const registerUserWithEmailAndPassword = async () => {
  const { email, password } = fakeUseRegisterData();
  const { user } = await auth.createUserWithEmailAndPassword(
    AuthInstance,
    email,
    password
  );
  return { email, password, user };
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
  describe('SignIn', () => {
    it('Should not signIn with inexistent user', async () => {
      const sut = makeSut();
      const { email, password } = fakeUseRegisterData();
      const response = await sut.signIn({ email, password });
      expect(response).toBeNull();
    });
    it('Should not signIn with invalid credentials', async () => {
      const sut = makeSut();
      const { email, password } = fakeUseRegisterData();
      await auth.createUserWithEmailAndPassword(AuthInstance, email, password);
      const response = await sut.signIn({
        email,
        password: fakeUseRegisterData().password
      });
      expect(response).toBeNull();
    });
    it('Should signIn with valid credentials', async () => {
      const sut = makeSut();
      const { user, email, password } =
        await registerUserWithEmailAndPassword();
      const response = await sut.signIn({
        email,
        password
      });
      expect(response).toHaveProperty('authId', user.uid);
    });
  });
  describe('SignOut', () => {
    const { email, password } = fakeUseRegisterData();
    beforeEach(async () => {
      await auth.createUserWithEmailAndPassword(AuthInstance, email, password);
      auth.signInWithEmailAndPassword(AuthInstance, email, password);
    });
    it('Should signOut an user', async () => {
      const sut = makeSut();
      await sut.signOut();
      const authentication = auth.getAuth(app);
      expect(authentication.currentUser).toBeNull();
    });
  });
  describe('RegisterExistentUser', () => {
    it('Should not register an user with the same email', async () => {
      const sut = makeSut();
      const fakeData = fakeUseRegisterData();

      await sut.register(fakeData);
      const promise = sut.registerExistentUser(fakeData, fakeId);

      await expect(promise).rejects.toThrow(
        new FirebaseError('000', 'Firebase: Error (auth/email-already-in-use).')
      );
    });
    it('Should register an authentication to an existent user', async () => {
      const sut = makeSut();
      const fakeData = fakeUseRegisterData();
      const userId = fakeId;
      const userDoc = getUserDoc(userId);
      await firestore.setDoc(userDoc, {
        phoneNumber: fakeData.phoneNumber
      });
      const response = await sut.registerExistentUser(fakeData, userId);
      expect(response.email).toEqual(fakeData.email);
      expect(response.phoneNumber).toEqual(fakeData.phoneNumber);
      expect(response.id).toEqual(userId);
      expect(response).toHaveProperty('authId');
    });
  });
  describe('GetUserByAuthId', () => {
    it('Should return AuthUser info when find user', async () => {
      const sut = makeSut();
      const { email, phoneNumber } = fakeUseRegisterData();
      const userId = fakeId;
      const authId = `${fakeId}authId`;

      const userDoc = getUserDoc(userId);
      await firestore.setDoc(userDoc, {
        email,
        phoneNumber,
        authId
      });
      const response = await sut.getUserByAuthId(authId);
      expect(response).toHaveProperty('id', userId);
      expect(response).toHaveProperty('authId', authId);
      expect(response).toHaveProperty('phoneNumber', phoneNumber);
      expect(response).toHaveProperty('contacts');
      expect(response).toHaveProperty('medicalData');
    });
    it('Should return null when does not find user', async () => {
      const sut = makeSut();
      const response = await sut.getUserByAuthId(fakeId);
      expect(response).toBe(null);
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
  describe('SendEmail', () => {
    it('Should return false when send email of a inexistent use', async () => {
      const sut = makeSut();
      const { email } = fakeUseRegisterData();

      const response = await sut.sendEmail(email);
      expect(response).toBeFalsy();
    });
    it('Should return true when send email of a existent use', async () => {
      const sut = makeSut();
      const { email } = await registerUserWithEmailAndPassword();
      const response = await sut.sendEmail(email);
      expect(response).toBeTruthy();
    });
  });
  describe('addUserIdToContact', () => {
    it('Should add userId to other users that have this user as contact', async () => {
      const sut = makeSut();
      const { phoneNumber } = fakeUseRegisterData();
      const userId = fakeId;
      // make user doc
      const { contactDoc } = await makeUserWithContact(phoneNumber, randomId());
      const { contactDoc: contactDoc2 } = await makeUserWithContact(
        phoneNumber,
        randomId()
      );
      // test sut
      await sut.addUserIdToContact({
        phoneNumber,
        userId
      });
      // get contact
      const contact = await firestore.getDoc(contactDoc);
      const contact2 = await firestore.getDoc(contactDoc2);
      // assert
      expect(contact.data()).toHaveProperty('hasAccount', true);
      expect(contact.data()).toHaveProperty('contactId', userId);
      expect(contact2.data()).toHaveProperty('hasAccount', true);
      expect(contact2.data()).toHaveProperty('contactId', userId);
    });
  });
});
