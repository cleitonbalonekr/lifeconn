import { RemoteLoadCallsBalance } from '@/data/usecases';
import { LoadCallsBalance } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http';

export const makeRemoteLoadCallsBalance = (): LoadCallsBalance => {
  const url = 'https://voice-api.zenvia.com/saldo';
  const httpClient = new AxiosHttpClient();
  return new RemoteLoadCallsBalance(url, httpClient);
};
