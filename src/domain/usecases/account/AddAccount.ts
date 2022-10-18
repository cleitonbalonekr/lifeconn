import { EmailInUseError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import {
  AddAccountRepository,
  AddAccountToExistenteUserRepository,
  CheckAccountByEmailRepository,
  CheckAccountPhoneNumberRepository,
  AddUserIdToExistentContactRepository
} from '@/domain/protocols/db/account';

export type AddAccountParams = {
  phoneNumber: string;
  email: string;
  password: string;
};

export type AddAccountModel = AuthUser;

export class AddAccount {
  constructor(
    private addAccountRepository: AddAccountRepository,
    private checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private checkAccountPhoneNumber: CheckAccountPhoneNumberRepository,
    private addAccountToExistenteUser: AddAccountToExistenteUserRepository,
    private addUserIdToExistentContactsRepository: AddUserIdToExistentContactRepository
  ) {}

  async add(params: AddAccountParams): Promise<AddAccountModel> {
    try {
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
        await this.addUserIdToExistentContactsRepository.addUserIdToContact({
          userId,
          phoneNumber: params.phoneNumber
        });
        return response;
      }
      const response = await this.addAccountRepository.register(params);
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
