import { getAuth, updateEmail } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import app, { FirestoreInstance } from '@/configs/firebase';
import {
  AddUserMedicalDataRepository,
  GetUserByIdRepository,
  UpdateUserInfoRepository,
  UpdateUserMedicalDataRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

export class FirebaseUserRepository
  implements
    GetUserByIdRepository,
    UpdateUserInfoRepository,
    AddUserMedicalDataRepository,
    UpdateUserMedicalDataRepository
{
  private userCollection: CollectionReference;

  constructor() {
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async updateMedicalData(
    params: UpdateUserMedicalDataRepository.Params,
    userId: string
  ): Promise<UpdateUserMedicalDataRepository.Result> {
    const medicalDataRef = doc(
      this.userCollection,
      userId,
      'medicalData',
      params.id
    );
    const medicalData = await getDoc(medicalDataRef);
    if (!medicalData.exists()) {
      return null;
    }
    await updateDoc(medicalDataRef, {
      ...params
    });
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const updatedMedicalData = await this.getMedicalDataByUserId(userId);

    return {
      id: user.id,
      ...user.data(),
      medicalData: updatedMedicalData
    } as AuthUser;
  }

  async addMedicalData(
    params: AddUserMedicalDataRepository.Params,
    userId: string
  ): Promise<AddUserMedicalDataRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const medicalDataId = uuidv4();
    const addMedicalDataRef = doc(
      this.userCollection,
      userId,
      'medicalData',
      medicalDataId
    );
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }

    await setDoc(addMedicalDataRef, {
      ...params
    });

    const medicalData = await this.getMedicalDataByUserId(userId);

    const updatedAuthUser = {
      id: userDoc.id,
      ...userDoc.data(),
      medicalData
    } as AuthUser;

    return updatedAuthUser;
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
    const updatedUser = await getDoc(userRef);
    const medicalData = await this.getMedicalDataByUserId(userId);
    const updatedAuthUser = {
      id: updatedUser.id,
      ...updatedUser.data(),
      medicalData
    } as AuthUser;

    return updatedAuthUser;
  }

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const medicalData = await this.getMedicalDataByUserId(userId);
    const response = !user.exists()
      ? null
      : ({
          id: user.id,
          ...user.data(),
          medicalData
        } as AuthUser);
    return response;
  }

  private async getMedicalDataByUserId(userId: string) {
    const medicalDataCollection = collection(
      FirestoreInstance,
      'users',
      userId,
      'medicalData'
    );
    const medicalData = await getDocs(query(medicalDataCollection));
    const formattedMedicalData = medicalData.docs.map((medicalDataDoc) => {
      return {
        id: medicalDataDoc.id,
        ...medicalDataDoc.data()
      };
    });
    return formattedMedicalData;
  }
}
