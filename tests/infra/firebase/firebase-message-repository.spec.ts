import { FirebaseMessageRepository } from '@/infra/firebase';
import { makeFakeMessage } from '@/tests/data/mock/message-mock';
import { randomId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

import { makeCall, makeMessage } from '../mock';
import { makeFakeCallEventParams, makeFakeCallParams } from '../mock/call-mock';

const makeSut = () => {
  return new FirebaseMessageRepository();
};

describe('FirebaseMessageRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });
  describe('Add', () => {
    it('Should return null if call does not exist', async () => {
      const sut = makeSut();
      const callId = randomId();
      const messageParams = {
        isPhoto: false,
        content: makeFakeMessage().content
      };
      const response = await sut.add(messageParams, callId);
      expect(response).toBeNull();
    });
    it('Should create a message', async () => {
      const sut = makeSut();

      const params = makeFakeCallEventParams();
      await makeCall(params.callId, makeFakeCallParams());
      const messageParams = {
        isPhoto: false,
        content: makeFakeMessage().content
      };
      const response = await sut.add(messageParams, params.callId);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('createdAt');
      expect(response).toHaveProperty('isPhoto', messageParams.isPhoto);
      expect(response).toHaveProperty('content', messageParams.content);
    });
  });
  describe('loadMessages', () => {
    it('should return an empty array when there are no messages', async () => {
      const sut = makeSut();
      const params = makeFakeCallEventParams();
      const { callId } = params;
      await makeCall(callId, makeFakeCallParams());
      const messages = await sut.loadMessages(callId);
      expect(messages).toHaveLength(0);
    });
    it('should load all messages by callId', async () => {
      const sut = makeSut();
      const params = makeFakeCallEventParams();
      const { callId } = params;
      await makeCall(callId, makeFakeCallParams());
      await makeMessage(callId, makeFakeMessage());
      const messages = await sut.loadMessages(callId);
      expect(messages).toHaveLength(1);
    });
  });
});
