import { FirebaseCallRepository } from '@/infra/firebase';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import { makeFakeCallParams } from '../mock/call-mock';

const makeSut = () => {
  const firebaseCallRepository = new FirebaseCallRepository();
  return firebaseCallRepository;
};

describe('FirebaseCallRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  describe('create', () => {
    it('Should create a Call', async () => {
      const firebaseCallRepository = makeSut();
      const params = makeFakeCallParams();

      const call = await firebaseCallRepository.create(params);
      expect(call).toHaveProperty('id');
      expect(call).toHaveProperty('location');
      expect(call).toHaveProperty('token');
      expect(call).toHaveProperty('createdAt');
      expect(call).toHaveProperty('userId', params.userId);
    });
  });
});
