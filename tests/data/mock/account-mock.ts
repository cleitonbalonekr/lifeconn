/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import { AddAccountRepository } from '../protocols/AddAccountRepository';
import { CheckAccountByEmailRepository } from '../protocols/CheckAccountByEmailRepository';
import { CheckAccountPhoneNumberRepository } from '../protocols/CheckAccountPhoneNumberRepository';

export const fakeUseRegisterData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  phoneNumber: faker.phone.phoneNumber()
});

export class AddAccountRepositorySpy implements AddAccountRepository {
  public callCount = 0;

  public fakeResponse = {
    id: 'fake_id',
    authId: 'fake_id',
    email: 'fake_email',
    phoneNumber: 'fake_phone_number'
  };

  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    this.callCount += 1;
    return this.fakeResponse;
  }
}
export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository
{
  public isInUse = false;

  async checkByEmail(email: string) {
    return this.isInUse;
  }
}
export class CheckAccountPhoneNumberRepositorySpy
  implements CheckAccountPhoneNumberRepository
{
  public isInUse = false;

  async checkPhoneNumber(phoneNumber: string) {
    return this.isInUse;
  }
}
