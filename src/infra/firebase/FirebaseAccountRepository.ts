import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import { AuthInstance, FirestoreInstance } from '@/configs/firebase';
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository
} from '@/data/protocols/account';

export class FirebaseAccountRepository
  implements AddAccountRepository, CheckAccountByEmailRepository
{
  private userCollection: firestore.CollectionReference;

  constructor() {
    this.userCollection = firestore.collection(FirestoreInstance, 'users');
  }

  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const { email, password, phoneNumber } = params;

    const { user } = await auth.createUserWithEmailAndPassword(
      AuthInstance,
      email,
      password
    );

    const userDoc = firestore.doc(this.userCollection);
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

  async checkByEmail(email: string) {
    const query = firestore.query(
      this.userCollection,
      firestore.where('email', '==', email)
    );
    const snapshot = await firestore.getDocs(query);
    const user = snapshot.docs[0];
    const userId = snapshot.empty ? '' : user.id;

    return {
      emailInUse: !snapshot.empty,
      userId
    };
  }
}
