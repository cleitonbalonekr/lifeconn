import * as Yup from 'yup';

export default {
  password: Yup.string()
    .min(4, 'A senha deve conter pelo menos 4 caracteres')
    .required('Senha é obrigatório')
};
