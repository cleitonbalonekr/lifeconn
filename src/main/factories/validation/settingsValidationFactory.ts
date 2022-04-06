import { email, phoneNumber, fullName } from '@/validation/validators';
import required from '@/validation/validators/required';
import { YupValidation } from '@/validation/YupValidation';

export const makeSettingsValidation = () => {
  return new YupValidation({
    ...email,
    ...required(phoneNumber.phoneNumber, 'phoneNumber', 'telefone'),
    ...required(fullName.fullName, 'fullName', 'Nome')
  });
};
