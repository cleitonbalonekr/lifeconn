/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  GetUserByIdRepository,
  UpdateUserInfoRepository,
  AddUserMedicalDataRepository,
  UpdateUserMedicalDataRepository,
  DeleteUserMedicalDataRepository,
  UpdateNotificationTokenRepository
} from '@/domain/protocols/db/user';

import { getFakeAuthUser } from './auth-mock';

export const makeUpdateUserParams = () => {
  return {
    fullName: faker.internet.userName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    totalVoiceToken: faker.datatype.uuid(),
    impactActivation: false
  };
};
export const makeMedicalData = () => {
  return {
    title: faker.random.word(),
    description: faker.random.words(6),
    onlyOrganization: false
  };
};

export class AddUserMedicalDataRepositorySpy
  implements AddUserMedicalDataRepository
{
  public response: GetUserByIdRepository.Result = getFakeAuthUser();

  async addMedicalData(
    params: AddUserMedicalDataRepository.Params,
    userId: string
  ): Promise<AddUserMedicalDataRepository.Result> {
    return this.response;
  }
}
export class DeleteUserMedicalDataRepositorySpy
  implements DeleteUserMedicalDataRepository
{
  public response: DeleteUserMedicalDataRepository.Result = getFakeAuthUser();

  async removeMedicalData(
    params: DeleteUserMedicalDataRepository.Params,
    userId: string
  ): Promise<DeleteUserMedicalDataRepository.Result> {
    return this.response;
  }
}

export class UpdateUserMedicalDataRepositorySpy
  implements UpdateUserMedicalDataRepository
{
  public response: UpdateUserMedicalDataRepository.Result = getFakeAuthUser();

  async updateMedicalData(
    params: UpdateUserMedicalDataRepository.Params,
    userId: string
  ): Promise<UpdateUserMedicalDataRepository.Result> {
    return this.response;
  }
}
export class GetUserByIdRepositorySpy implements GetUserByIdRepository {
  public response: GetUserByIdRepository.Result = getFakeAuthUser();

  async getUser(userId: string): Promise<GetUserByIdRepository.Result> {
    return this.response;
  }
}
export class UpdateUserInfoRepositorySpy implements UpdateUserInfoRepository {
  public response: UpdateUserInfoRepository.Result = getFakeAuthUser();

  async updateUser(
    params: UpdateUserInfoRepository.Params,
    userId: string
  ): Promise<UpdateUserInfoRepository.Result> {
    return this.response;
  }
}
export class UpdateNotificationTokenRepositorySpy
  implements UpdateNotificationTokenRepository
{
  public response: UpdateUserInfoRepository.Result = getFakeAuthUser();

  public callCount = 0;

  async updateNotificationToken(notificationToken: string, userId: string) {
    this.callCount += 1;
    return this.response;
  }
}
