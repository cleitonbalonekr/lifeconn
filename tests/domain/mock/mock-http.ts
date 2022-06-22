import faker from '@faker-js/faker';

import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient
} from '@/domain/protocols/http';

const object = { keyA: 'valueA', keyB: 42 };
export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(object),
  headers: faker.random.objectElement(object)
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;

  method?: string;

  body?: any;

  headers?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
