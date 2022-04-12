import { AuthAddAccount } from '@/infra/firebase/AuthAddAccount';
import {
  setupEmulators,
  cleanEmulators
} from '@/tests/utils/firebase-emulator';

describe('AuthAddAccount', () => {
  beforeEach(() => {
    setupEmulators();
  });
  afterEach(async () => {
    await cleanEmulators();
  });
  it('Should register an user an create an user collection', async () => {
    const sut = new AuthAddAccount();
    const response = await sut.register({
      email: 'cleitonbaloneker@gmail.com',
      password: 'cleitonbaloneker',
      phoneNumber: '22992725861'
    });
    expect(response.email).toEqual('cleitonbaloneker@gmail.com');
    expect(response).toHaveProperty('id');
  });
});
