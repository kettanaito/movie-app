import type { MovieReview } from '~/types'
import { HiStar as StarIcon } from 'react-icons/hi2'
import { Avatar } from './avatar'

interface MovieReviewItemProps {
  review: MovieReview
}

export function MovieReviewItem({ review }: MovieReviewItemProps) {
  return (
    <div className="p-3 flex gap-3 bg-neutral-800 bg-opacity-50 border border-neutral-800 rounded-lg">
      <Avatar url={review.author.avatarUrl} alt={review.author.firstName} />
      <div>
        <p>
          <strong>{review.author.firstName}</strong>
          <span className="ml-2 text-sm text-neutral-400">
            <span className="text-amber-400 font-semibold">
              <StarIcon className="inline -mt-[0.25rem] mr-0.5 text-sm" />
              {review.rating}
            </span>
            <span className="mx-0.5">/</span>5
          </span>
        </p>
        <p className="font-bold"></p>
        <p className="italic text-neutral-400">{review.text}</p>
      </div>
    </div>
  )
}
