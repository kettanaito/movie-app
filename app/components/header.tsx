import { Link } from '@remix-run/react'
import { HiMagnifyingGlass as SearchIcon } from 'react-icons/hi2'
import { OuterGrid } from './outerGrid'
import { Container } from './container'

export function Header() {
  return (
    <OuterGrid className="items-center text-neutral-400 bg-black bg-opacity-20 border-b border-neutral-800">
      <div className="flex justify-center p-6">
        <Link
          to="/"
          className="text-2xl outline-0 hover:opacity-60 focus:ring-4"
        >
          🍿
        </Link>
      </div>
      <div>
        <div className="relative flex items-center gap-1 border border-neutral-700 md:w-96 max-w-full rounded-md">
          <SearchIcon className="absolute top-2.5 left-2.5 text-neutral-500" />
          <input
            name="search"
            className="px-5 pl-9 py-1.5 w-full bg-transparent border-0 font-medium"
            placeholder="Search movies..."
          />
        </div>
      </div>
    </OuterGrid>
  )
}
