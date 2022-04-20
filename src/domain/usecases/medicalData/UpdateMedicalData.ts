import { AuthUser } from '@/domain/models';

export interface UpdateMedicalData {
  update: (
    params: UpdateMedicalData.Params,
    userId: string
  ) => Promise<UpdateMedicalData.Model>;
}

export namespace UpdateMedicalData {
  export type Params = {
    id: string;
    title: string;
    description: string;
    onlyOrganization: boolean;
  };

  export type Model = AuthUser;
}
