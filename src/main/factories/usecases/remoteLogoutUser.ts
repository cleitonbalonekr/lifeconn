import { RemoteLogoutUser } from '@/data/usecases';
import { LogoutUser } from '@/domain/usecases';
import { FirebaseAccountRepository } from '@/infra/firebase';

export const makeRemoteLogoutUser = (): LogoutUser => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  return new RemoteLogoutUser(firebaseAccountRepository);
};
