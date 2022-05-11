export interface StoreFile {
  store: (params: StoreFile.Params) => Promise<StoreFile.Result>;
}

export namespace StoreFile {
  export type Params = {
    file: File;
    callId: string;
  };
  export type Result = string;
}
