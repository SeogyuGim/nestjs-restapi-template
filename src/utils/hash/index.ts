import crypto from 'crypto';

export function encryptByHash(password: string) {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('base64');
}