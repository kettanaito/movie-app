import { createCookieSessionStorage } from '@remix-run/node'
import type { User } from './types'

type SessionData = {
  user: User
}

type SessionFlashData = {
  error: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
      secrets: [process.env.SESSION_COOKIE_SECRET!],
    },
  })

export async function requireAuthenticatedUser(
  request: Request,
): Promise<User> {
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')

  if (!user) {
    throw new Response(null, { status: 401 })
  }

  return user
}

export { getSession, commitSession, destroySession }
