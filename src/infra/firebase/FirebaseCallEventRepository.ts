import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { FirestoreInstance } from '@/configs/firebase';
import { CallEvent } from '@/domain/models/CallEvent';
import { AddCallEventRepository } from '@/domain/protocols/db/call';

export class FirebaseCallEventRepository implements AddCallEventRepository {
  private callsCollection: CollectionReference;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
  }

  async add(
    params: AddCallEventRepository.Params
  ): Promise<AddCallEventRepository.Result> {
    const callRef = doc(this.callsCollection, params.callId);
    const callDoc = await getDoc(callRef);
    if (!callDoc.exists()) {
      return null;
    }
    const callEventId = uuidv4();
    const callEventDoc = doc(
      this.callsCollection,
      params.callId,
      'callEvents',
      callEventId
    );
    await setDoc(callEventDoc, {
      ...params,
      id: callEventDoc.id,
      occurredAt: Timestamp.fromDate(new Date())
    });

    const callEvent = await getDoc(callEventDoc);

    const callEventData = {
      id: callEvent.id,
      ...callEvent.data()
    } as CallEvent;

    await updateDoc(callRef, {
      lastEvent: callEventData
    });

    return callEventData;
  }
}
