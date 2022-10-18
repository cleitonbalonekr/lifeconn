import { AuthUser } from '@/domain/models';

export interface AddMedicalData {
  add: (
    params: AddMedicalData.Params,
    userId: string
  ) => Promise<AddMedicalData.Model>;
}

export namespace AddMedicalData {
  export type Params = {
    title: string;
    description: string;
    onlyOrganization: boolean;
  };

  export type Model = AuthUser;
}
