import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { Message } from '@/domain/models';
import { ListenMessagesRepository } from '@/domain/protocols/db/message';

export type SubscribeToMessagesParams = {
  callId: string;
  successCallback(messages: Message[]): void;
  errorCallback(error: any): void;
};
export type SubscribeToMessagesModel = () => void;

export class SubscribeToMessages {
  constructor(
    private readonly listenMessagesRepository: ListenMessagesRepository
  ) {}

  subscribe(params: SubscribeToMessagesParams) {
    try {
      const unsubscribe = this.listenMessagesRepository.subscribe(params);
      return unsubscribe;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
