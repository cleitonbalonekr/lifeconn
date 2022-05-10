import { Message } from '@/domain/models';

export interface SubscribeToMessages {
  subscribe: (
    params: SubscribeToMessages.Params
  ) => Promise<SubscribeToMessages.Model>;
}

export namespace SubscribeToMessages {
  export type Params = {
    callId: string;
    successCallback(messages: Message[]): void;
    errorCallback(error: any): void;
  };
  export type Model = () => void;
}
