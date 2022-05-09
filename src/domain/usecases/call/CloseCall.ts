export interface CloseCall {
  close: (params: CloseCall.Params) => Promise<CloseCall.Result>;
}

export namespace CloseCall {
  export type Params = {
    userId: string;
    callId: string;
  };
  export type Result = void;
}
