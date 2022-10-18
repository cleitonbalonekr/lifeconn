import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { LogoutUser } from '@/domain/usecases';

import { SignOutRepository } from '../protocols/account';

export class RemoteLogoutUser implements LogoutUser {
  constructor(private readonly signOutRepository: SignOutRepository) {}

  async signOut(): Promise<LogoutUser.Result> {
    try {
      await this.signOutRepository.signOut();
    } catch (error: any) {
      catchErrorVerification(error);
    }
  }
}
