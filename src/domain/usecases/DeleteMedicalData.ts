import { AuthUser } from '@/domain/models';

export interface DeleteMedicalData {
  remove: (
    params: DeleteMedicalData.Params,
    userId: string
  ) => Promise<DeleteMedicalData.Model>;
}

export namespace DeleteMedicalData {
  export type Params = {
    id: string;
    title: string;
    description: string;
    onlyOrganization: boolean;
  };

  export type Model = AuthUser;
}
