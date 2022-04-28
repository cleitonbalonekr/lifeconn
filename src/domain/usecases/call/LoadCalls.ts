import { Contact } from '@/domain/models';
import { Call } from '@/domain/models/Call';

export interface LoadCalls {
  load: (params: LoadCalls.Params) => Promise<LoadCalls.Result>;
}

export namespace LoadCalls {
  export type Params = {
    userId: string;
    contacts: Contact[];
  };

  export type Result = Call[];
}
