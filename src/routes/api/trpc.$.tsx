import { createFileRoute } from '@tanstack/react-router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { trpcRouter } from '@/integrations/trpc/router'

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: ({ request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: trpcRouter,
          createContext: () => ({}),
        })
      },
      POST: ({ request }) => {
        return fetchRequestHandler({
          endpoint: '/api/trpc',
          req: request,
          router: trpcRouter,
          createContext: () => ({}),
        })
      },
    },
  },
})