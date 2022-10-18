export interface UploadFileRepository {
  storeFile(
    params: UploadFileRepository.Params
  ): Promise<UploadFileRepository.Result>;
}

export namespace UploadFileRepository {
  export type Params = {
    callId: string;
    fileUri: string;
  };
  export type Result = string;
}
