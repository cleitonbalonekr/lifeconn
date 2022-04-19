import { RemoteDeleteMedicalData } from '@/data/usecases';
import { MedicalDataNotFound } from '@/domain/errors';
import { fakeId } from '@/tests/shared/mocks';

import {
  DeleteUserMedicalDataRepositorySpy,
  makeMedicalData
} from '../mock/user-mock';

const makeSut = () => {
  const deleteUserMedicalDataRepository =
    new DeleteUserMedicalDataRepositorySpy();
  const remoteAddMedicalData = new RemoteDeleteMedicalData(
    deleteUserMedicalDataRepository
  );
  return {
    remoteAddMedicalData,
    deleteUserMedicalDataRepository
  };
};

describe('RemoteUpdateMedicalData', () => {
  it('it Should throw MedicalDataNotFound when does not found medicalData', async () => {
    const { deleteUserMedicalDataRepository, remoteAddMedicalData } = makeSut();
    deleteUserMedicalDataRepository.response = null;
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const promise = remoteAddMedicalData.remove(medicalData, fakeId);
    await expect(promise).rejects.toThrow(new MedicalDataNotFound());
  });
  it('it return AuthUser when delete medical data with success', async () => {
    const { remoteAddMedicalData } = makeSut();
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const response = await remoteAddMedicalData.remove(medicalData, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('medicalData');
  });
});
