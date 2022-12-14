import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measurementId: Constants.manifest?.extra?.firebaseMeasureId
};

const app = initializeApp(firebaseConfig);

export const FirestoreInstance = firestore.getFirestore(app);
export const AuthInstance = auth.getAuth(app);
export const StorageInstance = storage.getStorage(app);

export default app;
