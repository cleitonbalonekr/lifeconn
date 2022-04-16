import faker from '@faker-js/faker';

import { fakeId } from '@/tests/shared/mocks';

export const makeUserUpdateInfo = () => ({
  fullName: faker.internet.userName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  totalVoiceToken: fakeId,
  impactActivation: true
});
