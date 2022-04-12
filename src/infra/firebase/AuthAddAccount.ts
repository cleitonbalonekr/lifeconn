import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import { AuthInstance, FirestoreInstance } from '@/configs/firebase';
import { AddAccountRepository } from '@/data/protocols/AddAccountRepository';

export class AuthAddAccount implements AddAccountRepository {
  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const { email, password, phoneNumber } = params;

    const { user } = await auth.createUserWithEmailAndPassword(
      AuthInstance,
      email,
      password
    );

    const userCollection = firestore.collection(FirestoreInstance, 'users');
    const userDoc = firestore.doc(userCollection, user.uid);
    await firestore.setDoc(userDoc, {
      phoneNumber,
      email
    });

    return {
      id: user.uid,
      email,
      phoneNumber
    };
  }
}
