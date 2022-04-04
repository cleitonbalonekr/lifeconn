/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
export interface Validation {
  validateForm: (formData: object) => Promise<Validation.Return>;
}

export namespace Validation {
  export type Return = {
    valid: boolean;
    errors?: ValidationErrors;
  };
  export type ValidationErrors = {
    [key: string]: string;
  };
}
