import { SendEmailToRecoveryPassword } from '@/data/protocols/account';
import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { ResetPassword } from '@/domain/usecases';

export class RemoteResetPassword implements ResetPassword {
  constructor(
    private readonly sendEmailToRecoveryPassword: SendEmailToRecoveryPassword
  ) {}

  async recovery(email: ResetPassword.Params) {
    try {
      const response = await this.sendEmailToRecoveryPassword.sendEmail(email);
      if (!response) {
        throw new UserNotFoundError();
      }
      return response;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}