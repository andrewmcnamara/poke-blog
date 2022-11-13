// trpcClient.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../pages/api/trpc/[trpc]";
//         process.env.NODE_ENV === "production"
//  ? import.meta.env.TRPC_ENDPOINT_URL

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:3000/api/trpc`,
    }),
  ],
});

// const client = createTRPCClient<AppRouter>({
//   url: 'http://localhost:5000/trpc',
// });
