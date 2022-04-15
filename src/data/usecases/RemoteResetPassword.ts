import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { ResetPassword } from '@/domain/usecases';

import { SendEmailToRecoveryPassword } from '../protocols/account';

export class RemoteResetPassword implements ResetPassword {
  constructor(
    private readonly sendEmailToRecoveryPassword: SendEmailToRecoveryPassword
  ) {}

  async recovery(email: ResetPassword.Params) {
    try {
      const response = await this.sendEmailToRecoveryPassword.sendEmail(email);
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
