import { RemoteLoadCalls } from '@/data/usecases';
import { LoadCalls } from '@/domain/usecases';
import { FirebaseCallRepository } from '@/infra/firebase';

export const makeRemoteLoadCalls = (): LoadCalls => {
  const firebaseCallRepository = new FirebaseCallRepository();
  return new RemoteLoadCalls(firebaseCallRepository, firebaseCallRepository);
};
