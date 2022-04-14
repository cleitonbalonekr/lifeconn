import { ApplicationError } from './ApplicationError';

export class UserNotFoundError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Usuário não encontrado');
    this.name = 'UserNotFoundError';
  }
}
