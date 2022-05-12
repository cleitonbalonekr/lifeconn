import axios from 'axios';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { StorageInstance } from '@/configs/firebase';
import {
  UploadFileRepository,
  RemoveCallFilesRepository
} from '@/data/protocols/fileStorage';

export class FirebaseStoreRepository
  implements UploadFileRepository, RemoveCallFilesRepository
{
  async removeFile(params: string): Promise<void> {
    const folderRef = ref(StorageInstance, params);
    const results = await listAll(folderRef);
    await Promise.all(
      results.items.map(async (item) => {
        await deleteObject(item);
      })
    );
  }

  async storeFile(
    params: UploadFileRepository.Params
  ): Promise<UploadFileRepository.Result> {
    const filename = `images/${params.callId}/${uuidv4()}`;
    const fileRef = ref(StorageInstance, filename);
    const blob = await this.convertUriToBlob(params.fileUri);
    const result = await uploadBytes(fileRef, blob);
    const fileUrl = await getDownloadURL(result.ref);

    return fileUrl;
  }

  public async convertUriToBlob(uri: string) {
    const response = await axios.get<Blob>(uri, {
      responseType: 'blob'
    });
    const blob = response.data;
    const file = new File([blob], uuidv4(), {
      type: blob.type
    });

    return file;
  }
}
