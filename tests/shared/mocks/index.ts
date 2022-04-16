import faker from '@faker-js/faker';

export const fakeId = faker.datatype.uuid();
export const throwError = (): never => {
  throw new Error();
};
