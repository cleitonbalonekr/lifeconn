import { title, description } from '@/validation/validators';
import required from '@/validation/validators/required';
import { YupValidation } from '@/validation/YupValidation';

export const makeMedicalInfoValidation = () => {
  return new YupValidation({
    ...title,
    ...description
  });
};
