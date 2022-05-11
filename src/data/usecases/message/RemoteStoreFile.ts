import { SaveCallFileUrlRepository } from '@/data/protocols/call';
import { UploadFileRepository } from '@/data/protocols/fileStorage';
import { VerifyFileLimitRepository } from '@/data/protocols/message';
import { MaxFilesExceedError, UnexpectedError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { StoreFile } from '@/domain/usecases';

export class RemoteStoreFile implements StoreFile {
  constructor(
    private readonly verifyFileLimitRepository: VerifyFileLimitRepository,
    private readonly uploadFileRepository: UploadFileRepository,
    private readonly saveCallFileUrlRepository: SaveCallFileUrlRepository
  ) {}

  async store(params: StoreFile.Params) {
    try {
      const isExceedMaxFiles = await this.verifyFileLimitRepository.isFilesFull(
        params.callId
      );
      if (isExceedMaxFiles === null) {
        throw new UnexpectedError();
      }
      if (isExceedMaxFiles) {
        throw new MaxFilesExceedError();
      }
      const fileUrl = await this.uploadFileRepository.storeFile(params);
      await this.saveCallFileUrlRepository.addFileUrl({
        callId: params.callId,
        fileUrl
      });
      return fileUrl;
    } catch (error) {
      return catchErrorVerification(error);
    }
  }
}
