import { AuthUser } from '@/domain/models';

export interface DeleteMedicalData {
  remove: (
    medicalDataId: DeleteMedicalData.Params,
    userId: string
  ) => Promise<DeleteMedicalData.Model>;
}

export namespace DeleteMedicalData {
  export type Params = string;

  export type Model = AuthUser;
}
