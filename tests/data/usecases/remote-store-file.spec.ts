import faker from '@faker-js/faker';

import { RemoteStoreFile } from '@/data/usecases/message/';
import { MaxFilesExceedError, UnexpectedError } from '@/domain/errors';
import { randomId, throwError } from '@/tests/shared/mocks';

import {
  SaveCallFileUrlRepositorySpy,
  UploadFileRepositorySpy,
  VerifyFileLimitRepositorySpy
} from '../mock/message-mock';

const makeSut = () => {
  const verifyFileLimitRepositorySpy = new VerifyFileLimitRepositorySpy();
  const uploadFileRepositorySpy = new UploadFileRepositorySpy();
  const saveCallFileUrlRepositorySpy = new SaveCallFileUrlRepositorySpy();
  const sut = new RemoteStoreFile(
    verifyFileLimitRepositorySpy,
    uploadFileRepositorySpy,
    saveCallFileUrlRepositorySpy
  );
  return {
    sut,
    verifyFileLimitRepositorySpy,
    uploadFileRepositorySpy,
    saveCallFileUrlRepositorySpy
  };
};

describe('RemoteStoreFile', () => {
  const params = {
    callId: randomId(),
    fileUri: 'file'
  };
  it('should throw MaxFilesExceedError when verifyFileLimitRepository return true', async () => {
    const { sut, verifyFileLimitRepositorySpy } = makeSut();
    verifyFileLimitRepositorySpy.response = true;
    const promise = sut.store(params);
    expect(verifyFileLimitRepositorySpy.callCount).toBe(1);
    await expect(promise).rejects.toThrow(new MaxFilesExceedError());
  });
  it('should throw UnexpectedError verifyFileLimitRepositorySpy return null ', async () => {
    const { sut, verifyFileLimitRepositorySpy } = makeSut();
    verifyFileLimitRepositorySpy.response = null;

    const promise = sut.store(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UnexpectedError when some unexpected erro happens ', async () => {
    const { sut, verifyFileLimitRepositorySpy } = makeSut();
    jest
      .spyOn(verifyFileLimitRepositorySpy, 'isFilesFull')
      .mockImplementationOnce(throwError);

    const promise = sut.store(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it('should uploadFileRepository and call saveCallFileUrlRepository with te correct fileUrl', async () => {
    const { sut, uploadFileRepositorySpy, saveCallFileUrlRepositorySpy } =
      makeSut();

    const fileUrl = await sut.store(params);
    expect(uploadFileRepositorySpy.callCount).toBe(1);
    expect(saveCallFileUrlRepositorySpy.callCount).toBe(1);
    expect(saveCallFileUrlRepositorySpy.params.fileUrl).toEqual(fileUrl);
  });
});
