import { Authentication } from '@/domain/usecases';
import { FirebaseAccountRepository } from '@/infra/firebase';

export const makeRemoteAuthentication = (): Authentication => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  return new Authentication(
    firebaseAccountRepository,
    firebaseAccountRepository
  );
};
