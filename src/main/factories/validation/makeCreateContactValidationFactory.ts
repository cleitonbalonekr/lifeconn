import { phoneNumber, fullName } from '@/validation/validators';
import required from '@/validation/validators/required';
import { YupValidation } from '@/validation/YupValidation';

export const makeCreateContactValidationFactory = () => {
  return new YupValidation({
    ...required(fullName.fullName, 'fullName', 'Nome'),
    ...required(phoneNumber.phoneNumber, 'phoneNumber', 'telefone')
  });
};
