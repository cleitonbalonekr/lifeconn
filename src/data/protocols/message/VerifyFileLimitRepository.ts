export interface VerifyFileLimitRepository {
  isFull(
    callId: VerifyFileLimitRepository.Params
  ): Promise<VerifyFileLimitRepository.Result>;
}

export namespace VerifyFileLimitRepository {
  export type Params = string;
  export type Result = boolean | null;
}
