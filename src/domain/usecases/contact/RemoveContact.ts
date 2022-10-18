import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { AuthUser } from '@/domain/models';
import { RemoteRemoveContactRepository } from '@/domain/protocols/db/user';

export type RemoveContactResult = AuthUser;

export class RemoveContact {
  constructor(
    private readonly removeContactRepository: RemoteRemoveContactRepository
  ) {}

  async remove(
    phoneNumber: string,
    userId: string
  ): Promise<RemoveContactResult> {
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
