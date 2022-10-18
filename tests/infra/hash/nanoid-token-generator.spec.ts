import { NanoidTokenGenerator } from '@/infra/hash';

const makeSut = () => {
  const nanoidTokenGenerator = new NanoidTokenGenerator();
  return nanoidTokenGenerator;
};

describe('NanoidTokenGenerator', () => {
  it('should generate a token with 6 caracteres', () => {
    const sut = makeSut();
    const token = sut.generate();
    expect(token).toHaveLength(6);
  });
});
