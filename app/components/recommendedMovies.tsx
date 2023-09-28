import { MovieThumbnail } from './movieThumbnail'
import { ErrorBanner } from './errorBanner'
import { useRequest } from '~/hooks/useRequest'
import type { Movie } from '~/types'

export function RecommendedMovies() {
  const { state, error, data } =
    useRequest<Array<Movie>>(`/api/recommendations`)

  if (state === 'idle' || (state === 'done' && data == null && error == null)) {
    return null
  }

  return (
    <section>
      <h3 className="text-2xl font-bold mb-5">Recommended</h3>
      {state === 'loading' ? (
        <ul className="grid grid-cols-3 gap-5">
          <li>
            <div className="h-[165px] bg-neutral-800 bg-opacity-50 border border-neutral-800 rounded-lg animate-placeholder" />
          </li>
          <li>
            <div className="h-[165px] bg-neutral-800 bg-opacity-50 border border-neutral-800 rounded-lg animate-placeholder" />
          </li>
        </ul>
      ) : error ? (
        <ErrorBanner displayText="Recommendations error" error={error} />
      ) : data?.length > 0 ? (
        <ul className="grid grid-cols-3 gap-5">
          {data?.map((movie) => (
            <li key={movie.id}>
              <MovieThumbnail
                url={`/movies/${movie.slug}`}
                title={movie.title}
                category={movie.category}
                imageUrl={movie.imageUrl}
                releasedAt={new Date(movie.releasedAt)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral-500">No recommendations found.</p>
      )}
    </section>
  )
}
