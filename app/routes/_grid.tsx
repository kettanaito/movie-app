import type { LoaderArgs } from '@remix-run/node'
import { Outlet, type MetaFunction } from '@remix-run/react'
import { Header } from '~/components/header'
import { OuterGrid } from '~/components/outerGrid'
import { Navbar } from '~/components/navbar'
import { Footer } from '~/components/footer'
import { getSession } from '~/session'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Movies App',
    },
  ]
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')

  return {
    user,
  }
}

export default function GridLayout() {
  return (
    <>
      <Header />
      <OuterGrid className="flex-grow">
        <div className="border-r border-neutral-800">
          <Navbar />
        </div>
        <div className="col-span-1 min-w-0 md:pr-10">
          <div className="my-10">
            <Outlet />
          </div>
          <div className="my-10">
            <Footer />
          </div>
        </div>
      </OuterGrid>
    </>
  )
}
