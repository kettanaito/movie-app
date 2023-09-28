import { type LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', type: 'image/png', sizes: 'any', href: '/icon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'apple-touch-icon', href: '/icon-apple.png' },
    { rel: 'manifest', href: '/manifest.json' },
    {
      rel: 'stylesheet',
      href: stylesheet,
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
