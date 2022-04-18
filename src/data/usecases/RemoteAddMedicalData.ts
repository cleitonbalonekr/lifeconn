import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AddMedicalData } from '@/domain/usecases';

import { AddUserMedicalDataRepository } from '../protocols/user';

export class RemoteAddMedicalData implements AddMedicalData {
  constructor(
    private readonly addUserMedicalDataRepository: AddUserMedicalDataRepository
  ) {}

  async add(params: AddMedicalData.Params, userId: string) {
    try {
      const response = await this.addUserMedicalDataRepository.addMedicalData(
        params,
        userId
      );
      if (!response) {
        throw new UserNotFoundError();
      }
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
