import {
  AddCallEventRepository,
  CreateCallRepository,
  VerifyCallAlreadyOpenRepository
} from '@/data/protocols/call';
import { TokenGenerator } from '@/data/protocols/hash/TokenGenerator';
import { CallAlreadyOpenError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import { CreateCall } from '@/domain/usecases/call/CreateCall';

export class RemoteCreateCall implements CreateCall {
  constructor(
    private readonly createCallRepository: CreateCallRepository,
    private readonly verifyCallAlreadyOpenRepository: VerifyCallAlreadyOpenRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly addCallEventRepository: AddCallEventRepository
  ) {}

  async add(params: CreateCall.Params) {
    try {
      const token = this.tokenGenerator.generate();
      const payload = {
        ...params,
        token
      };
      const isAlreadyOpenToUser =
        await this.verifyCallAlreadyOpenRepository.hasCallOpen(payload.userId);
      if (isAlreadyOpenToUser) {
        throw new CallAlreadyOpenError();
      }
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
