import { CheckAccountPhoneNumberRepository } from '@/data/protocols/account';
import {
  AddCallEventRepository,
  CreateCallRepository
} from '@/data/protocols/call';
import { TokenGenerator } from '@/data/protocols/hash/TokenGenerator';
import { GetUserByIdRepository } from '@/data/protocols/user';
import { UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import { CreateCallForAnotherPerson } from '@/domain/usecases/call';

export class RemoteCreateCallForAnotherPerson
  implements CreateCallForAnotherPerson
{
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly getVictimIdByPhoneRepository: CheckAccountPhoneNumberRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly createCallRepository: CreateCallRepository,
    private readonly addCallEventRepository: AddCallEventRepository
  ) {}

  async add(params: CreateCallForAnotherPerson.Params, creatorId: string) {
    try {
      const token = this.tokenGenerator.generate();
      const helper = await this.getUserByIdRepository.getUser(creatorId);
      if (!helper) {
        throw new UserNotFoundError();
      }
      const payload: CreateCallRepository.Params = {
        location: params.location,
        token,
        userId: null,
        helper: {
          id: helper.id,
          fullName: helper.fullName || helper.email,
          phoneNumber: helper.phoneNumber
        }
      };
      if (params.victim) {
        const { phoneNumberInUse, userId } =
          await this.getVictimIdByPhoneRepository.checkPhoneNumber(
            params.victim?.phoneNumber
          );
        if (phoneNumberInUse) {
          payload.userId = userId;
        } else {
          payload.victimName = params.victim.fullName;
        }
      }

      const call = await this.createCallRepository.create(payload);
      await this.addCallEventRepository.add({
        callId: call.id,
        status: EventStatus.AUTHOR_CREATED,
        creatorId
      });
      return call.token;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
