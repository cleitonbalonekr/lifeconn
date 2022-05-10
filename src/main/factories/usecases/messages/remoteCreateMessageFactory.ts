import { RemoteCreateMessage } from '@/data/usecases';
import { CreateMessage } from '@/domain/usecases';
import { FirebaseMessageRepository } from '@/infra/firebase';

export const makeRemoteCreateMessage = (): CreateMessage => {
  const firebaseMessageRepository = new FirebaseMessageRepository();
  return new RemoteCreateMessage(firebaseMessageRepository);
};
