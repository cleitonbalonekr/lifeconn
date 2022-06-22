import faker from '@faker-js/faker';

import { EventStatus } from '@/domain/models/CallEvent';
import { makeLocation } from '@/tests/domain/mock/call-mock';
import { randomId } from '@/tests/shared/mocks';

export const makeFakeCallParams = () => {
  return {
    id: randomId(),
    userId: randomId(),
    token: randomId(),
    location: makeLocation()
  };
};
export const makeFakeCallEventParams = () => {
  return {
    notes: faker.datatype.string(8),
    status: EventStatus.AUTHOR_CREATED,
    creatorId: randomId(),
    callId: randomId()
  };
};
