import { ApplicationError } from './ApplicationError';

export class CallAlreadyOpenError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Já existe uma ocorrência criada para esse usuário.');
    this.name = 'CallAlreadyOpenError';
  }
}
