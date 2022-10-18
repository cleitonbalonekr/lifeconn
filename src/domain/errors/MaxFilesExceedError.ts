import { ApplicationError } from './ApplicationError';

export class MaxFilesExceedError extends Error implements ApplicationError {
  public isApplicationError = true;

  constructor() {
    super('Limite de arquivos excedido');
    this.name = 'MaxFilesExceedError';
  }
}
