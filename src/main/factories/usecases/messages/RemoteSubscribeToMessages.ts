import { SubscribeToMessages } from '@/domain/usecases';
import { FirebaseMessageRepository } from '@/infra/firebase';

export const makeRemoteSubscribeToMessages = (): SubscribeToMessages => {
  const firebaseMessageRepository = new FirebaseMessageRepository();
  return new SubscribeToMessages(firebaseMessageRepository);
};
