import { getAuth, updateEmail } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where
} from 'firebase/firestore';

import app, { FirestoreInstance } from '@/configs/firebase';
import {
  GetUserByIdRepository,
  UpdateUserInfoRepository,
  UpdateNotificationTokenRepository,
  GetUserContactsNotificationToken
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { UpdateUserInfo } from '@/domain/usecases';

import { FirebaseUserUtils } from './FirebaseUserUtils';

export class FirebaseUserRepository
  implements
    GetUserByIdRepository,
    UpdateUserInfoRepository,
    UpdateNotificationTokenRepository,
    GetUserContactsNotificationToken
{
  private userCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.firebaseUserUtils = new FirebaseUserUtils();
    this.userCollection = collection(FirestoreInstance, 'users');
  }

  async getNotificationTokens(
    userId: string
  ): Promise<GetUserContactsNotificationToken.Result> {
    const contacts = await this.firebaseUserUtils.getContactsByUserId(userId);

    const contactsPhone = contacts
      .filter((contact) => contact.hasAccount)
      .map((contact) => contact.phoneNumber);

    const chunkContacts = this.chunkArray(contactsPhone);

    const snaps = [] as QueryDocumentSnapshot<DocumentData>[];
    await Promise.all<QueryDocumentSnapshot<DocumentData>[]>(
      chunkContacts.map(async (contactPhones: string[]) => {
        const userContactQuery = query(
          this.userCollection,
          where('phoneNumber', 'in', contactPhones)
        );
        const snap = await getDocs(userContactQuery);
        snaps.push(...snap.docs);
      })
    );

    const tokens = snaps.map(
      (contactDoc) => contactDoc.data().notificationToken
    );
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    return {
      tokens,
      fullName: user.data()?.fullName
    };
  }

  async updateNotificationToken(
    notificationToken: string,
    userId: string
  ): Promise<UpdateNotificationTokenRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }
    await updateDoc(userRef, {
      notificationToken
    });
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
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
    const user = await this.firebaseUserUtils.getUserInfo(userId);
    return user;
  }

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    const userRef = doc(this.userCollection, userId);
    const user = await getDoc(userRef);
    const medicalData = await this.firebaseUserUtils.getMedicalDataByUserId(
      userId
    );
    const contacts = await this.firebaseUserUtils.getContactsByUserId(userId);
    const response = !user.exists()
      ? null
      : ({
          id: user.id,
          ...user.data(),
          medicalData,
          contacts
        } as AuthUser);
    return response;
  }

  private chunkArray(inputArray: any[]) {
    const perChunk = 10; // items per chunk. firebase allow only 10 items to in operator

    const result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        // eslint-disable-next-line no-param-reassign
        resultArray[chunkIndex] = []; // start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
    return result;
  }
}
