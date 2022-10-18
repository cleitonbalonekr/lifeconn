import { RemoveContact } from '@/domain/usecases';
import { FirebaseContactRepository } from '@/infra/firebase';

export const makeRemoteRemoveContact = (): RemoveContact => {
  const firebaseContactRepository = new FirebaseContactRepository();
  return new RemoveContact(firebaseContactRepository);
};
