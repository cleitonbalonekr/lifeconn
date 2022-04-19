import { RemoteUpdateMedicalData } from '@/data/usecases';
import { MedicalDataNotFound } from '@/domain/errors';
import { fakeId } from '@/tests/shared/mocks';

import {
  UpdateUserMedicalDataRepositorySpy,
  makeMedicalData
} from '../mock/user-mock';

const makeSut = () => {
  const updateUserMedicalDataRepository =
    new UpdateUserMedicalDataRepositorySpy();
  const remoteAddMedicalData = new RemoteUpdateMedicalData(
    updateUserMedicalDataRepository
  );
  return {
    remoteAddMedicalData,
    updateUserMedicalDataRepository
  };
};

describe('RemoteUpdateMedicalData', () => {
  it('it Should throw MedicalDataNotFound when does not found user to update medicalData', async () => {
    const { updateUserMedicalDataRepository, remoteAddMedicalData } = makeSut();
    updateUserMedicalDataRepository.response = null;
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const promise = remoteAddMedicalData.update(medicalData, fakeId);
    await expect(promise).rejects.toThrow(new MedicalDataNotFound());
  });
  it('it return AuthUser when update medical data with success', async () => {
    const { remoteAddMedicalData } = makeSut();
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const response = await remoteAddMedicalData.update(medicalData, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('medicalData');
  });
});
