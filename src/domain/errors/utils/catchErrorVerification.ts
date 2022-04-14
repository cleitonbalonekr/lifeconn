import { UnexpectedError } from '../UnexpectedError';

export const catchErrorVerification = (error: any): never => {
  if (error.isApplicationError) {
    throw error;
  }
  throw new UnexpectedError();
};
