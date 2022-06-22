import { MedicalDataNotFound } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { DeleteUserMedicalDataRepository } from '@/domain/protocols/db/user';

export type DeleteMedicalDataParams = string;

export type DeleteMedicalDataModel = AuthUser;

export class DeleteMedicalData {
  constructor(
    private readonly deleteUserMedicalDataRepository: DeleteUserMedicalDataRepository
  ) {}

  async remove(medicalDataId: DeleteMedicalDataParams, userId: string) {
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
