import {
  ContactAlreadyAddedError,
  ContactNotFoundError,
  InvalidContactError
} from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { CheckAccountPhoneNumberRepository } from '@/domain/protocols/db/account';
import {
  AddContactRepository,
  AddExistentContactRepository,
  VerifyContactExistToUserRepository
} from '@/domain/protocols/db/user';

export type AddContactParams = {
  phoneNumber: string;
  nickname: string;
};

export type AddContactResult = {
  existentContact: boolean;
  user: AuthUser;
};

export class AddContact {
  constructor(
    private readonly checkAccountPhoneNumberRepository: CheckAccountPhoneNumberRepository,
    private readonly verifyContactExistToUserRepository: VerifyContactExistToUserRepository,
    private readonly addExistentContactRepository: AddExistentContactRepository,
    private readonly addContactRepository: AddContactRepository
  ) {}

  async add(params: AddContactParams, currentUserId: string) {
    try {
      const contactAlreadyAdded =
        await this.verifyContactExistToUserRepository.contactAlreadyAddedToUser(
          { contactPhoneNumber: params.phoneNumber, userId: currentUserId }
        );
      if (contactAlreadyAdded) {
        throw new ContactAlreadyAddedError();
      }

      const { phoneNumberInUse, userId } =
        await this.checkAccountPhoneNumberRepository.checkPhoneNumber(
          params.phoneNumber
        );
      if (userId === currentUserId) {
        throw new InvalidContactError();
      }
      if (phoneNumberInUse) {
        const response =
          await this.addExistentContactRepository.addExistentContact(
            {
              ...params,
              contactId: userId
            },
            currentUserId
          );
        if (!response) {
          throw new ContactNotFoundError();
        }
        return {
          existentContact: true,
          user: response
        };
      }
      const response = await this.addContactRepository.addContact(
        params,
        currentUserId
      );
      return {
        existentContact: false,
        user: response
      };
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
