import { UnexpectedError } from '@/domain/errors';
import { LoadCallMessage } from '@/domain/usecases';
import { randomId, throwError } from '@/tests/shared/mocks';

import { LoadContactsCallsRepositorySpy } from '../mock/call-mock';
import { makeFakeContact } from '../mock/contact-mock';
import { LoadCallMessageRepositorySpy } from '../mock/message-mock';

const makeSut = () => {
  const loadCallMessageRepositorySpy = new LoadCallMessageRepositorySpy();
  const remoteLoadCalls = new LoadCallMessage(loadCallMessageRepositorySpy);
  return {
    remoteLoadCalls,
    loadCallMessageRepositorySpy
  };
};

describe('RemoteLoadCallMessage', () => {
  it('Should throw UnexpectedError when some error happens', async () => {
    const { remoteLoadCalls, loadCallMessageRepositorySpy } = makeSut();
    jest
      .spyOn(loadCallMessageRepositorySpy, 'loadMessages')
      .mockImplementationOnce(throwError);

    const promise = remoteLoadCalls.load(randomId());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('Should call loadCallMessageRepositorySpy and return an array of Message ', async () => {
    const { remoteLoadCalls, loadCallMessageRepositorySpy } = makeSut();

    const messages = await remoteLoadCalls.load(randomId());
    expect(loadCallMessageRepositorySpy.callCount).toBe(1);
    expect(messages).toHaveLength(1);
  });
});
