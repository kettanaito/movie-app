import {
  redirect,
  type MetaFunction,
  type LoaderArgs,
  type ActionArgs,
  json,
} from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { gql } from 'graphql-request'
import { HiPlayCircle as PlayIcon } from 'react-icons/hi2'
import { mutate } from '~/hooks/useQuery'
import type {
  AddReviewMutation,
  AddReviewMutationVariables,
  Movie,
} from '~/types'
import { MovieReviewsList } from '~/components/movieReviewsList'
import { getSession, requireAuthenticatedUser } from '~/session'
import { RecommendedMovies } from '~/components/recommendedMovies'

export async function loader({ request, params }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')

  const { slug } = params

  if (typeof slug === 'undefined') {
    throw redirect('/movies')
  }

  const response = await fetch(
    // Fetch a single movie detail by its slug.
    `https://api.example.com/movies/${slug}`
  ).catch((error) => {
    throw redirect('/movies')
  })

  if (!response.ok) {
    throw redirect('/movies')
  }

  const movie = (await response.json()) satisfies Movie

  return {
    movie,
    isAuthenticated: user != null,
  }
}

export const meta: MetaFunction = ({ data }) => {
  return [
    {
      title: `${data.movie.title} - Movie App`,
    },
  ]
}

export async function action({ request }: ActionArgs) {
  const user = await requireAuthenticatedUser(request)
  const payload = await request.formData()

  const movieId = payload.get('movieId') as string
  const reviewRating = Number(payload.get('reviewRating'))
  const reviewText = payload.get('reviewText') as string

  // Post a GraphQL mutation to submit a review.
  const addReview = mutate<AddReviewMutation, AddReviewMutationVariables>(gql`
    mutation AddReview($author: UserInput!, $reviewInput: ReviewInput!) {
      addReview(author: $author, reviewInput: $reviewInput) {
        id
        text
        author {
          id
          firstName
          avatarUrl
        }
      }
    }
  `)

  const addReviewResponse = await addReview({
    variables: {
      author: {
        id: user.id,
        firstName: user.firstName,
        avatarUrl: user.avatarUrl,
      },
      reviewInput: {
        movieId,
        text: reviewText,
        rating: reviewRating,
      },
    },
  })

  if (addReviewResponse.error) {
    throw addReviewResponse.error
  }

  return json(addReviewResponse.data.addReview)
}

export default function MovieDetailPage() {
  const { movie } = useLoaderData<typeof loader>()

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-10">
      <div>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="rounded-md shadow-lg"
        />
        <div className="mt-5">
          <Link
            to={'./watch'}
            className="flex items-center justify-center gap-1.5 button button-primary w-full"
          >
            <PlayIcon className="text-xl" />
            Watch now
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold mb-3">{movie.title}</h1>
        <p className="text-neutral-400">
          {movie.category} • {new Date(movie.releasedAt).getFullYear()}
        </p>
        <p className="my-5">{movie.description}</p>
        <MovieReviewsList movieId={movie.id} />
      </div>

      <div className="col-span-full">
        <RecommendedMovies movieId={movie.id} />
      </div>
    </div>
  )
}
