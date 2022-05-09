import { RemoteCloseCall } from '@/data/usecases/call';
import { UnexpectedError } from '@/domain/errors';
import { InvalidCallError } from '@/domain/errors/InvalidCallError';
import { randomId, throwError } from '@/tests/shared/mocks';

import {
  AddCallEventRepositorySpy,
  CloseCallRepositorySpy
} from '../mock/call-mock';

const makeSut = () => {
  const closeCallRepositorySpy = new CloseCallRepositorySpy();
  const addCallEventRepositorySpy = new AddCallEventRepositorySpy();
  const remoteCloseCall = new RemoteCloseCall(
    closeCallRepositorySpy,
    addCallEventRepositorySpy
  );
  return {
    remoteCloseCall,
    closeCallRepositorySpy,
    addCallEventRepositorySpy
  };
};

describe('RemoteCloseCall', () => {
  it('should throw UnexpectedError if some error happens', async () => {
    const { remoteCloseCall, closeCallRepositorySpy } = makeSut();
    jest
      .spyOn(closeCallRepositorySpy, 'closeCall')
      .mockRejectedValueOnce(throwError);
    const promise = remoteCloseCall.close({
      callId: randomId(),
      userId: randomId()
    });
    expect(promise).rejects.toThrowError(new UnexpectedError());
  });
  it('should throw InvalidCallError', async () => {
    const { remoteCloseCall, closeCallRepositorySpy } = makeSut();
    closeCallRepositorySpy.response = false;
    const promise = remoteCloseCall.close({
      callId: randomId(),
      userId: randomId()
    });
    expect(promise).rejects.toThrowError(new InvalidCallError());
  });
  it('should call CloseCallRepository and addCallEventRepositorySpy', async () => {
    const {
      remoteCloseCall,
      closeCallRepositorySpy,
      addCallEventRepositorySpy
    } = makeSut();

    await remoteCloseCall.close({
      callId: randomId(),
      userId: randomId()
    });
    expect(closeCallRepositorySpy.callCount).toBe(1);
    expect(addCallEventRepositorySpy.callCount).toBe(1);
  });
});
