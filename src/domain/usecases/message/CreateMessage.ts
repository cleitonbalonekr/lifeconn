import { InvalidCallError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { Message } from '@/domain/models';
import { CreateMessageRepository } from '@/domain/protocols/db/message';

export type CreateMessageParams = {
  isPhoto: boolean;
  content: string;
  from: string;
};

export type CreateMessageResult = Message;

export class CreateMessage {
  constructor(
    private readonly createMessageRepository: CreateMessageRepository
  ) {}

  async create(params: CreateMessageParams, callId: string) {
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
