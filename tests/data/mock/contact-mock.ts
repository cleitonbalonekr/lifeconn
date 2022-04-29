/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import { CheckAccountPhoneNumberRepository } from '@/data/protocols/account';
import {
  AddExistentContactRepository,
  AddContactRepository,
  VerifyContactExistToUserRepository,
  RemoteRemoveContactRepository
} from '@/data/protocols/user';
import { AuthUser } from '@/domain/models';
import { randomId } from '@/tests/shared/mocks';

import { getFakeAuthUser } from './auth-mock';

export const makeAddContactParams = () => ({
  nickname: faker.name.firstName(),
  phoneNumber: faker.phone.phoneNumber()
});
export const makeFakeContact = () => ({
  id: randomId(),
  contactId: randomId(),
  nickname: faker.name.firstName(),
  phoneNumber: faker.phone.phoneNumber(),
  notificationToken: randomId(),
  hasAccount: true
});

export class RemoteRemoveContactRepositorySpy
  implements RemoteRemoveContactRepository
{
  public response = getFakeAuthUser();

  public count = 0;

  async removeContact(phoneNumber: string, userId: string): Promise<AuthUser> {
    this.count += 1;
    return this.response;
  }
}
export class VerifyContactExistToUserRepositorySpy
  implements VerifyContactExistToUserRepository
{
  public response = false;

  public count = 0;

  async contactAlreadyAddedToUser(
    params: VerifyContactExistToUserRepository.Params
  ): Promise<boolean> {
    this.count += 1;

    return this.response;
  }
}
export class CheckAccountPhoneNumberRepositorySpy
  implements CheckAccountPhoneNumberRepository
{
  public response = {
    phoneNumberInUse: false,
    userId: ''
  };

  public count = 0;

  async checkPhoneNumber(
    phoneNumber: string
  ): Promise<CheckAccountPhoneNumberRepository.Result> {
    this.count += 1;

    return this.response;
  }
}

export class AddExistentContactRepositorySpy
  implements AddExistentContactRepository
{
  public response: AddExistentContactRepository.Result = getFakeAuthUser();

  public count = 0;

  async addExistentContact(
    params: AddExistentContactRepository.Params,
    currentUserId: string
  ): Promise<AddExistentContactRepository.Result> {
    this.count += 1;

    return this.response;
  }
}
export class AddContactRepositorySpy implements AddContactRepository {
  public response = getFakeAuthUser();

  public count = 0;

  async addContact(
    params: AddContactRepository.Params,
    currentUserId: string
  ): Promise<AuthUser> {
    this.count += 1;

    return this.response;
  }
}
