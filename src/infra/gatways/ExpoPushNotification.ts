import { HttpClient, HttpStatusCode } from '@/domain/protocols/http';
import { SendPushNotification } from '@/domain/protocols/notification';

export class ExpoPushNotification implements SendPushNotification {
  constructor(private readonly httpClient: HttpClient<void>) {}

  async notify(tokens: string[], victimName: string): Promise<boolean> {
    const message = {
      to: tokens,
      sound: 'default',
      title: `Ocorreu um acidente com ${victimName}`,
      body: 'Consulte os detalhes em eventos',
      data: { someData: 'goes here' }
    };

    const httpResponse = await this.httpClient.request({
      url: 'https://exp.host/--/api/v2/push/send',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: message
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return true;
      default:
        return false;
    }
  }
}
