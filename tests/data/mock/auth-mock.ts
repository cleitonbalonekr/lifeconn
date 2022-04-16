/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  GetUserInfoByAuthRepository,
  SignInWithEmailAndPasswordRepository,
  SendEmailToRecoveryPassword
} from '../protocols/account';

export const getFakeCredentials = () => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});
export const getFakeAuthUser = () => ({
  id: faker.datatype.uuid(),
  authId: faker.datatype.uuid(),
  fullName: faker.internet.userName(),
  nickname: faker.internet.userName(),
  totalVoiceToken: faker.random.alphaNumeric(8),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  photo: faker.internet.avatar()
});

export class SendEmailToRecoveryPasswordSpy
  implements SendEmailToRecoveryPassword
{
  public response = true;

  public callCount = 0;

  async sendEmail(
    params: SendEmailToRecoveryPassword.Params
  ): Promise<SendEmailToRecoveryPassword.Result> {
    this.callCount += 1;
    return this.response;
  }
}
export class SignInWithEmailAndPasswordRepositorySpy
  implements SignInWithEmailAndPasswordRepository
{
  public response: any = {
    authId: faker.random.alphaNumeric(8)
  };

  async signIn(
    params: SignInWithEmailAndPasswordRepository.Params
  ): Promise<SignInWithEmailAndPasswordRepository.Result> {
    return this.response;
  }
}

export class GetUserInfoByAuthRepositorySpy
  implements GetUserInfoByAuthRepository
{
  public response: any = getFakeAuthUser();

  async getUserByAuthId(
    authId: string
  ): Promise<GetUserInfoByAuthRepository.Result> {
    if (this.response)
      return {
        ...this.response,
        authId
      };
    return this.response;
  }
}
