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

import { FirestoreInstance } from '@/configs/firebase';
import {
  AddUserMedicalDataRepository,
  UpdateUserMedicalDataRepository,
  DeleteUserMedicalDataRepository
} from '@/domain/protocols/db/user';

import { FirebaseUserUtils } from './FirebaseUserUtils';

export class FirebaseMedicalDataRepository
  implements
    AddUserMedicalDataRepository,
    UpdateUserMedicalDataRepository,
    DeleteUserMedicalDataRepository
{
  private userCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.firebaseUserUtils = new FirebaseUserUtils();
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async removeMedicalData(
    medicalDataId: DeleteUserMedicalDataRepository.Params,
    userId: string
  ): Promise<DeleteUserMedicalDataRepository.Result> {
    const medicalDataRef = this.firebaseUserUtils.getMedicalDataRef(
      userId,
      medicalDataId
    );
    const medicalData = await getDoc(medicalDataRef);
    if (!medicalData.exists()) {
      return null;
    }
    await deleteDoc(medicalDataRef);
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }

  async updateMedicalData(
    params: UpdateUserMedicalDataRepository.Params,
    userId: string
  ): Promise<UpdateUserMedicalDataRepository.Result> {
    const medicalDataRef = this.firebaseUserUtils.getMedicalDataRef(
      userId,
      params.id
    );
    const medicalData = await getDoc(medicalDataRef);
    if (!medicalData.exists()) {
      return null;
    }
    await updateDoc(medicalDataRef, {
      ...params
    });
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }

  async addMedicalData(
    params: AddUserMedicalDataRepository.Params,
    userId: string
  ): Promise<AddUserMedicalDataRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const medicalDataId = uuidv4();
    const addMedicalDataRef = this.firebaseUserUtils.getMedicalDataRef(
      userId,
      medicalDataId
    );
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }
    await setDoc(addMedicalDataRef, {
      ...params
    });

    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }
}
