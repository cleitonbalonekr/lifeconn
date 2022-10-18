import { DeleteMedicalData } from '@/domain/usecases';
import { FirebaseMedicalDataRepository } from '@/infra/firebase';

export const makeRemoteDeleteMedicalData = (): DeleteMedicalData => {
  const firebaseMedicalDataRepository = new FirebaseMedicalDataRepository();
  return new DeleteMedicalData(firebaseMedicalDataRepository);
};
