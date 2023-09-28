import { Link } from '@remix-run/react'

interface MovieThumbnailProps {
  title: string
  url: string
  category: string
  imageUrl: string
  releasedAt: Date
}

export function MovieThumbnail({
  title,
  url,
  category,
  imageUrl,
  releasedAt,
}: MovieThumbnailProps) {
  return (
    <article>
      <Link to={url}>
        <figure>
          <img
            src={imageUrl}
            alt={title}
            className="object-cover aspect-[9/16] rounded-md shadow-lg"
          />
        </figure>
      </Link>
      <section className="mt-5">
        <Link
          to={url}
          className="text-lg font-semibold leading-6 hover:underline"
        >
          {title}
        </Link>
        <p className="mt-1 text-neutral-500 font-medium text-sm">
          {category} • {releasedAt.getFullYear()}
        </p>
      </section>
    </article>
  )
}
