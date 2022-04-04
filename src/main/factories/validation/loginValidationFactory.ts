import { email, password, phoneNumber } from '@/validation/validators';
import { YupValidation } from '@/validation/YupValidation';

export const makeLoginValidation = () => {
  return new YupValidation({
    ...email,
    ...password,
    ...phoneNumber
  });
};
