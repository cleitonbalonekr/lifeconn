import { RemoteUpdateUserInfo } from '@/data/usecases';
import { UpdateUserInfo } from '@/domain/usecases';
import { FirebaseUserRepository } from '@/infra/firebase';

export const makeRemoteUpdateUserInfo = (): UpdateUserInfo => {
  const firebaseUserRepository = new FirebaseUserRepository();
  return new RemoteUpdateUserInfo(firebaseUserRepository);
};
