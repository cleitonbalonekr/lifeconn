import { CallAlreadyOpenError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import {
  AddCallEventRepository,
  CreateCallRepository,
  VerifyCallAlreadyOpenRepository
} from '@/domain/protocols/db/call';
import { TokenGenerator } from '@/domain/protocols/hash/TokenGenerator';

export type CreateCallParams = {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
};

export type CreateCallResult = string;

export class CreateCall {
  constructor(
    private readonly createCallRepository: CreateCallRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly addCallEventRepository: AddCallEventRepository
  ) {}

  async add(params: CreateCallParams) {
    try {
      const token = this.tokenGenerator.generate();
      const payload = {
        ...params,
        token
      };

      const call = await this.createCallRepository.create(payload);
      await this.addCallEventRepository.add({
        callId: call.id,
        status: EventStatus.AUTHOR_CREATED,
        creatorId: params.userId
      });
      return call.token;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
