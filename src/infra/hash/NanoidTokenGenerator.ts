import { nanoid } from 'nanoid';

import { TokenGenerator } from '@/data/protocols/hash/TokenGenerator';

export class NanoidTokenGenerator implements TokenGenerator {
  generate(): string {
    let token = '';

    while (token.length < 6) {
      token = nanoid(6)
        .replaceAll('-', '')
        .replaceAll('_', '')
        .toLocaleLowerCase();
    }
    return token;
  }
}
