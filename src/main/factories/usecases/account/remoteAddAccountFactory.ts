import { AddAccount } from '@/domain/usecases';
import { FirebaseAccountRepository } from '@/infra/firebase';

export const makeRemoteAddAccount = (): AddAccount => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  return new AddAccount(
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository
  );
};
