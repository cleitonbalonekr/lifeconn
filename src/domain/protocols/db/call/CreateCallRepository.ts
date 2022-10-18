import { Call } from '@/domain/models/Call';

export interface CreateCallRepository {
  create(
    params: CreateCallRepository.Params
  ): Promise<CreateCallRepository.Result>;
}

export namespace CreateCallRepository {
  export type Params = {
    userId: string | null;
    location: {
      latitude: number;
      longitude: number;
    } | null;
    token: string;
    victimName?: string;
    helper?: {
      id: string;
      fullName: string;
      phoneNumber: string;
    };
  };
  export type Result = Call;
}
