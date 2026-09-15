export interface SecretsStoreSecret {
  get(): Promise<string>;
}

export interface Env {
  ASSETS?: {
    fetch(request: Request | string): Promise<Response>;
  };
  ADMIN_USERNAME?: string | SecretsStoreSecret;
  ADMIN_INITIAL_PASSWORD?: string | SecretsStoreSecret;
  SESSION_SECRET?: string | SecretsStoreSecret;
  GEMINI_API_KEY?: string | SecretsStoreSecret;
  [key: string]: any;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
}

export interface SessionPayload {
  user: AdminUser;
  iat: number;
  exp: number;
}
