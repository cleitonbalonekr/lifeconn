import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { FirestoreInstance } from '@/configs/firebase';
import {
  CreateMessageRepository,
  LoadCallMessageRepository,
  ListenMessagesRepository
} from '@/data/protocols/message';
import { Message } from '@/domain/models';

export class FirebaseMessageRepository
  implements
    CreateMessageRepository,
    LoadCallMessageRepository,
    ListenMessagesRepository
{
  private callsCollection: CollectionReference;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
  }

  subscribe({
    callId,
    successCallback,
    errorCallback
  }: ListenMessagesRepository.Params): ListenMessagesRepository.Result {
    const messageCollection = collection(
      this.callsCollection,
      callId,
      'messages'
    );
    const unsubscribe = onSnapshot(
      messageCollection,
      (snapshot) => {
        const messages = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data()
        })) as Message[];
        successCallback(messages);
      },
      errorCallback
    );
    return unsubscribe;
  }

  async loadMessages(
    callId: string
  ): Promise<LoadCallMessageRepository.Result> {
    const messageCollection = collection(
      this.callsCollection,
      callId,
      'messages'
    );
    const messages = await getDocs(query(messageCollection));

    const formatMessages = messages.docs.map((message) => ({
      id: message.id,
      ...message.data()
    }));

    return formatMessages as Message[];
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
