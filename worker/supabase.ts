import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Env } from './types';

async function getSecretValue(
  value: string | { get(): Promise<string> } | undefined
): Promise<string | undefined> {
  if (!value) return undefined;

  if (
    typeof value === 'object' &&
    value !== null &&
    'get' in value &&
    typeof (value as any).get === 'function'
  ) {
    return await (value as any).get();
  }

  return typeof value === 'string' ? value : undefined;
}

export async function getSupabaseClient(
  env: Env
): Promise<SupabaseClient> {
  const url = await getSecretValue(env.SUPABASE_URL);
  const serviceRoleKey = await getSecretValue(
    env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!url) {
    throw new Error('SUPABASE_URL is not configured');
  }

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}