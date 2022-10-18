import { ApplicationError } from './ApplicationError';

export class ContactNotFoundError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Contato não encontrado');
    this.name = 'ContactNotFoundError';
  }
}
