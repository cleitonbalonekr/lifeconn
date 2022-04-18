/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  GetUserByIdRepository,
  UpdateUserInfoRepository,
  AddUserMedicalDataRepository
} from '@/data/protocols/user';

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
