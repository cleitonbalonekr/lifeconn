import { EventStatus } from '@/domain/models/CallEvent';
import { FirebaseCallEventRepository } from '@/infra/firebase';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import { makeCall } from '../mock';
import { makeFakeCallEventParams, makeFakeCallParams } from '../mock/call-mock';

const makeSut = () => {
  const firebaseCallEventRepository = new FirebaseCallEventRepository();
  return firebaseCallEventRepository;
};

describe('FirebaseCallEventRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  describe('add', () => {
    it('Should return null if call does not exist', async () => {
      const firebaseCallEventRepository = makeSut();
      const params = makeFakeCallEventParams();
      const call = await firebaseCallEventRepository.add(params);
      expect(call).toBeNull();
    });
    it('Should return create a callEvent', async () => {
      const firebaseCallEventRepository = makeSut();
      const params = makeFakeCallEventParams();
      await makeCall(params.callId, makeFakeCallParams());
      const call = await firebaseCallEventRepository.add(params);
      expect(call).toHaveProperty('id');
      expect(call).toHaveProperty('creatorId', params.creatorId);
    });
  });
});
