import {
  GetUserInfoByAuthRepository,
  SignInWithEmailAndPasswordRepository
} from '@/data/protocols/account';
import { InvalidCredentialsError, UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { Authentication } from '@/domain/usecases';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly signInWithEmailAndPasswordRepository: SignInWithEmailAndPasswordRepository,
    private readonly getUserInfoByAuthRepository: GetUserInfoByAuthRepository
  ) {}

  async auth(params: Authentication.Params): Promise<AuthUser> {
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
