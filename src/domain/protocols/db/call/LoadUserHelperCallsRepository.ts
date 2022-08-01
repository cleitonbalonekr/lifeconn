import { Call } from '@/domain/models/Call';

export interface LoadUserHelperCallsRepository {
  listByCallsAsHelper(
    params: LoadUserHelperCallsRepository.Params
  ): Promise<LoadUserHelperCallsRepository.Result>;
}

export namespace LoadUserHelperCallsRepository {
  export type Params = string;

  export type Result = Call[];
}
