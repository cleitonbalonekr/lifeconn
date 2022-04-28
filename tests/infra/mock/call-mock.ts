import { makeLocation } from '@/tests/data/mock/call-mock';
import { randomId } from '@/tests/shared/mocks';

export const makeFakeCallParams = () => {
  return {
    id: randomId(),
    userId: randomId(),
    token: randomId(),
    location: makeLocation()
  };
};
