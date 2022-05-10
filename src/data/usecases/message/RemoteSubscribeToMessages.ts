import { ListenMessagesRepository } from '@/data/protocols/message';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SubscribeToMessages } from '@/domain/usecases';

export class RemoteSubscribeToMessages implements SubscribeToMessages {
  constructor(
    private readonly listenMessagesRepository: ListenMessagesRepository
  ) {}

  subscribe(params: SubscribeToMessages.Params) {
    try {
      const unsubscribe = this.listenMessagesRepository.subscribe(params);
      return unsubscribe;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
