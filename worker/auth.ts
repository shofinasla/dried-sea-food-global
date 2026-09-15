import { Env, SecretsStoreSecret, AdminUser, SessionPayload } from './types';

export async function getSecretValue(
  secret: string | SecretsStoreSecret | undefined,
  fallback: string = ''
): Promise<string> {
  if (!secret) return fallback;
  if (typeof secret === 'string') return secret;
  if (typeof secret === 'object' && typeof (secret as any).get === 'function') {
    try {
      const val = await (secret as any).get();
      return val || fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const key = pair.substring(0, idx).trim();
    const val = pair.substring(idx + 1).trim();
    cookies[key] = decodeURIComponent(val);
  }
  return cookies;
}

export function createSessionCookie(token: string, isSecure: boolean = true): string {
  const secureFlag = isSecure ? '; Secure' : '';
  return `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${secureFlag}`;
}

export function createClearSessionCookie(): string {
  return `admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function base64UrlEncode(strOrObj: string | object): string {
  const encoder = new TextEncoder();
  const json = typeof strOrObj === 'string' ? strOrObj : JSON.stringify(strOrObj);
  const bytes = encoder.encode(json);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export async function signSessionJwt(user: AdminUser, sessionSecret: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    user,
    iat: now,
    exp: now + 86400 // 24 hours
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const data = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(sessionSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const sigBytes = new Uint8Array(signature);
  let sigBinary = '';
  for (let i = 0; i < sigBytes.byteLength; i++) {
    sigBinary += String.fromCharCode(sigBytes[i]);
  }
  const encodedSig = btoa(sigBinary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${data}.${encodedSig}`;
}

export async function verifySessionJwt(token: string, sessionSecret: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSig] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(sessionSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const binarySig = base64UrlDecode(encodedSig);
    const sigBytes = new Uint8Array(binarySig.length);
    for (let i = 0; i < binarySig.length; i++) {
      sigBytes[i] = binarySig.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(data));
    if (!isValid) return null;

    const payloadJson = base64UrlDecode(encodedPayload);
    const payload: SessionPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function authenticateRequest(
  request: Request,
  env: Env
): Promise<AdminUser | null> {
  const sessionSecret = await getSecretValue(env.SESSION_SECRET, 'dsg-super-secret-hmac-key-2026');

  // 1. Check Authorization header
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const verified = await verifySessionJwt(token, sessionSecret);
    if (verified?.user) return verified.user;
  }

  // 2. Check Cookie header
  const cookies = parseCookies(request.headers.get('cookie'));
  const sessionCookie = cookies['admin_session'];
  if (sessionCookie) {
    const verified = await verifySessionJwt(sessionCookie, sessionSecret);
    if (verified?.user) return verified.user;
  }

  return null;
}
