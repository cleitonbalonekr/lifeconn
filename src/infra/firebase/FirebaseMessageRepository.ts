import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { FirestoreInstance } from '@/configs/firebase';
import { CreateMessageRepository } from '@/data/protocols/message';
import { Message } from '@/domain/models';

export class FirebaseMessageRepository implements CreateMessageRepository {
  private callsCollection: CollectionReference;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
  }

  async add(
    params: CreateMessageRepository.Params,
    callId: string
  ): Promise<CreateMessageRepository.Result> {
    const messageID = uuidv4();
    const callRef = doc(this.callsCollection, callId);
    const call = await getDoc(callRef);
    if (!call.exists()) {
      return null;
    }
    const messageDataRef = doc(
      this.callsCollection,
      callId,
      'messages',
      messageID
    );
    await setDoc(messageDataRef, {
      id: messageID,
      ...params,
      createdAt: Timestamp.fromDate(new Date())
    });
    const message = await getDoc(messageDataRef);
    return {
      id: message.id,
      ...message.data()
    } as Message;
  }
}
