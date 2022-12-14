import { ResetPassword } from '@/domain/usecases';
import { FirebaseAccountRepository } from '@/infra/firebase';

export const makeRemoteResetPassword = (): ResetPassword => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  return new ResetPassword(firebaseAccountRepository);
};
