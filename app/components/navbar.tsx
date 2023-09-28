import {
  Form,
  NavLink,
  useLoaderData,
  type NavLinkProps,
} from '@remix-run/react'
import type { IconType } from 'react-icons'
import {
  HiHome as HomeIcon,
  HiVideoCamera as CameraIcon,
  HiTicket as TicketIcon,
  HiArrowLeftOnRectangle as SignInIcon,
  HiArrowRightOnRectangle as SignOutIcon,
} from 'react-icons/hi2'
import { Avatar } from './avatar'
import type { loader } from '../routes/_grid'

export function Navbar() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <nav className="sticky top-0 text-neutral-400">
      <ul className="px-6 py-10 space-y-3">
        <li>
          <NavBarLink to="/" icon={HomeIcon}>
            Home
          </NavBarLink>
        </li>
        <li>
          <NavBarLink to="/movies" icon={TicketIcon}>
            Movies
          </NavBarLink>
        </li>
        <li>
          <NavBarLink to="/series" icon={CameraIcon}>
            TV series
          </NavBarLink>
        </li>
      </ul>

      <section className="px-6 py-10 border-t border-neutral-800">
        {user ? (
          <div className="space-y-3">
            <p className="flex gap-2 items-center">
              <Avatar url={user.avatarUrl} alt={user.firstName} />
              <strong className="hidden md:inline text-white">
                {user.firstName} {user.lastName}
              </strong>
            </p>
            <Form method="post" action="/sign-out">
              <button
                type="submit"
                className="flex items-center gap-4 px-4 py-3 w-full text-current hover:bg-neutral-800 hover:text-white"
              >
                <SignOutIcon />
                Sign out
              </button>
            </Form>
          </div>
        ) : (
          <NavBarLink to="/sign-in" icon={SignInIcon}>
            Sign in
          </NavBarLink>
        )}
      </section>
    </nav>
  )
}

interface NavBarLinkProps extends NavLinkProps {
  icon: IconType
}

function NavBarLink({ icon: Icon, ...props }: NavBarLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        [
          'flex items-center gap-4 px-4 py-3 font-bold rounded-md',
          'outline-0 focus:ring-4',
          isActive
            ? 'bg-stone-700 text-white'
            : 'hover:bg-neutral-800 hover:text-white',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <>
        <Icon className="text-xl" />
        <span className="hidden md:inline">
          <>{props.children}</>
        </span>
      </>
    </NavLink>
  )
}
