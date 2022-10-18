export interface SaveCallFileUrlRepository {
  addFileUrl(
    params: SaveCallFileUrlRepository.Params
  ): Promise<SaveCallFileUrlRepository.Result>;
}

export namespace SaveCallFileUrlRepository {
  export type Params = {
    callId: string;
    fileUrl: string;
  };
  export type Result = void;
}
