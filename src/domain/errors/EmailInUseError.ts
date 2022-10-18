import { ApplicationError } from './ApplicationError';

export class EmailInUseError extends Error implements ApplicationError {
  constructor() {
    super('Esse e-mail já está em uso');
    this.name = 'EmailInUseError';
  }

  isApplicationError = true;
}
