import { Call } from '@/domain/models/Call';

export interface ListOpenCallsByUserRepository {
  listByUser(
    params: ListOpenCallsByUserRepository.Params
  ): Promise<ListOpenCallsByUserRepository.Result>;
}

export namespace ListOpenCallsByUserRepository {
  export type Params = string;

  export type Result = Call[];
}
