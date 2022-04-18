import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  SignInMethod,
  updateEmail
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

import app, { FirestoreInstance } from '@/configs/firebase';
import {
  GetUserByIdRepository,
  UpdateUserInfoRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases/UpdateUserInfo';

export class FirebaseUserRepository
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
    const updatedAuthUser = {
      id: updatedUser.id,
      ...updatedUser.data()
    } as AuthUser;

    return updatedAuthUser;
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
