import { AddAccountRepository } from '@/data/protocols/AddAccountRepository';

export class AuthAddAccount implements AddAccountRepository {
  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    return {
      id: '',
      email: '',
      phoneNumber: ''
    };
  }
}
