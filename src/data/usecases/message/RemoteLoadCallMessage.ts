import { LoadCallMessageRepository } from '@/data/protocols/message';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { LoadCallMessage } from '@/domain/usecases';

export class RemoteLoadCallMessage implements LoadCallMessage {
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
