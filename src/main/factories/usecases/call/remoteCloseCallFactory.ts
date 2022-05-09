import { RemoteCloseCall } from '@/data/usecases';
import { CloseCall } from '@/domain/usecases';
import {
  FirebaseCallRepository,
  FirebaseCallEventRepository
} from '@/infra/firebase';

export const makeRemoteCloseCall = (): CloseCall => {
  const firebaseCallRepository = new FirebaseCallRepository();
  const firebaseCallEventRepository = new FirebaseCallEventRepository();

  return new RemoteCloseCall(
    firebaseCallRepository,
    firebaseCallEventRepository
  );
};
