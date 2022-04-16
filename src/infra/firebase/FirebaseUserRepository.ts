import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import {
  GetUserByIdRepository,
  UpdateUserInfoRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

export default class FirebaseUserRepository
  implements GetUserByIdRepository, UpdateUserInfoRepository
{
  private userCollection: CollectionReference;

  constructor() {
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async updateUser(
    params: UpdateUserInfo.Params,
    userId: string
  ): Promise<UpdateUserInfoRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }
    await updateDoc(userRef, {
      ...params
    });
    const updatedUser = await getDoc(userRef);

    return {
      id: updatedUser.id,
      ...updatedUser.data()
    } as AuthUser;
  }

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const response = !user.exists()
      ? null
      : ({
          id: user.id,
          ...user.data()
        } as AuthUser);
    return response;
  }
}
