/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { AuthUser } from '@/domain/models';

export interface LogoutUser {
  signOut: () => Promise<LogoutUser.Result>;
}

export namespace LogoutUser {
  export type Result = void;
}
