import { RemoteStoreFile } from '@/data/usecases';
import { StoreFile } from '@/domain/usecases';
import {
  FirebaseCallRepository,
  FirebaseMessageRepository,
  FirebaseStoreRepository
} from '@/infra/firebase';

export const makeRemoteStoreFile = (): StoreFile => {
  const firebaseMessageRepository = new FirebaseMessageRepository();
  const firebaseStoreRepository = new FirebaseStoreRepository();
  const firebaseCallRepository = new FirebaseCallRepository();
  return new RemoteStoreFile(
    firebaseMessageRepository,
    firebaseStoreRepository,
    firebaseCallRepository
  );
};
