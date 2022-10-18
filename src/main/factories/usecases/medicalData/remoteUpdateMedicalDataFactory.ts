import { RemoteUpdateMedicalData } from '@/data/usecases';
import { UpdateMedicalData } from '@/domain/usecases';
import { FirebaseMedicalDataRepository } from '@/infra/firebase';

export const makeRemoteUpdateMedicalData = (): UpdateMedicalData => {
  const firebaseMedicalDataRepository = new FirebaseMedicalDataRepository();
  return new RemoteUpdateMedicalData(firebaseMedicalDataRepository);
};
