import { Call } from '@/domain/models/Call';

export interface CreateCallRepository {
  create(
    params: CreateCallRepository.Params
  ): Promise<CreateCallRepository.Result>;
}

export namespace CreateCallRepository {
  export type Params = {
    userId: string;
    location: {
      latitude: number;
      longitude: number;
    };
    token: string;
  };
  export type Result = Call;
}
