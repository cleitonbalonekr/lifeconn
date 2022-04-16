import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { GetUserByIdRepository } from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';

export default class FirebaseUserRepository implements GetUserByIdRepository {
  private userCollection: CollectionReference;

  constructor() {
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    const userQuery = query(
      this.userCollection,
      where('__name__', '==', userId)
    );
    const snapshot = await getDocs(userQuery);
    const user = snapshot.docs[0];

    const response = snapshot.empty
      ? null
      : ({
          id: user.id,
          ...user.data()
        } as AuthUser);
    return response;
  }
}
