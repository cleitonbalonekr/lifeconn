export interface CloseCallRepository {
  closeCall(
    callId: CloseCallRepository.Params
  ): Promise<CloseCallRepository.Result>;
}

export namespace CloseCallRepository {
  export type Params = {
    userId: string;
    callId: string;
  };
  export type Result = boolean;
}
