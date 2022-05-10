import { RemoteLoadCallMessage } from '@/data/usecases';
import { LoadCallMessage } from '@/domain/usecases';
import { FirebaseMessageRepository } from '@/infra/firebase';

export const makeRemoteLoadCallMessage = (): LoadCallMessage => {
  const firebaseMessageRepository = new FirebaseMessageRepository();
  return new RemoteLoadCallMessage(firebaseMessageRepository);
};
