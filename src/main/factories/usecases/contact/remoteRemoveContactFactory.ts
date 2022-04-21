import { RemoteRemoveContact } from '@/data/usecases';
import { RemoveContact } from '@/domain/usecases';
import {
  FirebaseContactRepository,
  FirebaseAccountRepository
} from '@/infra/firebase';

export const makeRemoteRemoveContact = (): RemoveContact => {
  const firebaseContactRepository = new FirebaseContactRepository();
  return new RemoteRemoveContact(firebaseContactRepository);
};
