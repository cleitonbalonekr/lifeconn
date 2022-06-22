import faker from '@faker-js/faker';

import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadCallsBalance } from '@/data/usecases';
import { UnexpectedError } from '@/domain/errors';
import { HttpClientSpy } from '@/tests/domain/mock';

type SutTypes = {
  sut: RemoteLoadCallsBalance;
  httpClientSpy: HttpClientSpy;
};
const mockRemoteLoadCallsBalanceResult = () => faker.datatype.number();

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadCallsBalance(url, httpClientSpy);
  return {
    sut,
    httpClientSpy
  };
};

describe('RemoteLoadCallsBalance', () => {
  it('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteLoadCallsBalanceResult()
    };

    await sut.load();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a balance on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteLoadCallsBalanceResult();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };

    const httpResponse = await sut.load();

    expect(httpResponse).toEqual(httpResult);
  });
});
