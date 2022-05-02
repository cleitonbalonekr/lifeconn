import { RemoteCreateCallForAnotherPerson } from '@/data/usecases';
import { CreateCallForAnotherPerson } from '@/domain/usecases';
import {
  FirebaseCallRepository,
  FirebaseCallEventRepository,
  FirebaseAccountRepository,
  FirebaseUserRepository
} from '@/infra/firebase';
import { NanoidTokenGenerator } from '@/infra/hash';

export const makeRemoteCreateCallForAnotherPerson =
  (): CreateCallForAnotherPerson => {
    const nanoidTokenGenerator = new NanoidTokenGenerator();
    const firebaseAccountRepository = new FirebaseAccountRepository();
    const firebaseUserRepository = new FirebaseUserRepository();
    const firebaseCallRepository = new FirebaseCallRepository();
    const firebaseCallEventRepository = new FirebaseCallEventRepository();

    return new RemoteCreateCallForAnotherPerson(
      nanoidTokenGenerator,
      firebaseAccountRepository,
      firebaseUserRepository,
      firebaseCallRepository,
      firebaseCallEventRepository
    );
  };
