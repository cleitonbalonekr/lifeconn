import { UpdateUserInfo } from '@/domain/usecases';
import { FirebaseUserRepository } from '@/infra/firebase';

export const makeRemoteUpdateUserInfo = (): UpdateUserInfo => {
  const firebaseUserRepository = new FirebaseUserRepository();
  return new UpdateUserInfo(firebaseUserRepository);
};
