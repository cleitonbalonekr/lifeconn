import { RemoteCreateMessage } from '@/data/usecases/';
import { UnexpectedError } from '@/domain/errors';
import { InvalidCallError } from '@/domain/errors/InvalidCallError';
import { randomId, throwError } from '@/tests/shared/mocks';

import {
  AddCallEventRepositorySpy,
  CloseCallRepositorySpy
} from '../mock/call-mock';
import {
  CreateMessageRepositorySpy,
  makeFakeMessage
} from '../mock/message-mock';

const makeSut = () => {
  const createMessageRepositorySpy = new CreateMessageRepositorySpy();
  const remoteCreateMessage = new RemoteCreateMessage(
    createMessageRepositorySpy
  );
  return {
    remoteCreateMessage,
    createMessageRepositorySpy
  };
};

describe('RemoteCreateMessage', () => {
  it('should throw UnexpectedError if some error happens', async () => {
    const { remoteCreateMessage, createMessageRepositorySpy } = makeSut();
    jest
      .spyOn(createMessageRepositorySpy, 'add')
      .mockRejectedValueOnce(throwError);
    const message = makeFakeMessage();
    const promise = remoteCreateMessage.create(message, randomId());
    expect(promise).rejects.toThrowError(new UnexpectedError());
  });
  it('should throw InvalidCallError', async () => {
    const { remoteCreateMessage, createMessageRepositorySpy } = makeSut();
    createMessageRepositorySpy.response = null;
    const message = makeFakeMessage();
    const promise = remoteCreateMessage.create(message, randomId());
    expect(promise).rejects.toThrowError(new InvalidCallError());
  });
  it('should throw call CreateMessageRepository', async () => {
    const { remoteCreateMessage, createMessageRepositorySpy } = makeSut();
    const message = makeFakeMessage();
    const response = await remoteCreateMessage.create(message, randomId());
    expect(createMessageRepositorySpy.callCount).toBe(1);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('content');
  });
});
