export interface SignOutRepository {
  signOut(): Promise<SignOutRepository.Result>;
}

export namespace SignOutRepository {
  export type Result = void;
}
