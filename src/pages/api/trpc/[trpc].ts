// import { appRouter } from 'server'
import type { APIContext } from 'astro'
import { resolveHTTPResponse, createHTTPHandler } from '@trpc/server/adapters/standalone'
import type { HTTPHeaders } from '@trpc/client'

import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

const appRouter = t.router({});


/**
 * Handles trpc query client requests.
 *
 * @param {APIContext} - Astro API Context
 * @returns {Promise<Response>} - trpc response
 *
 * @beta
 */
async function httpHandler({ request, params }: APIContext): Promise<Response> {
  const query = new URL(request.url).searchParams

  const requestBody = request.method === 'GET' ? {} : await request.json()

  const { status, headers, ...response } = await resolveHTTPResponse({
    async createContext() {
      // CreateContext
    },
    router: appRouter,
    path: params.trpc as string,
    req: {
      query,
      method: request.method,
      headers: request.headers as unknown as HTTPHeaders,
      body: requestBody,
    },
  })

  return new Response(response.body, {
    headers: headers as HeadersInit,
    status,
  })
}

export const post = httpHandler

export const get = httpHandler
