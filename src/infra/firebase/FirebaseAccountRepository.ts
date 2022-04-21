import { FirebaseError } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { string } from 'yup';

import { AuthInstance, FirestoreInstance } from '@/configs/firebase';
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository,
  AddAccountToExistenteUserRepository,
  SignInWithEmailAndPasswordRepository,
  GetUserInfoByAuthRepository,
  SendEmailToRecoveryPassword,
  SignOutRepository
} from '@/data/protocols/account';
import { AuthUser } from '@/domain/models';

import { FirebaseUserUtils } from './FirebaseUserUtils';

export class FirebaseAccountRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    CheckAccountPhoneNumberRepository,
    AddAccountToExistenteUserRepository,
    SignInWithEmailAndPasswordRepository,
    GetUserInfoByAuthRepository,
    SendEmailToRecoveryPassword,
    SignOutRepository
{
  private userCollection: firestore.CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.firebaseUserUtils = new FirebaseUserUtils();
    this.userCollection = firestore.collection(FirestoreInstance, 'users');
  }

  async signOut(): Promise<void> {
    await auth.signOut(AuthInstance);
  }

  async sendEmail(email: string) {
    try {
      await auth.sendPasswordResetEmail(AuthInstance, email);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === auth.AuthErrorCodes.USER_DELETED) return false;
      }
      throw error;
    }
  }

  async getUserByAuthId(
    authId: string
  ): Promise<GetUserInfoByAuthRepository.Result> {
    const query = firestore.query(
      this.userCollection,
      firestore.where('authId', '==', authId)
    );
    const snapshot = await firestore.getDocs(query);
    if (snapshot.empty) {
      return null;
    }
    const user = snapshot.docs[0];

    const authUser = await this.firebaseUserUtils.getUserInfo(user.id);

    return authUser;
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
      phoneNumber,
      medicalData: [],
      contacts: []
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

    await this.addUserIdToExistentContact(phoneNumber, userId);

    return {
      authId: user.uid,
      id: doc.id,
      email,
      phoneNumber,
      medicalData: [],
      contacts: []
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

  // TODO: test
  private async addUserIdToExistentContact(
    phoneNumber: string,
    userId: string
  ) {
    const contactsCollection = firestore.collectionGroup(
      FirestoreInstance,
      'contacts'
    );
    const query = firestore.query(
      contactsCollection,
      firestore.where('phoneNumber', '==', phoneNumber)
    );
    const userContacts = await firestore.getDocs(query);

    return Promise.all(
      userContacts.docs.map(async (contact) => {
        console.log('contact', contact);
        const docToChange = firestore.doc(
          firestore.collection(FirestoreInstance, 'contacts'),
          contact.id
        );
        console.log('docToChange', docToChange.id);
        await firestore.updateDoc(docToChange, {
          contactId: userId,
          hasAccount: true
        });
      })
    );
  }
}
