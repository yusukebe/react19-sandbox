import { createMiddleware } from 'hono/factory'
import type { JSX } from 'react'
// @ts-expect-error react-dom/server.edge is not typed
import { renderToReadableStream } from 'react-dom/server.edge'

declare module 'hono' {
  interface ContextRenderer {
    (content: JSX.Element): Response | Promise<Response>
  }
}

export const renderer = createMiddleware(async (c, next) => {
  c.setRenderer(async (content) => {
    return c.body(
      await renderToReadableStream(
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            {import.meta.env.PROD ? (
              <script type="module" src="/static/client.js"></script>
            ) : (
              <script type="module" src="/src/client.tsx"></script>
            )}
          </head>
          <body>{content}</body>
        </html>
      ),
      {
        headers: {
          'Transfer-Encoding': 'chunked',
          'Content-Type': 'text/html; charset=UTF-8'
        }
      }
    )
  })
  await next()
})
