import faker from '@faker-js/faker';

import { CreateMessageRepository } from '@/data/protocols/message';
import { randomId } from '@/tests/shared/mocks';

export const makeFakeMessage = () => ({
  id: randomId(),
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
