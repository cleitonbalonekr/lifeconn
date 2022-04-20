import { getAuth, updateEmail } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import app, { FirestoreInstance } from '@/configs/firebase';
import {
  GetUserByIdRepository,
  UpdateUserInfoRepository,
  UpdateUserMedicalDataRepository,
  DeleteUserMedicalDataRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

import { FirebaseUserUtils } from './FirebaseUserUtils';

export class FirebaseUserRepository
  implements GetUserByIdRepository, UpdateUserInfoRepository
{
  private userCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.firebaseUserUtils = new FirebaseUserUtils();
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async updateUser(
    params: UpdateUserInfo.Params,
    userId: string
  ): Promise<UpdateUserInfoRepository.Result> {
    const payload = { ...params };
    const userRef = doc(this.userCollection, userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }

    if (userDoc.data().email !== payload.email) {
      const auth = getAuth(app);
      const { currentUser } = auth;
      if (currentUser) {
        await updateEmail(currentUser, payload.email);
        payload.email = auth.currentUser?.email as string;
      }
    }

    await updateDoc(userRef, {
      ...payload
    });
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const medicalData = await this.firebaseUserUtils.getMedicalDataByUserId(
      userId
    );
    const contacts = await this.firebaseUserUtils.getContactsByUserId(userId);
    const response = !user.exists()
      ? null
      : ({
          id: user.id,
          ...user.data(),
          medicalData,
          contacts
        } as AuthUser);
    return response;
  }
}
