import { Env } from './types';
import { handleApiRequest } from './router';

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // 1. All API routes starting with /api/ are handled by the Worker
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, ctx);
    }

    // 2. Non-API routes are delegated to static assets / SPA fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    // 3. Standalone fallback response
    return new Response('Dried Seafood Global Edge Worker Active', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
};
