import * as auth from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

import { AuthInstance } from '@/configs/firebase';
import { FirebaseUserRepository } from '@/infra/firebase/FirebaseUserRepository';
import { fakeId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import {
  fakeUseRegisterData,
  getUserDoc,
  makeMedicalData,
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
  describe('AddMedicalData', () => {
    it('Should return NULL when try to add medicalData to an inexistent user', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const medicalData = makeMedicalData();
      const response = await sut.addMedicalData(medicalData, userId);
      expect(response).toBeNull();
    });
    it('Should add medicalData to an existent user', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const medicalData = makeMedicalData();
      const oldUserInfo = makeUserUpdateInfo();
      const userDoc = getUserDoc(userId);
      await setDoc(userDoc, {
        ...oldUserInfo,
        authId: fakeId,
        id: userId
      });
      const response = await sut.addMedicalData(medicalData, userId);
      expect(response).toHaveProperty('medicalData');
      expect(response?.medicalData).toHaveLength(1);
    });
  });
  describe('UpdateMedicalData', () => {
    it('Should return NULL when try to update an inexistent medicalData', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const medicalData = {
        ...makeMedicalData(),
        id: fakeId
      };
      const response = await sut.updateMedicalData(medicalData, userId);
      expect(response).toBeNull();
    });
    it('Should update medicalData', async () => {
      const sut = makeSut();
      const userId = fakeId;

      const medicalData = {
        ...makeMedicalData(),
        id: fakeId
      };
      const oldMedicalData = {
        ...makeMedicalData(),
        id: fakeId
      };
      const medicalDataDoc = getUserDoc(
        `${userId}/medicalData/${oldMedicalData.id}`
      );
      await setDoc(medicalDataDoc, oldMedicalData);
      const response = await sut.updateMedicalData(medicalData, userId);

      expect(response).toHaveProperty('medicalData');
      expect(response?.medicalData).toHaveLength(1);
      expect(response?.medicalData[0]).toHaveProperty(
        'title',
        medicalData.title
      );
    });
  });
  describe('RemoveMedicalData', () => {
    it('Should return NULL when try to remove an inexistent medicalData', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const medicalData = {
        ...makeMedicalData(),
        id: fakeId
      };
      const response = await sut.removeMedicalData(medicalData.id, userId);
      expect(response).toBeNull();
    });
    it('Should remove medicalData', async () => {
      const sut = makeSut();
      const userId = fakeId;
      const oldMedicalData = {
        ...makeMedicalData(),
        id: fakeId
      };
      const medicalDataDoc = getUserDoc(
        `${userId}/medicalData/${oldMedicalData.id}`
      );
      await setDoc(medicalDataDoc, oldMedicalData);
      const response = await sut.removeMedicalData(oldMedicalData.id, userId);

      expect(response).toHaveProperty('medicalData');
      expect(response?.medicalData).toHaveLength(0);
    });
  });
});
