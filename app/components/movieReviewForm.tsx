import { useEffect, useState } from 'react'
import { Link, useFetcher, useLoaderData, useLocation } from '@remix-run/react'
import { RatingInput } from './ratingInput'
import type { loader } from '../routes/_grid.movies.$slug'

export function MovieReviewForm({ movieId }: { movieId: string }) {
  const location = useLocation()
  const { isAuthenticated } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.id) {
      setRating(0)
      setReviewText('')
    }
  }, [fetcher.state, fetcher.data])

  return (
    <div className="flex flex-col gap-8 md:items-center md:flex-row md:gap-20">
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-5">Create new review</h3>
        {isAuthenticated ? (
          <fetcher.Form
            method="post"
            action="?index"
            className="flex flex-col gap-5"
          >
            <input name="_operation" value="add-review" type="hidden" />
            <input name="movieId" value={movieId} type="hidden" />

            <RatingInput
              name="reviewRating"
              label="Rating"
              value={rating}
              onChange={(nextRating) => setRating(nextRating)}
            />
            <textarea
              name="reviewText"
              rows={3}
              placeholder="Tell us what you think..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button type="submit" className="bg-neutral-700">
              Post review
            </button>
          </fetcher.Form>
        ) : (
          <div className="flex items-center gap-5">
            <p className="flex-grow-1 -mt-2 text-neutral-400">
              Please sign in to review this movie.
            </p>
          </div>
        )}
      </div>
      {!isAuthenticated ? (
        <Link
          to="/sign-in"
          className="button flex-shrink-0 w-full md:w-auto"
          state={{ redirectUrl: location.pathname }}
        >
          Sign in
        </Link>
      ) : null}
    </div>
  )
}
