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
        content: makeFakeMessage().content,
        from: randomId()
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
        content: makeFakeMessage().content,
        from: randomId()
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
  describe('isFull', () => {
    it('should return NULL when call does not exists', async () => {
      const sut = makeSut();
      const callId = randomId();
      const response = await sut.isFilesFull(callId);
      expect(response).toBeNull();
    });
    it('should return TRUE when file array contains CALL_FILE_LIMIT', async () => {
      const sut = makeSut();
      const params = makeFakeCallEventParams();
      const { callId } = params;
      await makeCall(callId, {
        ...makeFakeCallParams(),
        files: ['fakeFile1', 'fakeFile2', 'fakeFile3']
      });
      const response = await sut.isFilesFull(callId);
      expect(response).toBeTruthy();
    });
    it('should return FALSE when file array is under CALL_FILE_LIMIT', async () => {
      const sut = makeSut();
      const params = makeFakeCallEventParams();
      const { callId } = params;
      await makeCall(callId, {
        ...makeFakeCallParams(),
        files: ['fakeFile1', 'fakeFile2']
      });
      const response = await sut.isFilesFull(callId);
      expect(response).toBeFalsy();
    });
  });
});
