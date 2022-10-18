import { RemoteDeleteMedicalData } from '@/data/usecases';
import { DeleteMedicalData } from '@/domain/usecases';
import { FirebaseMedicalDataRepository } from '@/infra/firebase';

export const makeRemoteDeleteMedicalData = (): DeleteMedicalData => {
  const firebaseMedicalDataRepository = new FirebaseMedicalDataRepository();
  return new RemoteDeleteMedicalData(firebaseMedicalDataRepository);
};
