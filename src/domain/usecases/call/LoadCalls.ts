import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { Contact } from '@/domain/models';
import { Call } from '@/domain/models/Call';
import {
  LoadContactsCallsRepository,
  ListOpenCallsByUserRepository
} from '@/domain/protocols/db/call';

export type LoadCallsParams = {
  userId: string;
  contacts: Contact[];
};

export type LoadCallsResult = Call[];

export class LoadCalls {
  constructor(
    private readonly listOpenCallsByUserRepository: ListOpenCallsByUserRepository,
    private readonly loadContactsCallsRepository: LoadContactsCallsRepository
  ) {}

  async load(params: LoadCallsParams) {
    try {
      const userCalls = await this.listOpenCallsByUserRepository.listByUser(
        params.userId
      );
      const contactCalls =
        await this.loadContactsCallsRepository.listByContacts(params.contacts);
      return userCalls.concat(contactCalls);
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
