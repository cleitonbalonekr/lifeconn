export interface CreateCallForAnotherPerson {
  add: (
    params: CreateCallForAnotherPerson.Params,
    creatorId: string
  ) => Promise<CreateCallForAnotherPerson.Result>;
}

export namespace CreateCallForAnotherPerson {
  export type Params = {
    location: {
      latitude: number;
      longitude: number;
    };
    victim?: {
      fullName: string;
      phoneNumber: string;
    };
  };

  export type Result = {
    token: string;
    victimId: string | null;
  };
}
