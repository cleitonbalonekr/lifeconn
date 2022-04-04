import * as Yup from 'yup';

export default {
  phoneNumber: Yup.string().required('O telefone é obrigatório')
};
