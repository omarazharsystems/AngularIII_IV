import { EncryptDecryptPipe } from './encrypt-decrypt.pipe';

describe('EncryptDecryptPipe', () => {
  it('create an instance', () => {
    const pipe = new EncryptDecryptPipe();
    expect(pipe).toBeTruthy();
  });
});
