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

import { FirestoreInstance } from '@/configs/firebase';
import {
  AddUserMedicalDataRepository,
  UpdateUserMedicalDataRepository,
  DeleteUserMedicalDataRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';

export class FirebaseMedicalDataRepository
  implements
    AddUserMedicalDataRepository,
    UpdateUserMedicalDataRepository,
    DeleteUserMedicalDataRepository
{
  private userCollection: CollectionReference;

  constructor() {
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async removeMedicalData(
    medicalDataId: DeleteUserMedicalDataRepository.Params,
    userId: string
  ): Promise<DeleteUserMedicalDataRepository.Result> {
    const medicalDataRef = this.getMedicalDataRef(userId, medicalDataId);
    const medicalData = await getDoc(medicalDataRef);
    if (!medicalData.exists()) {
      return null;
    }
    await deleteDoc(medicalDataRef);
    const user = await this.getUserInfo(userId);
    return user;
  }

  async updateMedicalData(
    params: UpdateUserMedicalDataRepository.Params,
    userId: string
  ): Promise<UpdateUserMedicalDataRepository.Result> {
    const medicalDataRef = this.getMedicalDataRef(userId, params.id);
    const medicalData = await getDoc(medicalDataRef);
    if (!medicalData.exists()) {
      return null;
    }
    await updateDoc(medicalDataRef, {
      ...params
    });
    const user = await this.getUserInfo(userId);
    return user;
  }

  async addMedicalData(
    params: AddUserMedicalDataRepository.Params,
    userId: string
  ): Promise<AddUserMedicalDataRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const medicalDataId = uuidv4();
    const addMedicalDataRef = this.getMedicalDataRef(userId, medicalDataId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }
    await setDoc(addMedicalDataRef, {
      ...params
    });

    const user = await this.getUserInfo(userId);
    return user;
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

  private async getUserInfo(userId: string) {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const medicalData = await this.getMedicalDataByUserId(userId);
    return {
      id: user.id,
      ...user.data(),
      medicalData
    } as AuthUser;
  }

  private getMedicalDataRef(userId: string, medicalDataId: string) {
    return doc(this.userCollection, userId, 'medicalData', medicalDataId);
  }
}
