import { AuthUser } from '@/domain/models';

export interface DeleteUserMedicalDataRepository {
  removeMedicalData(
    params: DeleteUserMedicalDataRepository.Params,
    userId: string
  ): Promise<DeleteUserMedicalDataRepository.Result>;
}

export namespace DeleteUserMedicalDataRepository {
  export type Params = string;
  export type Result = AuthUser | null;
}
