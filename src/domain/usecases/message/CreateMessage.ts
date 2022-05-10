import { Message } from '@/domain/models';

export interface CreateMessage {
  create: (
    params: CreateMessage.Params,
    callId: string
  ) => Promise<CreateMessage.Result>;
}

export namespace CreateMessage {
  export type Params = {
    isPhoto: boolean;
    content: string;
  };

  export type Result = Message;
}
