import { phoneNumber } from '@/validation/validators';
import { YupValidation } from '@/validation/YupValidation';

export const makeHelpSomeoneElseValidation = () => {
  return new YupValidation({
    ...phoneNumber
  });
};
