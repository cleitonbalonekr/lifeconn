import { FirebaseError } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

import { AuthInstance, FirestoreInstance } from '@/configs/firebase';
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository,
  AddAccountToExistenteUserRepository,
  SignInWithEmailAndPasswordRepository
} from '@/data/protocols/account';

export class FirebaseAccountRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    CheckAccountPhoneNumberRepository,
    AddAccountToExistenteUserRepository,
    SignInWithEmailAndPasswordRepository
{
  private userCollection: firestore.CollectionReference;

  constructor() {
    this.userCollection = firestore.collection(FirestoreInstance, 'users');
  }

  async signIn(
    params: SignInWithEmailAndPasswordRepository.Params
  ): Promise<SignInWithEmailAndPasswordRepository.Result> {
    try {
      const { email, password } = params;

      const { user } = await auth.signInWithEmailAndPassword(
        AuthInstance,
        email,
        password
      );
      return {
        authId: user.uid
      };
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        if (error.code === auth.AuthErrorCodes.USER_DELETED) return null;
        if (error.code === auth.AuthErrorCodes.INVALID_PASSWORD) return null;
      }
      throw error;
    }
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

  async registerExistentUser(
    params: AddAccountToExistenteUserRepository.Params,
    userId: string
  ): Promise<AddAccountToExistenteUserRepository.Result> {
    const { email, password, phoneNumber } = params;

    const { user } = await auth.createUserWithEmailAndPassword(
      AuthInstance,
      email,
      password
    );
    const doc = firestore.doc(this.userCollection, userId);
    await firestore.setDoc(doc, {
      authId: user.uid,
      email
    });

    return {
      authId: user.uid,
      id: doc.id,
      email,
      phoneNumber
    };
  }

  async checkByEmail(email: string) {
    const query = firestore.query(
      this.userCollection,
      firestore.where('email', '==', email)
    );
    const { userId, inUse } = await this.formatCheckUser(query);

    return {
      emailInUse: inUse,
      userId
    };
  }

  async checkPhoneNumber(phoneNumber: string) {
    const query = firestore.query(
      this.userCollection,
      firestore.where('phoneNumber', '==', phoneNumber)
    );
    const { userId, inUse } = await this.formatCheckUser(query);

    return {
      phoneNumberInUse: inUse,
      userId
    };
  }

  private async formatCheckUser(
    query: firestore.Query<firestore.DocumentData>
  ) {
    const snapshot = await firestore.getDocs(query);
    const user = snapshot.docs[0];
    const userId = snapshot.empty ? '' : user.id;

    return {
      inUse: !snapshot.empty,
      userId
    };
  }
}
