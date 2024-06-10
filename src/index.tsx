import { Hono } from 'hono'
import { renderer } from './renderer'
import { Suspense, use } from 'react'

const app = new Hono()
app.use(renderer)

app.get('/', async (c) => {
  return c.render(<div id="root"></div>)
})

export function Message() {
  use(new Promise((resolve) => setTimeout(resolve, 1000)))
  return <p>Here is the message</p>
}

app.get('/suspense', async (c) => {
  return c.render(
    <Suspense fallback={<p>Waiting for message...</p>}>
      <Message />
    </Suspense>
  )
})

export default app
