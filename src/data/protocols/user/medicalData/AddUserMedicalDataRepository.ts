import { AuthUser } from '@/domain/models';

export interface AddUserMedicalDataRepository {
  addMedicalData(
    params: AddUserMedicalDataRepository.Params,
    userId: string
  ): Promise<AddUserMedicalDataRepository.Result>;
}

export namespace AddUserMedicalDataRepository {
  export type Params = {
    title: string;
    description: string;
    onlyOrganization: boolean;
  };
  export type Result = AuthUser | null;
}
