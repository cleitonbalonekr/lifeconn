import { CallEvent, EventStatus } from '@/domain/models/CallEvent';

export interface AddCallEventRepository {
  add(
    params: AddCallEventRepository.Params
  ): Promise<AddCallEventRepository.Result>;
}

export namespace AddCallEventRepository {
  export type Params = {
    notes?: string;
    status: EventStatus;
    creatorId: string;
    callId: string;
  };
  export type Result = CallEvent | null;
}
