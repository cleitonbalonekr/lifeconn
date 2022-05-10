/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import {
  CreateMessageRepository,
  LoadCallMessageRepository,
  ListenMessagesRepository
} from '@/data/protocols/message';
import { randomId } from '@/tests/shared/mocks';

export const makeFakeMessage = () => ({
  id: randomId(),
  from: randomId(),
  isPhoto: false,
  content: faker.lorem.sentence(),
  createdAt: new Date()
});

export class CreateMessageRepositorySpy implements CreateMessageRepository {
  public callCount = 0;

  public response: CreateMessageRepository.Result = makeFakeMessage();

  async add(
    params: CreateMessageRepository.Params,
    callId: string
  ): Promise<CreateMessageRepository.Result> {
    this.callCount += 1;
    return this.response;
  }
}
export class LoadCallMessageRepositorySpy implements LoadCallMessageRepository {
  public callCount = 0;

  public response: LoadCallMessageRepository.Result = [makeFakeMessage()];

  async loadMessages(
    callId: string
  ): Promise<LoadCallMessageRepository.Result> {
    this.callCount += 1;
    return this.response;
  }
}
export class ListenMessagesRepositorySpy implements ListenMessagesRepository {
  public callCount = 0;

  public response: ListenMessagesRepository.Result = () => {};

  subscribe(
    callId: ListenMessagesRepository.Params
  ): ListenMessagesRepository.Result {
    this.callCount += 1;
    return this.response;
  }
}
