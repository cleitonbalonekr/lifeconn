import { RemoteCloseCall } from '@/data/usecases';
import { CloseCall } from '@/domain/usecases';
import {
  FirebaseCallRepository,
  FirebaseCallEventRepository,
  FirebaseStoreRepository
} from '@/infra/firebase';

export const makeRemoteCloseCall = (): CloseCall => {
  const firebaseCallRepository = new FirebaseCallRepository();
  const firebaseCallEventRepository = new FirebaseCallEventRepository();
  const firebaseStoreRepository = new FirebaseStoreRepository();

  return new RemoteCloseCall(
    firebaseCallRepository,
    firebaseCallEventRepository,
    firebaseStoreRepository
  );
};
