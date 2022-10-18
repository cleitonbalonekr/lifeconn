import { LoadCallMessage } from '@/domain/usecases';
import { FirebaseMessageRepository } from '@/infra/firebase';

export const makeRemoteLoadCallMessage = (): LoadCallMessage => {
  const firebaseMessageRepository = new FirebaseMessageRepository();
  return new LoadCallMessage(firebaseMessageRepository);
};
