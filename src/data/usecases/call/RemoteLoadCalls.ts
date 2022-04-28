import { ListOpenCallsByUserRepository } from '@/data/protocols/call/ListOpenCallsByUserRepository';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { LoadCalls } from '@/domain/usecases';

export class RemoteLoadCalls implements LoadCalls {
  constructor(
    private readonly listOpenCallsByUserRepository: ListOpenCallsByUserRepository
  ) {}

  async load(params: LoadCalls.Params) {
    try {
      const calls = await this.listOpenCallsByUserRepository.list(
        params.userId
      );
      return calls;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
