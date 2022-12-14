import { AddMedicalData } from '@/domain/usecases';
import { FirebaseMedicalDataRepository } from '@/infra/firebase';

export const makeRemoteAddMedicalData = (): AddMedicalData => {
  const firebaseMedicalDataRepository = new FirebaseMedicalDataRepository();
  return new AddMedicalData(firebaseMedicalDataRepository);
};
