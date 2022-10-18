import { MedicalDataNotFound } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { UpdateUserMedicalDataRepository } from '@/domain/protocols/db/user';

export type UpdateMedicalDataParams = {
  id: string;
  title: string;
  description: string;
  onlyOrganization: boolean;
};

export type UpdateMedicalDataModel = AuthUser;

export class UpdateMedicalData {
  constructor(
    private readonly updateUserMedicalDataRepository: UpdateUserMedicalDataRepository
  ) {}

  async update(params: UpdateMedicalDataParams, userId: string) {
    try {
      const response =
        await this.updateUserMedicalDataRepository.updateMedicalData(
          params,
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
