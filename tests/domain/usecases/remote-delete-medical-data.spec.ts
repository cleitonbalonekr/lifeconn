import { MedicalDataNotFound } from '@/domain/errors';
import { DeleteMedicalData } from '@/domain/usecases';
import { fakeId } from '@/tests/shared/mocks';

import {
  DeleteUserMedicalDataRepositorySpy,
  makeMedicalData
} from '../mock/user-mock';

const makeSut = () => {
  const deleteUserMedicalDataRepository =
    new DeleteUserMedicalDataRepositorySpy();
  const remoteAddMedicalData = new DeleteMedicalData(
    deleteUserMedicalDataRepository
  );
  return {
    remoteAddMedicalData,
    deleteUserMedicalDataRepository
  };
};

describe('RemoteDeleteMedicalData', () => {
  it('it Should throw MedicalDataNotFound when does not found medicalData', async () => {
    const { deleteUserMedicalDataRepository, remoteAddMedicalData } = makeSut();
    deleteUserMedicalDataRepository.response = null;
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const promise = remoteAddMedicalData.remove(medicalData.id, fakeId);
    await expect(promise).rejects.toThrow(new MedicalDataNotFound());
  });
  it('it return AuthUser when delete medical data with success', async () => {
    const { remoteAddMedicalData } = makeSut();
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const response = await remoteAddMedicalData.remove(medicalData.id, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('medicalData');
  });
});
