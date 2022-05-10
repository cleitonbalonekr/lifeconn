import { RemoteSubscribeToMessages } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { randomId, throwError } from '@/tests/shared/mocks';

import { ListenMessagesRepositorySpy } from '../mock/message-mock';

const makeSut = () => {
  const listenMessagesRepositorySpy = new ListenMessagesRepositorySpy();
  const remoteLoadCalls = new RemoteSubscribeToMessages(
    listenMessagesRepositorySpy
  );
  return {
    remoteLoadCalls,
    listenMessagesRepositorySpy
  };
};

describe('RemoteLoadCallMessage', () => {
  it('Should throw UnexpectedError when some error happens', async () => {
    const { remoteLoadCalls, listenMessagesRepositorySpy } = makeSut();
    jest
      .spyOn(listenMessagesRepositorySpy, 'subscribe')
      .mockImplementationOnce(throwError);

    const params = {
      callId: randomId(),
      successCallback: jest.fn(),
      errorCallback: jest.fn()
    };

    const promise = remoteLoadCalls.subscribe(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('Should call listenMessagesRepositorySpy and return an array of Message ', async () => {
    const { remoteLoadCalls, listenMessagesRepositorySpy } = makeSut();
    const params = {
      callId: randomId(),
      successCallback: jest.fn(),
      errorCallback: jest.fn()
    };
    await remoteLoadCalls.subscribe(params);
    expect(listenMessagesRepositorySpy.callCount).toBe(1);
  });
});
