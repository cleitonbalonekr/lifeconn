import { ApplicationError } from './ApplicationError';

export class InvalidCallError extends Error implements ApplicationError {
  constructor() {
    super('Ocorrência inválida');
    this.name = 'InvalidCallError';
  }

  isApplicationError = true;
}
