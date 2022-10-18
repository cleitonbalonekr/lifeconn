import { RemoteAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { FirebaseAccountRepository } from '@/infra/firebase';

export const makeRemoteAddAccount = (): AddAccount => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  return new RemoteAddAccount(
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository,
    firebaseAccountRepository
  );
};
