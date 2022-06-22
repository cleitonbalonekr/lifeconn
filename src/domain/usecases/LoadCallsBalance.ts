import { CALLS_BALANCE_TOKEN } from '@/configs';
import { UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http';

export type LoadCallsBalanceModel = {
  dados: {
    saldo: number;
  };
  mensagem: string;
};

export class LoadCallsBalance {
  private token: string;

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadCallsBalanceModel>
  ) {
    this.token = CALLS_BALANCE_TOKEN;
  }

  async load(): Promise<LoadCallsBalanceModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      headers: {
        'Access-Token': this.token
      }
    });
    const remoteSurveyResult = httpResponse.body as LoadCallsBalanceModel;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveyResult;
      default:
        throw new UnexpectedError();
    }
  }
}
