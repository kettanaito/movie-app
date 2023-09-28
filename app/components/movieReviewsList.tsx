import { useEffect } from 'react'
import { useFetchers } from '@remix-run/react'
import { gql } from 'graphql-request'
import { useQuery } from '~/hooks/useQuery'
import type {
  ListReviewQueryVariables,
  ListReviewsQuery,
  MovieReview,
} from '~/types'
import { getOptimisticData } from '~/utils/getOptimisticData'
import { MovieReviewItem } from './movieReviewItem'
import { MovieReviewForm } from './movieReviewForm'
import { ErrorBanner } from './errorBanner'

interface MovieReviewListProps {
  movieId: string
}

export function MovieReviewsList({ movieId }: MovieReviewListProps) {
  const [{ loading, data, error }, { updateCache }] = useQuery<
    ListReviewsQuery,
    ListReviewQueryVariables
  >(
    gql`
      query ListReviews($movieId: ID!) {
        reviews(movieId: $movieId) {
          id
          text
          rating
          author {
            firstName
            avatarUrl
          }
        }
      }
    `,
    {
      variables: {
        movieId,
      },
    },
  )

  const fetchers = useFetchers()
  const pendingReview = getOptimisticData<MovieReview>(fetchers[0])

  useEffect(() => {
    if (pendingReview) {
      updateCache((cache) => {
        cache.reviews.push(pendingReview)
        return cache
      })
    }
  }, [pendingReview])

  return (
    <section className="mt-10">
      <div className="my-5">
        <h2 className="text-2xl font-extrabold mb-5">Reviews</h2>
        {loading ? (
          <div className="grid xl:grid-cols-2 gap-5">
            <div className="h-[74px] bg-neutral-800 bg-opacity-50 border border-neutral-800 rounded-lg animate-placeholder" />
            <div className="h-[74px] bg-neutral-800 bg-opacity-50 border border-neutral-800 rounded-lg animate-placeholder" />
          </div>
        ) : error ? (
          <ErrorBanner displayText="Failed to fetch reviews" error={error} />
        ) : data?.reviews?.length ? (
          <ul className="grid xl:grid-cols-2 gap-5">
            {data?.reviews.map((review) => (
              <li key={review.id}>
                <MovieReviewItem review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">No reviews for this movie yet.</p>
        )}
      </div>
      <div className="p-6 border border-neutral-800 rounded-lg">
        <MovieReviewForm movieId={movieId} />
      </div>
    </section>
  )
}
