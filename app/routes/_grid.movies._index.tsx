import { type MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Movies - Movies App' }]
}

export default function MoviesPage() {
  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-10">Movies</h2>
      <p className="text-neutral-400">
        Practice what you've learned and implement a request handler that
        returns a list of all existing movies on this page. Reuse the same{' '}
        <code>movies</code> array for data and the <code>MovieThumbnail</code>{' '}
        component for the UI.
      </p>
    </div>
  )
}
