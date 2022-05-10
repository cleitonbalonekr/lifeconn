import { Message } from '@/domain/models';

export interface LoadCallMessage {
  load: (callId: string) => Promise<LoadCallMessage.Model>;
}

export namespace LoadCallMessage {
  export type Model = Message[];
}
