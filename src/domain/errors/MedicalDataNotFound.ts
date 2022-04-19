import { ApplicationError } from './ApplicationError';

export class MedicalDataNotFound extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Dados médicos não encontrado');
    this.name = 'MedicalDataNotFound';
  }
}
