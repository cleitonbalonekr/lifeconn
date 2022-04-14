export interface SignInWithEmailAndPasswordRepository {
  signIn(
    params: SignInWithEmailAndPasswordRepository.Params
  ): Promise<SignInWithEmailAndPasswordRepository.Result>;
}

export namespace SignInWithEmailAndPasswordRepository {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    authId: string;
  } | null;
}
