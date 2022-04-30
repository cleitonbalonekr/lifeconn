import { FirebaseCallRepository } from '@/infra/firebase';
import { makeFakeCallData } from '@/tests/data/mock/call-mock';
import { makeFakeContact } from '@/tests/data/mock/contact-mock';
import { randomId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import { makeCall } from '../mock';
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
  describe('listByUser', () => {
    it('Should return a empty array when does not fount any call', async () => {
      const firebaseCallRepository = makeSut();
      const call = await firebaseCallRepository.listByUser(randomId());
      expect(call).toHaveLength(0);
    });
    it('Should return all calls by userId', async () => {
      const firebaseCallRepository = makeSut();
      const userId = randomId();
      const callData = {
        ...makeFakeCallData(),
        userId
      };
      await makeCall(randomId(), callData);
      const call = await firebaseCallRepository.listByUser(userId);
      expect(call).toHaveLength(1);
    });
    it('Should not return a closed call', async () => {
      const firebaseCallRepository = makeSut();
      const userId = randomId();
      const callData = {
        ...makeFakeCallData(),
        userId,
        open: false
      };
      await makeCall(randomId(), callData);
      const call = await firebaseCallRepository.listByUser(userId);
      expect(call).toHaveLength(0);
    });
  });
  describe('listByContacts', () => {
    it('Should return a empty array when does not fount any call', async () => {
      const firebaseCallRepository = makeSut();
      const contacts = [makeFakeContact()];
      const call = await firebaseCallRepository.listByContacts(contacts);
      expect(call).toHaveLength(0);
    });
    it('Should return all calls by contacts', async () => {
      const firebaseCallRepository = makeSut();
      const userId = randomId();
      const userId2 = randomId();
      const contacts = [
        {
          ...makeFakeContact(),
          contactId: userId
        },
        {
          ...makeFakeContact(),
          contactId: userId2
        }
      ];
      const callData = {
        ...makeFakeCallData(),
        userId
      };
      const callData2 = {
        ...makeFakeCallData(),
        userId: userId2
      };
      await makeCall(randomId(), callData);
      await makeCall(randomId(), callData2);
      const call = await firebaseCallRepository.listByContacts(contacts);
      expect(call).toHaveLength(2);
    });
    it('Should not return a closed call', async () => {
      const firebaseCallRepository = makeSut();
      const userId = randomId();
      const contacts = [
        {
          ...makeFakeContact(),
          contactId: userId
        }
      ];
      const callData = {
        ...makeFakeCallData(),
        userId,
        open: false
      };
      await makeCall(randomId(), callData);
      const call = await firebaseCallRepository.listByContacts(contacts);
      expect(call).toHaveLength(0);
    });
  });
});
