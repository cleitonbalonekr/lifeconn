import { CALLS_BALANCE_TOKEN } from '@/configs';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { LoadCallsBalance } from '@/domain/usecases';

export class RemoteLoadCallsBalance implements LoadCallsBalance {
  private token: string;

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadCallsBalance.Model>
  ) {
    this.token = CALLS_BALANCE_TOKEN;
  }

  async load(): Promise<LoadCallsBalance.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      headers: {
        'Access-Token': this.token
      }
    });
    const remoteSurveyResult = httpResponse.body as LoadCallsBalance.Model;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveyResult;
      default:
        throw new UnexpectedError();
    }
  }
}
