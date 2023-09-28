import { useLoaderData, useRouteError } from '@remix-run/react'
import { ErrorBanner } from '~/components/errorBanner'
import { MovieThumbnail } from '~/components/movieThumbnail'
import type { FeaturedMovie } from '~/types'

export async function loader() {
  const featuredMovies = await fetch(
    'https://api.example.com/movies/featured',
  ).then<Array<FeaturedMovie>>((response) => response.json())

  return {
    featuredMovies,
  }
}

export default function Homepage() {
  const { featuredMovies } = useLoaderData<typeof loader>()

  return (
    <section>
      <h2 className="text-4xl font-extrabold mb-10">Featured movies</h2>
      {featuredMovies.length > 0 ? (
        <ul className="grid grid-cols-2 lg:grid-cols-[repeat(3,_minmax(0px,_250px))] gap-x-6 gap-y-16">
          {featuredMovies.map((movie) => (
            <li key={movie.id}>
              <MovieThumbnail
                title={movie.title}
                url={`/movies/${movie.slug}`}
                category={movie.category}
                imageUrl={movie.imageUrl}
                releasedAt={new Date(movie.releasedAt)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral-400">No featured movies yet.</p>
      )}
    </section>
  )
}

export function ErrorBoundary() {
  const error = useRouteError() as Error

  return <ErrorBanner displayText="Failed to fetch" error={error} />
}
