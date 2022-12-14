import { UnexpectedError } from '@/domain/errors';
import { SubscribeToMessages } from '@/domain/usecases';
import { randomId, throwError } from '@/tests/shared/mocks';

import { ListenMessagesRepositorySpy } from '../mock/message-mock';

const makeSut = () => {
  const listenMessagesRepositorySpy = new ListenMessagesRepositorySpy();
  const remoteLoadCalls = new SubscribeToMessages(listenMessagesRepositorySpy);
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

    const subscribe = () => remoteLoadCalls.subscribe(params);

    expect(subscribe).toThrow(new UnexpectedError());
  });
  it('Should call listenMessagesRepositorySpy and return an array of Message ', () => {
    const { remoteLoadCalls, listenMessagesRepositorySpy } = makeSut();
    const params = {
      callId: randomId(),
      successCallback: jest.fn(),
      errorCallback: jest.fn()
    };
    remoteLoadCalls.subscribe(params);
    expect(listenMessagesRepositorySpy.callCount).toBe(1);
  });
});
