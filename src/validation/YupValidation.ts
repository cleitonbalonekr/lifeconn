/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

import { Validation } from '@/presentation/protocols';

type Validations = {
  [key: string]: Yup.AnySchema;
};

export class YupValidation implements Validation {
  private validFormResponse = {
    valid: true
  };

  constructor(private readonly validations: Validations) {}

  async validateForm(formData: any) {
    try {
      const shape: Validations = {};
      Object.keys(formData).forEach((formKey: string) => {
        const foundValidations = this.validations[formKey];
        shape[formKey] = foundValidations;
      });

      const schema = Yup.object().shape(shape);
      await schema.validate(formData, {
        abortEarly: false
      });
      return this.validFormResponse;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Validation.ValidationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[String(error.path)] = error.message;
        });
        return {
          valid: false,
          errors: validationErrors
        };
      }
    }
    return this.validFormResponse;
  }
}
