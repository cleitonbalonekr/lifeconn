import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SendEmailToRecoveryPassword } from '@/domain/protocols/db/account';

export type ResetPasswordParams = string;

export type ResetPasswordModel = boolean;

export class ResetPassword {
  constructor(
    private readonly sendEmailToRecoveryPassword: SendEmailToRecoveryPassword
  ) {}

  async recovery(email: ResetPasswordParams) {
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
