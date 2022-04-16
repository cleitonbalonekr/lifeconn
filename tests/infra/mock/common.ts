import { collection, doc } from 'firebase/firestore';

import { FirestoreInstance } from '@/configs/firebase';
import { fakeId } from '@/tests/shared/mocks';

export const getUserDoc = (userId = fakeId) => {
  const userCollection = collection(FirestoreInstance, 'users');
  const userDoc = doc(userCollection, userId);
  return userDoc;
};
