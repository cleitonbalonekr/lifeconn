/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { deleteApp } from 'firebase/app';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

import app, {
  FirestoreInstance,
  AuthInstance,
  StorageInstance
} from '@/configs/firebase';

export function setupEmulators() {
  connectFirestoreEmulator(FirestoreInstance, 'localhost', 8080);
  connectAuthEmulator(AuthInstance, 'http://127.0.0.1:9099', {
    disableWarnings: true
  });
  connectStorageEmulator(StorageInstance, 'localhost', 8001, {
    mockUserToken: 'Bearer owner'
  });
  return 'ok';
}
export async function closeFirebase() {
  await deleteApp(app);
}
export async function cleanEmulators() {
  const authUrl =
    'http://127.0.0.1:9099/emulator/v1/projects/lifeconn-4d4ff/accounts';
  const storageUrl = 'http://127.0.0.1:8001/v0/b/lifeconn-4d4ff.appspot.com/o/';
  const firestoreUrl =
    'http://127.0.0.1:8080/emulator/v1/projects/lifeconn-4d4ff/databases/(default)/documents';
  const headers = {
    Authorization: 'Bearer owner'
  };

  await axios.delete(authUrl, {
    headers
  });
  await axios.delete(firestoreUrl, {
    headers
  });
  const response = await axios.get(storageUrl, { headers });

  const files = response.data.items;
  for (const file of files) {
    const url = `${storageUrl}${file.name}`;
    await axios.delete(url, { headers });
  }
  return 'ok';
}
