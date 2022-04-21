import { RemoteAddContact } from '@/data/usecases';
import { AddContact } from '@/domain/usecases';
import {
  FirebaseContactRepository,
  FirebaseAccountRepository
} from '@/infra/firebase';

export const makeRemoteAddContact = (): AddContact => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const firebaseContactRepository = new FirebaseContactRepository();
  return new RemoteAddContact(
    firebaseAccountRepository,
    firebaseContactRepository,
    firebaseContactRepository,
    firebaseContactRepository
  );
};
