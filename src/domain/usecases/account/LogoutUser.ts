import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SignOutRepository } from '@/domain/protocols/db/account';

export type LogoutUserResult = void;

export class LogoutUser implements LogoutUser {
  constructor(private readonly signOutRepository: SignOutRepository) {}

  async signOut(): Promise<LogoutUserResult> {
    try {
      await this.signOutRepository.signOut();
    } catch (error: any) {
      catchErrorVerification(error);
    }
  }
}
