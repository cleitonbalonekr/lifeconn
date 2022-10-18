import { InvalidCallError } from '@/domain/errors/InvalidCallError';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import {
  AddCallEventRepository,
  CloseCallRepository
} from '@/domain/protocols/db/call';
import { RemoveCallFilesRepository } from '@/domain/protocols/fileStorage';

export type CloseCallParams = {
  userId: string;
  callId: string;
};
export type CloseCallResult = void;

export class CloseCall {
  constructor(
    private readonly closeCallRepository: CloseCallRepository,
    private readonly addCallEventRepository: AddCallEventRepository,
    private readonly removeCallFilesRepository: RemoveCallFilesRepository
  ) {}

  async close(params: CloseCallParams) {
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
      await this.removeCallFilesRepository.removeFile(
        `images/${params.callId}`
      );
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
