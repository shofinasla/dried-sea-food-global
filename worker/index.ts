import { Env } from './types';
import { handleApiRequest } from './router';

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // 1. All API routes starting with /api/ are handled by the Worker
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, ctx);
    }

    // 2. Media routes starting with /media/ are served from R2 bucket if available
    if (url.pathname.startsWith('/media/') && env.MEDIA_BUCKET) {
      const key = url.pathname.replace('/media/', '');
      try {
        const object = await env.MEDIA_BUCKET.get(key);
        if (object) {
          const headers = new Headers();
          headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          headers.set('ETag', object.httpEtag);
          return new Response(object.body, { headers });
        }
      } catch (err) {
        console.error('R2 media fetch error:', err);
      }
    }

    // 3. Non-API routes are delegated to static assets / SPA fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    // 4. Standalone fallback response
    return new Response('Dried Seafood Global Edge Worker Active', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
};
