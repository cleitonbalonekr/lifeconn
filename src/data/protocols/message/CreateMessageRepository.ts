import { Message } from '@/domain/models';

export interface CreateMessageRepository {
  add(
    params: CreateMessageRepository.Params,
    callId: string
  ): Promise<CreateMessageRepository.Result>;
}

export namespace CreateMessageRepository {
  export type Params = {
    isPhoto: boolean;
    content: string;
    from: string;
  };
  export type Result = Message | null;
}
