import { EmailInUseError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';

import {
  AddAccountRepository,
  AddAccountToExistenteUserRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository
} from '../protocols/account';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private addAccountRepository: AddAccountRepository,
    private checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private checkAccountPhoneNumber: CheckAccountPhoneNumberRepository,
    private addAccountToExistenteUser: AddAccountToExistenteUserRepository
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const { emailInUse } =
      await this.checkAccountByEmailRepository.checkByEmail(params.email);
    if (emailInUse) {
      throw new EmailInUseError();
    }
    const { phoneNumberInUse, userId } =
      await this.checkAccountPhoneNumber.checkPhoneNumber(params.phoneNumber);
    if (phoneNumberInUse) {
      const response =
        await this.addAccountToExistenteUser.registerExistentUser(
          params,
          userId
        );
      return response;
    }
    const response = await this.addAccountRepository.register(params);
    return response;
  }
}
