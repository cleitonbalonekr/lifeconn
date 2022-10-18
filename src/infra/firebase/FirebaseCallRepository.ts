import {
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { Call } from '@/domain/models/Call';
import {
  CreateCallRepository,
  ListOpenCallsByUserRepository,
  LoadContactsCallsRepository,
  VerifyCallAlreadyOpenRepository,
  CloseCallRepository,
  SaveCallFileUrlRepository,
  LoadUserHelperCallsRepository
} from '@/domain/protocols/db/call';

import { FirebaseUserUtils } from './FirebaseUserUtils';
import { chunkArray } from './utils/chunkArray';

export class FirebaseCallRepository
  implements
    CreateCallRepository,
    ListOpenCallsByUserRepository,
    LoadContactsCallsRepository,
    VerifyCallAlreadyOpenRepository,
    CloseCallRepository,
    SaveCallFileUrlRepository,
    LoadUserHelperCallsRepository
{
  private callsCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
    this.firebaseUserUtils = new FirebaseUserUtils();
  }

  async listByCallsAsHelper(
    userId: string
  ): Promise<LoadUserHelperCallsRepository.Result> {
    const callQuery = query(
      this.callsCollection,
      where('helper.id', '==', userId),
      where('open', '==', true),
      orderBy('createdAt', 'desc')
    );

    const calls = await getDocs(callQuery);

    const formattedCalls = await Promise.all(
      calls.docs.map(async (result) => {
        const victimId = result.data().userId;
        const user = victimId
          ? await this.firebaseUserUtils.getUserToNotification(victimId)
          : null;
        return {
          id: result.id,
          ...result.data(),
          userId: user || victimId,
          createdAt: (result.data().createdAt as Timestamp).toDate()
        };
      })
    );
    return formattedCalls as Call[];
  }

  async addFileUrl(params: SaveCallFileUrlRepository.Params): Promise<void> {
    const callDoc = doc(this.callsCollection, params.callId);
    await updateDoc(callDoc, {
      files: arrayUnion(params.fileUrl)
    });
  }

  async closeCall({
    callId,
    userId
  }: CloseCallRepository.Params): Promise<boolean> {
    const docRef = doc(this.callsCollection, callId);
    const call = await getDoc(docRef);
    if (!call.exists()) return false;
    if (call.data()?.userId !== userId) {
      return false;
    }

    await updateDoc(docRef, {
      open: false,
      files: []
    });

    return true;
  }

  async hasCallOpen(
    userId: VerifyCallAlreadyOpenRepository.Params
  ): Promise<VerifyCallAlreadyOpenRepository.Result> {
    const callQuery = query(
      this.callsCollection,
      where('userId', '==', userId),
      where('open', '==', true),
      limit(1)
    );
    const calls = await getDocs(callQuery);
    return !calls.empty;
  }

  async listByUser(
    userId: string
  ): Promise<ListOpenCallsByUserRepository.Result> {
    const callQuery = query(
      this.callsCollection,
      where('userId', '==', userId),
      where('open', '==', true),
      orderBy('createdAt', 'desc')
    );
    const user = await this.firebaseUserUtils.getUserToNotification(userId);
    const calls = await getDocs(callQuery);
    return calls.docs.map((result) => ({
      id: result.id,
      ...result.data(),
      userId: user,
      createdAt: (result.data().createdAt as Timestamp).toDate()
    })) as Call[];
  }

  async listByContacts(
    contacts: LoadContactsCallsRepository.Params
  ): Promise<LoadContactsCallsRepository.Result> {
    const formattedContacts = contacts
      .filter((contact) => contact.hasAccount)
      .map((contact) => contact.contactId);

    const chunkContacts = chunkArray(formattedContacts);

    const snaps = [] as QueryDocumentSnapshot<DocumentData>[];
    await Promise.all<QueryDocumentSnapshot<DocumentData>[]>(
      chunkContacts.map(async (contactId: string[]) => {
        const userContactQuery = query(
          this.callsCollection,
          where('userId', 'in', contactId),
          where('open', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(userContactQuery);
        snaps.push(...snap.docs);
      })
    );

    const calls = await Promise.all(
      snaps.map(async (result) => {
        const user = await this.firebaseUserUtils.getUserToNotification(
          result.data()?.userId
        );
        return {
          id: result.id,
          ...result.data(),
          userId: user,
          createdAt: (result.data().createdAt as Timestamp).toDate()
        } as Call;
      })
    );

    return calls;
  }

  async create(params: CreateCallRepository.Params): Promise<Call> {
    const callDoc = doc(this.callsCollection);

    await setDoc(callDoc, {
      id: callDoc.id,
      ...params,
      createdAt: Timestamp.fromDate(new Date()),
      open: true
    });
    const call = await getDoc(callDoc);
    call.data();
    return {
      id: callDoc.id,
      ...call.data()
    } as Call;
  }
}
