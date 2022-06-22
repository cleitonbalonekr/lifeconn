export interface RemoveCallFilesRepository {
  removeFile(
    params: RemoveCallFilesRepository.Params
  ): Promise<RemoveCallFilesRepository.Result>;
}

export namespace RemoveCallFilesRepository {
  export type Params = string;
  export type Result = void;
}
