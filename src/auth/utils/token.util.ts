import { createHash, timingSafeEqual } from 'crypto';

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function verifyTokenHash(token: string, storedHash: string): boolean {
  const tokenHash = hashToken(token);
  const a = Buffer.from(tokenHash, 'utf8');
  const b = Buffer.from(storedHash, 'utf8');

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}
