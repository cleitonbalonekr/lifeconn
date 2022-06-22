import { Contact } from '@/domain/models';
import { Call } from '@/domain/models/Call';

export interface LoadContactsCallsRepository {
  listByContacts(
    params: LoadContactsCallsRepository.Params
  ): Promise<LoadContactsCallsRepository.Result>;
}

export namespace LoadContactsCallsRepository {
  export type Params = Contact[];

  export type Result = Call[];
}
