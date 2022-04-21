import { collection, doc, setDoc } from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { fakeId } from '@/tests/shared/mocks';

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
