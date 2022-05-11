/* eslint-disable max-classes-per-file */
import faker from '@faker-js/faker';

import { SaveCallFileUrlRepository } from '@/data/protocols/call';
import { UploadFileRepository } from '@/data/protocols/fileStorage';
import {
  CreateMessageRepository,
  LoadCallMessageRepository,
  ListenMessagesRepository,
  VerifyFileLimitRepository
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

export class VerifyFileLimitRepositorySpy implements VerifyFileLimitRepository {
  public callCount = 0;

  public response: VerifyFileLimitRepository.Result = false;

  async isFull(callId: VerifyFileLimitRepository.Params) {
    this.callCount += 1;
    return this.response;
  }
}

export class UploadFileRepositorySpy implements UploadFileRepository {
  public callCount = 0;

  public response: UploadFileRepository.Result = faker.image.imageUrl();

  async storeFile(params: UploadFileRepository.Params) {
    this.callCount += 1;
    return this.response;
  }
}
export class SaveCallFileUrlRepositorySpy implements SaveCallFileUrlRepository {
  public callCount = 0;

  public params: SaveCallFileUrlRepository.Params =
    {} as SaveCallFileUrlRepository.Params;

  async addFileUrl(params: SaveCallFileUrlRepository.Params) {
    this.callCount += 1;
    this.params = params;
  }
}
