import { RemoteLoadCalls } from '@/data/usecases/call';
import { UnexpectedError } from '@/domain/errors';
import { randomId, throwError } from '@/tests/shared/mocks';

import {
  ListOpenCallsByUserRepositorySpy,
  LoadContactsCallsRepositorySpy
} from '../mock/call-mock';
import { makeFakeContact } from '../mock/contact-mock';

const makeSut = () => {
  const listOpenCallsByUserRepositorySpy =
    new ListOpenCallsByUserRepositorySpy();
  const loadContactsCallsRepositorySpy = new LoadContactsCallsRepositorySpy();
  const remoteLoadCalls = new RemoteLoadCalls(
    listOpenCallsByUserRepositorySpy,
    loadContactsCallsRepositorySpy
  );
  return {
    remoteLoadCalls,
    listOpenCallsByUserRepositorySpy,
    loadContactsCallsRepositorySpy
  };
};

describe('RemoteLoadCalls', () => {
  it('Should throw UnexpectedError when some error happens', async () => {
    const { remoteLoadCalls, listOpenCallsByUserRepositorySpy } = makeSut();
    jest
      .spyOn(listOpenCallsByUserRepositorySpy, 'listByUser')
      .mockImplementationOnce(throwError);
    const params = {
      userId: randomId(),
      contacts: [makeFakeContact()]
    };
    const promise = remoteLoadCalls.load(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('Should call listOpenCallsByUserRepositorySpy', async () => {
    const { remoteLoadCalls, listOpenCallsByUserRepositorySpy } = makeSut();
    const params = {
      userId: randomId(),
      contacts: [makeFakeContact()]
    };
    const response = await remoteLoadCalls.load(params);
    expect(listOpenCallsByUserRepositorySpy.callCount).toBe(1);
    expect(response).toHaveLength(2);
  });
  it('Should call loadContactsCallsRepositorySpy', async () => {
    const { remoteLoadCalls, loadContactsCallsRepositorySpy } = makeSut();
    const params = {
      userId: randomId(),
      contacts: [makeFakeContact()]
    };
    await remoteLoadCalls.load(params);
    expect(loadContactsCallsRepositorySpy.callCount).toBe(1);
  });
});
