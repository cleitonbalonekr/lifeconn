import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { AuthInstance, FirestoreInstance } from '@/configs/firebase';
import { AddAccountRepository } from '@/data/protocols/AddAccountRepository';

export class FirebaseAddAccountRepository implements AddAccountRepository {
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
    const userDoc = firestore.doc(userCollection);
    await firestore.setDoc(userDoc, {
      authId: user.uid,
      phoneNumber,
      email
    });

    return {
      authId: user.uid,
      id: userDoc.id,
      email,
      phoneNumber
    };
  }
}
