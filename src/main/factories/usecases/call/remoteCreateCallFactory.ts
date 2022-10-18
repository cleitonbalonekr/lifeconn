import { CreateCall } from '@/domain/usecases';
import {
  FirebaseCallRepository,
  FirebaseCallEventRepository
} from '@/infra/firebase';
import { NanoidTokenGenerator } from '@/infra/hash';

export const makeRemoteCreateCall = (): CreateCall => {
  const firebaseCallRepository = new FirebaseCallRepository();
  const nanoidTokenGenerator = new NanoidTokenGenerator();
  const firebaseCallEventRepository = new FirebaseCallEventRepository();

  return new CreateCall(
    firebaseCallRepository,
    nanoidTokenGenerator,
    firebaseCallEventRepository
  );
};
