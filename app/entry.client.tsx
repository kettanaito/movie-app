import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'

async function enableApiMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  await worker.start()
}

enableApiMocking().then(() => {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />)
  })
})
