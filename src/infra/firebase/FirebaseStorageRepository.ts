import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { StorageInstance } from '@/configs/firebase';
import { UploadFileRepository } from '@/data/protocols/fileStorage';

export class FirebaseStoreRepository implements UploadFileRepository {
  async storeFile(
    params: UploadFileRepository.Params
  ): Promise<UploadFileRepository.Result> {
    const filename = `images/${params.callId}/${uuidv4()}`;
    const fileRef = ref(StorageInstance, filename);
    const blob = await this.convertUriToBlob(params.fileUri);
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    const fileUrl = await getDownloadURL(result.ref);

    return fileUrl;
  }

  private async convertUriToBlob(uri: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob as any;
  }
}
