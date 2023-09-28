export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl: string
}

export interface Movie {
  id: string
  slug: string
  title: string
  category: string
  releasedAt: Date
  description: string
  imageUrl: string
}

export interface FeaturedMovie extends Movie {}

export interface MovieReview {
  id: string
  text: string
  rating: number
  author: User
}

export interface ListReviewsQuery {
  reviews: Array<MovieReview>
}

export interface ListReviewQueryVariables {
  movieId: string
}

export interface AddReviewMutation {
  addReview: {
    id: string
    text: string
  }
}

export interface AddReviewMutationVariables {
  author: Pick<User, 'id' | 'firstName' | 'avatarUrl'>
  reviewInput: {
    movieId: string
    text: string
    rating: number
  }
}

export interface Series {
  id: string
  title: string
  category: string
  episodes: Array<Episode>
}

export interface Episode {
  id: string
  title: string
  durationMinutes: number
}
