import { CreateCallRepository } from '@/data/protocols/call/CreateCallRepository';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { CreateCall } from '@/domain/usecases/call/CreateCall';

export class RemoteCreateCall implements CreateCall {
  constructor(private readonly createCallRepository: CreateCallRepository) {}

  async add(params: CreateCall.Params) {
    try {
      await this.createCallRepository.create({ ...params, token: '' });
    } catch (error) {
      catchErrorVerification(error);
    }
  }
}
