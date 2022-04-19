import { MedicalDataNotFound } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { DeleteMedicalData } from '@/domain/usecases';

import { DeleteUserMedicalDataRepository } from '../protocols/user';

export class RemoteDeleteMedicalData implements DeleteMedicalData {
  constructor(
    private readonly deleteUserMedicalDataRepository: DeleteUserMedicalDataRepository
  ) {}

  async remove(medicalDataId: DeleteMedicalData.Params, userId: string) {
    try {
      const response =
        await this.deleteUserMedicalDataRepository.removeMedicalData(
          medicalDataId,
          userId
        );
      if (!response) {
        throw new MedicalDataNotFound();
      }
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
