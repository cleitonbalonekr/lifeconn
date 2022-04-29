import {
  LoadContactsCallsRepository,
  ListOpenCallsByUserRepository
} from '@/data/protocols/call';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { LoadCalls } from '@/domain/usecases';

export class RemoteLoadCalls implements LoadCalls {
  constructor(
    private readonly listOpenCallsByUserRepository: ListOpenCallsByUserRepository,
    private readonly loadContactsCallsRepository: LoadContactsCallsRepository
  ) {}

  async load(params: LoadCalls.Params) {
    try {
      const userCalls = await this.listOpenCallsByUserRepository.list(
        params.userId
      );
      const contactCalls = await this.loadContactsCallsRepository.list(
        params.contacts
      );
      return userCalls.concat(contactCalls);
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
