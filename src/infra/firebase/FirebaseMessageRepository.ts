import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { FirestoreInstance } from '@/configs/firebase';
import { Call, Message } from '@/domain/models';
import {
  CreateMessageRepository,
  LoadCallMessageRepository,
  ListenMessagesRepository,
  VerifyFileLimitRepository
} from '@/domain/protocols/db/message';

export class FirebaseMessageRepository
  implements
    CreateMessageRepository,
    LoadCallMessageRepository,
    ListenMessagesRepository,
    VerifyFileLimitRepository
{
  private callsCollection: CollectionReference;

  constructor() {
    this.callsCollection = collection(FirestoreInstance, 'calls');
  }

  async isFilesFull(callId: string): Promise<VerifyFileLimitRepository.Result> {
    const callRef = doc(this.callsCollection, callId);
    const call = await getDoc(callRef);
    if (!call.exists() || !call.data()) {
      return null;
    }
    const callData = call.data() as Call;
    if (!callData.files) return false;
    if (callData.files.length >= Call.CALL_FILE_LIMIT) {
      return true;
    }
    return false;
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
      query(messageCollection, orderBy('createdAt', 'desc')),
      (snapshot) => {
        const messages = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
          createdAt: (document.data().createdAt as Timestamp).toDate()
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
    const messages = await getDocs(
      query(messageCollection, orderBy('createdAt', 'desc'))
    );

    const formatMessages = messages.docs.map((message) => ({
      id: message.id,
      ...message.data(),
      createdAt: (message.data().createdAt as Timestamp).toDate()
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
