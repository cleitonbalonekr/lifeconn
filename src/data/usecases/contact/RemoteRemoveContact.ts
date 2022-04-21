import { RemoteRemoveContactRepository } from '@/data/protocols/user';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { RemoveContact } from '@/domain/usecases';

export class RemoteRemoveContact implements RemoveContact {
  constructor(
    private readonly removeContactRepository: RemoteRemoveContactRepository
  ) {}

  async remove(phoneNumber: string, userId: string) {
    try {
      const user = await this.removeContactRepository.removeContact(
        phoneNumber,
        userId
      );
      return user;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
