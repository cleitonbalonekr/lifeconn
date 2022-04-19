import { MedicalDataNotFound } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { UpdateMedicalData } from '@/domain/usecases';

import { UpdateUserMedicalDataRepository } from '../protocols/user';

export class RemoteUpdateMedicalData implements UpdateMedicalData {
  constructor(
    private readonly updateUserMedicalDataRepository: UpdateUserMedicalDataRepository
  ) {}

  async update(params: UpdateMedicalData.Params, userId: string) {
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
