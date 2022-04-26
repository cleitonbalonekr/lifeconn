import { HttpStatusCode } from '@/data/protocols/http';
import { ExpoPushNotification } from '@/infra/gatways/ExpoPushNotification';
import { HttpClientSpy } from '@/tests/data/mock';

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy();
  const expoPushNotification = new ExpoPushNotification(httpClientSpy);
  return {
    expoPushNotification,
    httpClientSpy
  };
};

describe('SendPushNotification', () => {
  const tokens = ['token1', 'token2'];
  const victimName = 'fake_name';
  it('should return false when some error happen', async () => {
    const { expoPushNotification, httpClientSpy } = makeSut();
    httpClientSpy.response.statusCode = HttpStatusCode.serverError;
    const response = await expoPushNotification.notify(tokens, victimName);
    expect(response).toBe(false);
  });
  it('should return true ', async () => {
    const { expoPushNotification, httpClientSpy } = makeSut();
    const response = await expoPushNotification.notify(tokens, victimName);
    expect(response).toBe(true);
  });
});
