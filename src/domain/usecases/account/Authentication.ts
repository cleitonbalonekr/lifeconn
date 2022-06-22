import { InvalidCredentialsError, UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import {
  GetUserInfoByAuthRepository,
  SignInWithEmailAndPasswordRepository
} from '@/domain/protocols/db/account';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export type AuthenticationModel = AuthUser;

export class Authentication {
  constructor(
    private readonly signInWithEmailAndPasswordRepository: SignInWithEmailAndPasswordRepository,
    private readonly getUserInfoByAuthRepository: GetUserInfoByAuthRepository
  ) {}

  async auth(params: AuthenticationParams): Promise<AuthUser> {
    try {
      const authResponse =
        await this.signInWithEmailAndPasswordRepository.signIn(params);
      if (!authResponse) {
        throw new InvalidCredentialsError();
      }

      const response = await this.getUserInfoByAuthRepository.getUserByAuthId(
        authResponse.authId
      );
      if (!response) {
        throw new UserNotFoundError();
      }

      return response;
    } catch (error: any) {
      return catchErrorVerification(error);
    }
  }
}
