import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
  where
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import {
  CreateCallRepository,
  ListOpenCallsByUserRepository,
  LoadContactsCallsRepository
} from '@/data/protocols/call';
import { Call } from '@/domain/models/Call';

import { FirebaseUserUtils } from './FirebaseUserUtils';
import { chunkArray } from './utils/chunkArray';

export class FirebaseCallRepository
  implements
    CreateCallRepository,
    ListOpenCallsByUserRepository,
    LoadContactsCallsRepository
{
  private callsCollection: CollectionReference;

  private firebaseUserUtils: FirebaseUserUtils;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
    this.firebaseUserUtils = new FirebaseUserUtils();
  }

  async listByUser(
    userId: string
  ): Promise<ListOpenCallsByUserRepository.Result> {
    const callQuery = query(
      this.callsCollection,
      where('userId', '==', userId),
      where('open', '==', true)
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
          where('open', '==', true)
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
