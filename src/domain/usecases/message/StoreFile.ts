import { MaxFilesExceedError, UnexpectedError } from '@/domain/errors';
import { catchErrorVerification } from '@/domain/errors/utils/catchErrorVerification';
import { SaveCallFileUrlRepository } from '@/domain/protocols/db/call';
import { VerifyFileLimitRepository } from '@/domain/protocols/db/message';
import { UploadFileRepository } from '@/domain/protocols/fileStorage';

export type StoreFileParams = {
  fileUri: string;
  callId: string;
};
export type StoreFileResult = string;

export class StoreFile {
  constructor(
    private readonly verifyFileLimitRepository: VerifyFileLimitRepository,
    private readonly uploadFileRepository: UploadFileRepository,
    private readonly saveCallFileUrlRepository: SaveCallFileUrlRepository
  ) {}

  async store(params: StoreFileParams) {
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
