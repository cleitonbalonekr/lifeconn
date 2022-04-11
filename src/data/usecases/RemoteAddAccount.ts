import { AddAccount } from '@/domain/usecases';

import { AddAccountRepository } from '../protocols/AddAccountRepository';

export class RemoteAddAccount implements AddAccount {
  constructor(private addAccountRepository: AddAccountRepository) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const response = await this.addAccountRepository.register(params);
    return response;
  }
}
