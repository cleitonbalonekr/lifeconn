import { RemoteCreateCall } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { randomId, throwError } from '@/tests/shared/mocks';

import {
  AddCallEventRepositorySpy,
  CreateCallRepositorySpy,
  makeLocation,
  TokenGeneratorSpy
} from '../mock/call-mock';

const makeSut = () => {
  const createCallRepositorySpy = new CreateCallRepositorySpy();
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  const addCallEventRepositorySpy = new AddCallEventRepositorySpy();
  const remoteCreateCall = new RemoteCreateCall(
    createCallRepositorySpy,
    tokenGeneratorSpy,
    addCallEventRepositorySpy
  );
  return {
    remoteCreateCall,
    createCallRepositorySpy,
    tokenGeneratorSpy,
    addCallEventRepositorySpy
  };
};

describe('RemoteCreateCall', () => {
  it('it throw UnexpectedError if some error happens', async () => {
    const { remoteCreateCall, tokenGeneratorSpy } = makeSut();
    jest
      .spyOn(tokenGeneratorSpy, 'generate')
      .mockImplementationOnce(throwError);
    const promise = remoteCreateCall.add({
      location: makeLocation(),
      userId: randomId()
    });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('it should call tokenGenerator', async () => {
    const { remoteCreateCall, tokenGeneratorSpy } = makeSut();
    await remoteCreateCall.add({
      location: makeLocation(),
      userId: randomId()
    });
    expect(tokenGeneratorSpy.callCount).toBe(1);
  });
  it('it should call createCallRepository', async () => {
    const { remoteCreateCall, createCallRepositorySpy } = makeSut();
    await remoteCreateCall.add({
      location: makeLocation(),
      userId: randomId()
    });
    expect(createCallRepositorySpy.callCount).toBe(1);
    expect(createCallRepositorySpy.params).toHaveProperty('token');
  });
  it('it should call addCallEventRepository and return call token', async () => {
    const { remoteCreateCall, addCallEventRepositorySpy, tokenGeneratorSpy } =
      makeSut();
    const userId = randomId();
    const response = await remoteCreateCall.add({
      location: makeLocation(),
      userId
    });
    expect(addCallEventRepositorySpy.callCount).toBe(1);
    expect(addCallEventRepositorySpy.params).toHaveProperty('callId');
    expect(addCallEventRepositorySpy.params).toHaveProperty(
      'creatorId',
      userId
    );
    expect(response).toEqual(tokenGeneratorSpy.response);
  });
});
