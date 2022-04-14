import * as Yup from 'yup';

export default {
  description: Yup.string().required('Descrição é obrigatório')
};
