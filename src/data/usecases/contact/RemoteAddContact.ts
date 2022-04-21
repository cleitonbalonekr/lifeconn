import { CheckAccountPhoneNumberRepository } from '@/data/protocols/account';
import {
  AddContactRepository,
  AddExistentContactRepository
} from '@/data/protocols/user';
import { ContactAlreadyAddedError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AddContact } from '@/domain/usecases';

export class RemoteAddContact implements AddContact {
  constructor(
    private readonly checkAccountPhoneNumberRepository: CheckAccountPhoneNumberRepository,
    private readonly addExistentContactRepository: AddExistentContactRepository,
    private readonly addContactRepository: AddContactRepository
  ) {}

  async add(params: AddContact.Params, currentUserId: string) {
    try {
      const { phoneNumberInUse, userId } =
        await this.checkAccountPhoneNumberRepository.checkPhoneNumber(
          params.phoneNumber
        );
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
          throw new ContactAlreadyAddedError();
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
