import { UserNotFoundError } from '@/domain/errors';
import { AddMedicalData } from '@/domain/usecases';
import { fakeId } from '@/tests/shared/mocks';

import {
  AddUserMedicalDataRepositorySpy,
  makeMedicalData
} from '../mock/user-mock';

const makeSut = () => {
  const addUserMedicalDataRepository = new AddUserMedicalDataRepositorySpy();
  const remoteAddMedicalData = new AddMedicalData(addUserMedicalDataRepository);
  return {
    remoteAddMedicalData,
    addUserMedicalDataRepository
  };
};

describe('RemoteAddMedicalData', () => {
  it('it Should throw UserNotFoundError when does not found user to add medicalData', async () => {
    const { addUserMedicalDataRepository, remoteAddMedicalData } = makeSut();
    addUserMedicalDataRepository.response = null;
    const medicalData = makeMedicalData();
    const promise = remoteAddMedicalData.add(medicalData, fakeId);
    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });
  it('it return AuthUser when add medical data with success', async () => {
    const { remoteAddMedicalData } = makeSut();
    const medicalData = makeMedicalData();
    const response = await remoteAddMedicalData.add(medicalData, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('medicalData');
  });
});
