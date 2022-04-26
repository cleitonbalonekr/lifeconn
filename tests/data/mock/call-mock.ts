/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  AddCallEventRepository,
  CreateCallRepository
} from '@/data/protocols/call';
import { TokenGenerator } from '@/data/protocols/hash/TokenGenerator';
import { Call } from '@/domain/models/Call';
import { CallEvent, EventStatus } from '@/domain/models/CallEvent';
import { randomId } from '@/tests/shared/mocks';

export const makeLocation = () => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude())
});
export const makeCallEvent = () => ({
  id: randomId(),
  occurredAt: new Date(),
  status: EventStatus.AUTHOR_CREATED,
  creatorId: randomId()
});

export const makeFakeCallData = () => {
  const lastCallEvent = makeCallEvent();
  return {
    id: randomId(),
    userId: randomId(),
    token: randomId(),
    location: makeLocation(),
    createdAt: new Date(),
    events: [lastCallEvent],
    lastEvent: lastCallEvent,
    open: true
  };
};

export class TokenGeneratorSpy implements TokenGenerator {
  public callCount = 0;

  public response = randomId();

  async generate(): Promise<string> {
    this.callCount += 1;
    return this.response;
  }
}
export class CreateCallRepositorySpy implements CreateCallRepository {
  public callCount = 0;

  public params: CreateCallRepository.Params | undefined;

  public response = makeFakeCallData();

  async create(params: CreateCallRepository.Params): Promise<Call> {
    this.callCount += 1;
    this.params = params;
    return {
      ...this.response,
      token: params.token
    };
  }
}
export class AddCallEventRepositorySpy implements AddCallEventRepository {
  public callCount = 0;

  public params: AddCallEventRepository.Params | undefined;

  public response = makeCallEvent();

  async add(params: AddCallEventRepository.Params): Promise<CallEvent> {
    this.callCount += 1;
    this.params = params;
    return this.response;
  }
}
