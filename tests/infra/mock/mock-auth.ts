import faker from '@faker-js/faker';

export const fakeUseRegisterData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  phoneNumber: faker.phone.phoneNumber()
});
