import * as Yup from 'yup';

export default {
  email: Yup.string()
    .email('O e-mail precisa ser um válido')
    .required('O email é obrigatório')
};
