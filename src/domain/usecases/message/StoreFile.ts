export interface StoreFile {
  store: (params: StoreFile.Params) => Promise<StoreFile.Result>;
}

export namespace StoreFile {
  export type Params = {
    fileUri: string;
    callId: string;
  };
  export type Result = string;
}
