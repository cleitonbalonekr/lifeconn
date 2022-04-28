import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { CreateCallRepository } from '@/data/protocols/call';
import { Call } from '@/domain/models/Call';

export class FirebaseCallRepository implements CreateCallRepository {
  private callsCollection: CollectionReference;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
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
