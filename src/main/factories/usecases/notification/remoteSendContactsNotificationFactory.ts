import { SendContactsNotification } from '@/domain/usecases';
import { FirebaseUserRepository } from '@/infra/firebase';
import { ExpoPushNotification } from '@/infra/gatways/ExpoPushNotification';
import { AxiosHttpClient } from '@/infra/http';

export const makeRemoteSendContactsNotification =
  (): SendContactsNotification => {
    const firebaseUserRepository = new FirebaseUserRepository();
    const httpClient = new AxiosHttpClient();
    const expoPushNotification = new ExpoPushNotification(httpClient);
    return new SendContactsNotification(
      firebaseUserRepository,
      expoPushNotification
    );
  };
