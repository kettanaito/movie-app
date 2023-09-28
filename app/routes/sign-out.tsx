import { redirect, type ActionArgs } from '@remix-run/node'
import { destroySession, getSession } from '~/session'

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/sign-in', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
