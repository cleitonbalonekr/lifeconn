export interface LogoutUser {
  signOut: () => Promise<LogoutUser.Result>;
}

export namespace LogoutUser {
  export type Result = void;
}
