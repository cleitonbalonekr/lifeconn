import * as Yup from 'yup';

// const base = Yup.string();
export default (base: Yup.StringSchema, field: string, inputName: string) => {
  return { [field]: base.required(`${inputName} é obrigatório`) };
};
