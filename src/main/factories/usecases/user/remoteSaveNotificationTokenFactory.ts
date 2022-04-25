import { RemoteSaveNotificationToken } from '@/data/usecases';
import { SaveNotificationToken } from '@/domain/usecases';
import { FirebaseUserRepository } from '@/infra/firebase';

export const makeRemoteSaveNotificationToken = (): SaveNotificationToken => {
  const firebaseUserRepository = new FirebaseUserRepository();
  return new RemoteSaveNotificationToken(firebaseUserRepository);
};
