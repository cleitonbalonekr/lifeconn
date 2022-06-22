export interface VerifyCallAlreadyOpenRepository {
  hasCallOpen(
    params: VerifyCallAlreadyOpenRepository.Params
  ): Promise<VerifyCallAlreadyOpenRepository.Result>;
}

export namespace VerifyCallAlreadyOpenRepository {
  export type Params = string;

  export type Result = boolean;
}
