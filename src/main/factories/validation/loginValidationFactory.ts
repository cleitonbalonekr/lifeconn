import { email, password, phoneNumber } from '@/validation/validators';
import required from '@/validation/validators/required';
import { YupValidation } from '@/validation/YupValidation';

export const makeLoginValidation = () => {
  return new YupValidation({
    ...email,
    ...password,
    ...required(phoneNumber.phoneNumber, 'phoneNumber', 'telefone')
  });
};
