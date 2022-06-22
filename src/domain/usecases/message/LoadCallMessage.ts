import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { Message } from '@/domain/models';
import { LoadCallMessageRepository } from '@/domain/protocols/db/message';

export type LoadCallMessageModel = Message[];

export class LoadCallMessage {
  constructor(
    private readonly loadCallMessageRepository: LoadCallMessageRepository
  ) {}

  async load(callId: string) {
    try {
      const messages = await this.loadCallMessageRepository.loadMessages(
        callId
      );
      return messages;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
