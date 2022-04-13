import { EmailInUseError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';

import { AddAccountRepository } from '../protocols/AddAccountRepository';
import { CheckAccountByEmailRepository } from '../protocols/CheckAccountByEmailRepository';
import { CheckAccountPhoneNumberRepository } from '../protocols/CheckAccountPhoneNumberRepository';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private addAccountRepository: AddAccountRepository,
    private checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private checkAccountPhoneNumber: CheckAccountPhoneNumberRepository
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      params.email
    );
    if (exists) {
      throw new EmailInUseError();
    }
    const hasPhoneNumber = await this.checkAccountPhoneNumber.checkPhoneNumber(
      params.phoneNumber
    );
    if (hasPhoneNumber) {
      // to do
    }
    const response = await this.addAccountRepository.register(params);
    return response;
  }
}
