import { MedicalDataNotFound } from '@/domain/errors';
import { UpdateMedicalData } from '@/domain/usecases';
import { fakeId } from '@/tests/shared/mocks';

import {
  UpdateUserMedicalDataRepositorySpy,
  makeMedicalData
} from '../mock/user-mock';

const makeSut = () => {
  const updateUserMedicalDataRepository =
    new UpdateUserMedicalDataRepositorySpy();
  const remoteUpdateMedicalData = new UpdateMedicalData(
    updateUserMedicalDataRepository
  );
  return {
    remoteUpdateMedicalData,
    updateUserMedicalDataRepository
  };
};

describe('RemoteUpdateMedicalData', () => {
  it('it Should throw MedicalDataNotFound when does not found user to update medicalData', async () => {
    const { updateUserMedicalDataRepository, remoteUpdateMedicalData } =
      makeSut();
    updateUserMedicalDataRepository.response = null;
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const promise = remoteUpdateMedicalData.update(medicalData, fakeId);
    await expect(promise).rejects.toThrow(new MedicalDataNotFound());
  });
  it('it return AuthUser when update medical data with success', async () => {
    const { remoteUpdateMedicalData } = makeSut();
    const medicalData = {
      ...makeMedicalData(),
      id: fakeId
    };
    const response = await remoteUpdateMedicalData.update(medicalData, fakeId);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('medicalData');
  });
});
