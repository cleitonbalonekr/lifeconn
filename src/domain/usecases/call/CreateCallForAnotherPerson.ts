import { CallAlreadyOpenError, UserNotFoundError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { EventStatus } from '@/domain/models/CallEvent';
import { CheckAccountPhoneNumberRepository } from '@/domain/protocols/db/account';
import {
  AddCallEventRepository,
  CreateCallRepository,
  VerifyCallAlreadyOpenRepository
} from '@/domain/protocols/db/call';
import { GetUserByIdRepository } from '@/domain/protocols/db/user';
import { TokenGenerator } from '@/domain/protocols/hash/TokenGenerator';

export type CreateCallForAnotherPersonParams = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  victim?: {
    fullName: string;
    phoneNumber: string;
  };
};

export type CreateCallForAnotherPersonResult = {
  token: string;
  victimId: string | null;
};

export class CreateCallForAnotherPerson {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly getVictimIdByPhoneRepository: CheckAccountPhoneNumberRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly createCallRepository: CreateCallRepository,
    private readonly addCallEventRepository: AddCallEventRepository,
    private readonly verifyCallAlreadyOpenRepository: VerifyCallAlreadyOpenRepository
  ) {}

  async add(params: CreateCallForAnotherPersonParams, creatorId: string) {
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
      return {
        token: call.token,
        victimId: payload.userId
      };
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
