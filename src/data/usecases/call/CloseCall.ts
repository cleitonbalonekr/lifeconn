import {
  AddCallEventRepository,
  CloseCallRepository
} from '@/data/protocols/call';
import { InvalidCallError } from '@/domain/errors/InvalidCallError';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import { CloseCall } from '@/domain/usecases';

export class RemoteCloseCall implements CloseCall {
  constructor(
    private readonly closeCallRepository: CloseCallRepository,
    private readonly addCallEventRepository: AddCallEventRepository
  ) {}

  async close(params: CloseCall.Params) {
    try {
      const response = await this.closeCallRepository.closeCall(params);
      if (!response) {
        throw new InvalidCallError();
      }
      await this.addCallEventRepository.add({
        callId: params.callId,
        status: EventStatus.AUTHOR_CANCELLED,
        creatorId: params.userId
      });
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
