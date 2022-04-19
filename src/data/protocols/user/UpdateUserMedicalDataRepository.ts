import { AuthUser } from '@/domain/models';

export interface UpdateUserMedicalDataRepository {
  updateMedicalData(
    params: UpdateUserMedicalDataRepository.Params,
    userId: string
  ): Promise<UpdateUserMedicalDataRepository.Result>;
}

export namespace UpdateUserMedicalDataRepository {
  export type Params = {
    id: string;
    title: string;
    description: string;
    onlyOrganization: boolean;
  };
  export type Result = AuthUser | null;
}
