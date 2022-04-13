import axios from 'axios';
import { deleteApp } from 'firebase/app';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

import app, { FirestoreInstance, AuthInstance } from '@/configs/firebase';

export function setupEmulators() {
  connectFirestoreEmulator(FirestoreInstance, 'localhost', 8080);
  connectAuthEmulator(AuthInstance, 'http://127.0.0.1:9099', {
    disableWarnings: true
  });
  return 'ok';
}
export async function closeFirebase() {
  await deleteApp(app);
}
export async function cleanEmulators() {
  const authUrl =
    'http://127.0.0.1:9099/emulator/v1/projects/lifeconn-4d4ff/accounts';
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
  return 'ok';
  // curl -H 'Authorization: Bearer owner' -X DELETE http://localhost:9099/emulator/v1/projects/lifeconn-4d4ff/accounts
  // curl -H 'Authorization: Bearer owner' -X DELETE http://localhost:8080/emulator/v1/projects/lifeconn-4d4ff/databases/(default)/documents
}
