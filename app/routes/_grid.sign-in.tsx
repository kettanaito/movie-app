import { type MetaFunction, Form, useLocation } from '@remix-run/react'
import { redirect, type ActionArgs } from '@remix-run/node'
import { commitSession, getSession } from '~/session'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Sign in - Movie App',
    },
  ]
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  // If authenticated, redirect to the homepage.
  if (session.has('user')) {
    return redirect('/')
  }

  const data = await request.formData()
  const redirectUrl = (data.get('redirectUrl') as string) || '/'

  // Validate the user credentials.
  const user = await fetch('https://auth.provider.com/validate', {
    method: 'POST',
    body: data,
  }).then(
    (response) => response.json(),
    () => null,
  )

  if (user != null) {
    session.set('user', user)
  }

  if (!session.has('user')) {
    session.flash('error', 'Failed to sign in: invalid credentials.')
  }

  // Forward any sign-in errors to the client.
  if (!session.has('user')) {
    return redirect('/sign-in', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  // Sign in the user and redirect to the homepage.
  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export default function SignInPage() {
  const { state } = useLocation()

  return (
    <div>
      <Form method="post" className="space-y-5 md:max-w-sm mx-auto my-20">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Sign in</h1>
        <input type="hidden" name="redirectUrl" value={state?.redirectUrl} />

        <p>
          <input
            name="email"
            type="email"
            placeholder="E-mail address"
            autoComplete="email"
            className="w-full"
            tabIndex={1}
            required
          />
        </p>
        <p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full"
            tabIndex={1}
            required
          />
        </p>
        <button type="submit" className="bg-neutral-700 w-full" tabIndex={1}>
          Sign in
        </button>
      </Form>
    </div>
  )
}
