import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { AddUserMedicalDataRepository } from '@/domain/protocols/db/user';

export type AddMedicalDataParams = {
  title: string;
  description: string;
  onlyOrganization: boolean;
};

export type AddMedicalDataModel = AuthUser;

export class AddMedicalData {
  constructor(
    private readonly addUserMedicalDataRepository: AddUserMedicalDataRepository
  ) {}

  async add(params: AddMedicalDataParams, userId: string) {
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
