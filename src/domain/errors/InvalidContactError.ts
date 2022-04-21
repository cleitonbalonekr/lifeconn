// InvalidContactError
import { ApplicationError } from './ApplicationError';

export class InvalidContactError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Contato inválido, você pode estar tentando se adicionar');
    this.name = 'InvalidContactError';
  }
}
