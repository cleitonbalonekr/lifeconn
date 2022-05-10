import { CreateMessageRepository } from '@/data/protocols/message';
import { InvalidCallError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { CreateMessage } from '@/domain/usecases/message';

export class RemoteCreateMessage implements CreateMessage {
  constructor(
    private readonly createMessageRepository: CreateMessageRepository
  ) {}

  async create(params: CreateMessage.Params, callId: string) {
    try {
      const message = await this.createMessageRepository.add(params, callId);
      if (!message) {
        throw new InvalidCallError();
      }
      return message;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
