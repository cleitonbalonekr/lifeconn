import { ApplicationError } from './ApplicationError';

export class ContactAlreadyAddedError
  extends Error
  implements ApplicationError
{
  public isApplicationError = true;

  constructor() {
    super('Contato já adicionado');
    this.name = 'ContactAlreadyAddedError';
  }
}
