import { collection, doc, setDoc } from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { fakeId, randomId } from '@/tests/shared/mocks';

export const getUserDoc = (userId = fakeId) => {
  const userCollection = collection(FirestoreInstance, 'users');
  const userDoc = doc(userCollection, userId);
  return userDoc;
};

export const makeUser = async (userId: string, userData: any) => {
  const userDoc = getUserDoc(userId);
  await setDoc(userDoc, {
    ...userData,
    id: userId
  });
};

export const getCallDoc = (callId = fakeId) => {
  const callCollection = collection(FirestoreInstance, 'calls');
  const callDoc = doc(callCollection, callId);
  return callDoc;
};

export const makeCall = async (callId: string, callData: any) => {
  const callDoc = getCallDoc(callId);
  await setDoc(callDoc, {
    ...callData,
    id: callId
  });
};

export const makeContact = async (
  userId: string,
  contactPhone: string,
  contactData: any
) => {
  const contactDoc = getUserDoc(`${userId}/contacts/${contactPhone}`);
  await setDoc(contactDoc, {
    ...contactData
  });
  return contactDoc;
};
export const makeMessage = async (
  callId: string,
  messageData: any,
  messageId = randomId()
) => {
  const messageDoc = getCallDoc(`${callId}/messages/${messageId}`);
  await setDoc(messageDoc, {
    ...messageData
  });
  return messageDoc;
};
