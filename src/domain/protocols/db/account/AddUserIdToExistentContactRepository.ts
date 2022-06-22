// AddUserIdToExistentContactRepository
export interface AddUserIdToExistentContactRepository {
  addUserIdToContact: (
    params: AddUserIdToExistentContactRepository.Params
  ) => Promise<AddUserIdToExistentContactRepository.Result>;
}

export namespace AddUserIdToExistentContactRepository {
  export type Params = {
    phoneNumber: string;
    userId: string;
  };

  export type Result = void;
}
