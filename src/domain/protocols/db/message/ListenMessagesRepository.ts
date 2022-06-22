import { Message } from '@/domain/models';

export interface ListenMessagesRepository {
  subscribe(
    callId: ListenMessagesRepository.Params
  ): ListenMessagesRepository.Result;
}

export namespace ListenMessagesRepository {
  export type Params = {
    callId: string;
    successCallback(messages: Message[]): void;
    errorCallback(error: any): void;
  };
  export type Result = () => void;
}
