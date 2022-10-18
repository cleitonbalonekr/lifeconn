/**
 * @jest-environment jsdom
 */
import { FirebaseStoreRepository } from '@/infra/firebase';
import { randomId } from '@/tests/shared/mocks';
import {
  cleanEmulators,
  closeFirebase,
  setupEmulators
} from '@/tests/utils/firebase-emulator';

const makeSut = () => {
  const firebaseStoreRepository = new FirebaseStoreRepository();
  return firebaseStoreRepository;
};

describe.skip('FirebaseStoreRepository', () => {
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    // await cleanEmulators();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  it('should be able to store file and return fileUrl', async () => {
    const sut = makeSut();
    const callId = randomId();
    const dataBase64 = 'dGVzdGU=';

    const arrayBuffer = Uint8Array.from(window.atob(dataBase64), (c) =>
      c.charCodeAt(0)
    );

    const file = new File([arrayBuffer], 'dummy.txt', {
      type: 'text/plain'
    });

    jest
      .spyOn(sut, 'convertUriToBlob')
      .mockImplementationOnce(async () => file);

    const fileUri = 'asd';
    const fileUrl = await sut.storeFile({ fileUri, callId });
  });
});
