import { AddAccountRepository } from '@/data/protocols/AddAccountRepository';
import { RemoteAddAccount } from '@/data/usecases/RemoteAddAccount';

class AddAccountRepositorySpy implements AddAccountRepository {
  public callCount = 0;

  public fakeResponse = {
    id: 'fake_id',
    email: 'fake_email',
    phoneNumber: 'fake_phone_number'
  };

  async register(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    this.callCount += 1;
    return this.fakeResponse;
  }
}
const fakeRegisterData = {
  email: 'fake_email',
  phoneNumber: 'fake_phone',
  password: 'fake_password'
};
const makeSut = () => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const remoteAddAccount = new RemoteAddAccount(addAccountRepositorySpy);
  return { remoteAddAccount, addAccountRepositorySpy };
};

describe('RemoteAddAccount', () => {
  it('should call AddAccountRepository and return authUser', async () => {
    const { remoteAddAccount, addAccountRepositorySpy } = makeSut();
    const response = await remoteAddAccount.add(fakeRegisterData);
    expect(addAccountRepositorySpy.callCount).toBe(1);
    expect(response).toHaveProperty('id');
    expect(response).toEqual(addAccountRepositorySpy.fakeResponse);
  });
});
