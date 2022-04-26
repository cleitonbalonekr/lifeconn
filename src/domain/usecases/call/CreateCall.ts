export interface CreateCall {
  add: (params: CreateCall.Params) => Promise<CreateCall.Result>;
}

export namespace CreateCall {
  export type Params = {
    userId: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };

  export type Result = void;
}
