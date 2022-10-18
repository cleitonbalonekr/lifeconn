import { Message } from '@/domain/models';

export interface LoadCallMessageRepository {
  loadMessages(
    callId: LoadCallMessageRepository.Params
  ): Promise<LoadCallMessageRepository.Result>;
}

export namespace LoadCallMessageRepository {
  export type Params = string;
  export type Result = Message[];
}
