import { RemoteCreateCallForAnotherPerson } from '@/data/usecases';
import { UnexpectedError, UserNotFoundError } from '@/domain/errors';
import { randomId, throwError } from '@/tests/shared/mocks';

import { GetUserByIdRepositorySpy } from '../mock';
import {
  AddCallEventRepositorySpy,
  CreateCallRepositorySpy,
  makeLocation,
  TokenGeneratorSpy
} from '../mock/call-mock';
import {
  CheckAccountPhoneNumberRepositorySpy,
  makeAddContactParams
} from '../mock/contact-mock';

const makeSut = () => {
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  const checkAccountPhoneNumberRepositorySpy =
    new CheckAccountPhoneNumberRepositorySpy();
  const getUserByIdRepositorySpy = new GetUserByIdRepositorySpy();
  const createCallRepositorySpy = new CreateCallRepositorySpy();
  const addCallEventRepositorySpy = new AddCallEventRepositorySpy();
  const remoteCreateCallForAnotherPerson = new RemoteCreateCallForAnotherPerson(
    tokenGeneratorSpy,
    checkAccountPhoneNumberRepositorySpy,
    getUserByIdRepositorySpy,
    createCallRepositorySpy,
    addCallEventRepositorySpy
  );
  return {
    remoteCreateCallForAnotherPerson,
    tokenGeneratorSpy,
    checkAccountPhoneNumberRepositorySpy,
    getUserByIdRepositorySpy,
    createCallRepositorySpy,
    addCallEventRepositorySpy
  };
};

describe('RemoteCreateCallForAnotherPerson', () => {
  it('it throw UnexpectedError if some error happens', async () => {
    const { remoteCreateCallForAnotherPerson, tokenGeneratorSpy } = makeSut();
    const creatorId = randomId();
    jest
      .spyOn(tokenGeneratorSpy, 'generate')
      .mockImplementationOnce(throwError);
    const promise = remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation()
      },
      creatorId
    );
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('it throw UserNotFoundError if helper is not found', async () => {
    const { remoteCreateCallForAnotherPerson, getUserByIdRepositorySpy } =
      makeSut();
    const creatorId = randomId();
    getUserByIdRepositorySpy.response = null;
    const promise = remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation()
      },
      creatorId
    );
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('it should call tokenGenerator', async () => {
    const { remoteCreateCallForAnotherPerson, tokenGeneratorSpy } = makeSut();
    const creatorId = randomId();
    await remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation()
      },
      creatorId
    );
    expect(tokenGeneratorSpy.callCount).toBe(1);
  });
  it('it should call checkAccountPhoneNumberRepositorySpy when has victim phone and is register in the app', async () => {
    const {
      remoteCreateCallForAnotherPerson,
      checkAccountPhoneNumberRepositorySpy,
      createCallRepositorySpy
    } = makeSut();
    const creatorId = randomId();
    const victim = {
      fullName: makeAddContactParams().nickname,
      phoneNumber: makeAddContactParams().phoneNumber
    };
    checkAccountPhoneNumberRepositorySpy.response = {
      phoneNumberInUse: true,
      userId: randomId()
    };
    await remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation(),
        victim
      },
      creatorId
    );
    expect(checkAccountPhoneNumberRepositorySpy.count).toBe(1);
    expect(createCallRepositorySpy.params).toHaveProperty('userId');
    expect(createCallRepositorySpy.params?.victimName).toBeUndefined();
  });
  it('it should call checkAccountPhoneNumberRepositorySpy when has victim phone and is not register in the app', async () => {
    const {
      remoteCreateCallForAnotherPerson,
      checkAccountPhoneNumberRepositorySpy,
      createCallRepositorySpy
    } = makeSut();
    const creatorId = randomId();
    const victim = {
      fullName: makeAddContactParams().nickname,
      phoneNumber: makeAddContactParams().phoneNumber
    };

    await remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation(),
        victim
      },
      creatorId
    );
    expect(checkAccountPhoneNumberRepositorySpy.count).toBe(1);
    expect(createCallRepositorySpy.params).toHaveProperty('userId', null);
    expect(createCallRepositorySpy.params).toHaveProperty(
      'victimName',
      victim.fullName
    );
  });
  it('it should call createCallRepository', async () => {
    const { remoteCreateCallForAnotherPerson, createCallRepositorySpy } =
      makeSut();
    const creatorId = randomId();
    await remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation()
      },
      creatorId
    );
    expect(createCallRepositorySpy.callCount).toBe(1);
    expect(createCallRepositorySpy.params).toHaveProperty('token');
  });
  it('it should call addCallEventRepository and return call token', async () => {
    const {
      remoteCreateCallForAnotherPerson,
      addCallEventRepositorySpy,
      tokenGeneratorSpy
    } = makeSut();
    const creatorId = randomId();
    const response = await remoteCreateCallForAnotherPerson.add(
      {
        location: makeLocation()
      },
      creatorId
    );
    expect(addCallEventRepositorySpy.callCount).toBe(1);
    expect(addCallEventRepositorySpy.params).toHaveProperty('callId');
    expect(addCallEventRepositorySpy.params).toHaveProperty(
      'creatorId',
      creatorId
    );
    expect(response.token).toEqual(tokenGeneratorSpy.response);
  });
});
