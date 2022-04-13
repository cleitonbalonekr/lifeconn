/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  AddAccountRepository,
  AddAccountToExistenteUserRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository
} from '@/data/protocols/account';

export const fakeUseRegisterData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  phoneNumber: faker.phone.phoneNumber()
});

export class AddAccountRepositorySpy implements AddAccountRepository {
  public callCount = 0;

  public fakeResponse = {
    id: faker.random.alphaNumeric(8),
    authId: faker.random.alphaNumeric(8),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber()
  };

  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    this.callCount += 1;
    return this.fakeResponse;
  }
}
export class AddAccountToExistenteUserRepositorySpy
  implements AddAccountToExistenteUserRepository
{
  public callCount = 0;

  public fakeResponse = {
    id: faker.random.alphaNumeric(8),
    authId: faker.random.alphaNumeric(8),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber()
  };

  async registerExistentUser(
    params: AddAccountRepository.Params,
    userId: string
  ): Promise<AddAccountRepository.Result> {
    this.callCount += 1;
    return {
      ...this.fakeResponse,
      id: userId
    };
  }
}
export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository
{
  public isInUse = false;

  public userId = '';

  async checkByEmail(email: string) {
    return {
      emailInUse: this.isInUse,
      userId: this.userId
    };
  }
}
export class CheckAccountPhoneNumberRepositorySpy
  implements CheckAccountPhoneNumberRepository
{
  public isInUse = false;

  public userId = '';

  async checkPhoneNumber(phoneNumber: string) {
    return {
      phoneNumberInUse: this.isInUse,
      userId: this.userId
    };
  }
}
