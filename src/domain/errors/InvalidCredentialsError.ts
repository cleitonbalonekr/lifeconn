import { ApplicationError } from './ApplicationError';

export class InvalidCredentialsError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Credenciais inválidas');
    this.name = 'InvalidCredentialsError';
  }
}
