import * as Yup from 'yup';

export default {
  fullName: Yup.string().min(3, 'Mínimo de 3 caracteres')
};
