import faker from '@faker-js/faker';

import { fakeId } from '@/tests/shared/mocks';

export const makeUserUpdateInfo = () => ({
  fullName: faker.internet.userName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  totalVoiceToken: fakeId,
  impactActivation: true
});
export const makeMedicalData = () => {
  return {
    title: faker.random.word(),
    description: faker.random.words(6),
    onlyOrganization: false
  };
};
