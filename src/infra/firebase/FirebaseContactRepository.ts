import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { AuthUser } from '@/domain/models';
import {
  AddContactRepository,
  AddExistentContactRepository,
  VerifyContactExistToUserRepository,
  RemoteRemoveContactRepository
} from '@/domain/protocols/db/user/contact';

import { FirebaseUserUtils } from './FirebaseUserUtils';

export class FirebaseContactRepository
  implements
    AddContactRepository,
    AddExistentContactRepository,
    VerifyContactExistToUserRepository,
    RemoteRemoveContactRepository
{
  private userCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.firebaseUserUtils = new FirebaseUserUtils();
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async removeContact(phoneNumber: string, userId: string): Promise<AuthUser> {
    const contactRef = doc(
      this.userCollection,
      userId,
      'contacts',
      phoneNumber
    );

    await deleteDoc(contactRef);
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }

  async contactAlreadyAddedToUser(
    params: VerifyContactExistToUserRepository.Params
  ): Promise<boolean> {
    const { contactPhoneNumber, userId } = params;
    const contactUserDoc = doc(
      this.userCollection,
      userId,
      'contacts',
      contactPhoneNumber
    );
    const user = await getDoc(contactUserDoc);
    return user.exists();
  }

  async addContact(
    params: AddContactRepository.Params,
    currentUserId: string
  ): Promise<AuthUser> {
    const medicalDataRef = doc(
      this.userCollection,
      currentUserId,
      'contacts',
      params.phoneNumber
    );

    await setDoc(medicalDataRef, {
      id: params.phoneNumber,
      phoneNumber: params.phoneNumber,
      nickname: params.nickname,
      hasAccount: false
    });
    const user = await this.firebaseUserUtils.getUserInfo(currentUserId);
    return user;
  }

  async addExistentContact(
    params: AddExistentContactRepository.Params,
    currentUserId: string
  ): Promise<AddExistentContactRepository.Result> {
    const medicalDataRef = doc(
      this.userCollection,
      currentUserId,
      'contacts',
      params.phoneNumber
    );
    const contactDoc = doc(this.userCollection, params.contactId);
    const contact = await getDoc(contactDoc);
    if (!contact.exists()) {
      return null;
    }
    await setDoc(medicalDataRef, {
      id: params.phoneNumber,
      phoneNumber: params.phoneNumber,
      nickname: params.nickname,
      contactId: params.contactId,
      hasAccount: true
    });

    const updatedUser = await this.firebaseUserUtils.getUserInfo(currentUserId);
    return updatedUser;
  }
}
