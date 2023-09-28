import { type LoaderArgs, type MetaArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import {
  HiXCircle as CloseIcon,
  HiPlay as PlayIcon,
  HiPause as PauseIcon,
} from 'react-icons/hi2'
import type { Movie } from '~/types'

export async function loader({ params }: LoaderArgs) {
  const { slug } = params

  if (!slug) {
    throw redirect('/movies')
  }

  const movieResponse = await fetch(
    `https://api.example.com/movies/${slug}`
  ).catch((error) => {
    throw redirect('/movies')
  })
  const movie = (await movieResponse.json()) as Movie

  return {
    movie,
  }
}

export function meta({ data }: MetaArgs<typeof loader>) {
  const { movie } = data || {}

  if (movie == null) {
    throw new Response('Missing movie', { status: 400 })
  }

  return [
    {
      title: `${movie.title} - Movie App`,
    },
  ]
}

export default function MoviePlayer() {
  const { movie } = useLoaderData<typeof loader>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const controls = useVideoControls(videoRef)
  const navigate = useNavigate()

  const mediaSourceUrl = useMediaSource(movie.slug)

  useEffect(() => {
    const goBackOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate(`/movies/${movie.slug}`)
      }
    }

    document.addEventListener('keydown', goBackOnEscape)

    return () => {
      document.removeEventListener('keydown', goBackOnEscape)
    }
  })

  return (
    <div className="relative flex items-center bg-black h-full w-full">
      <section className="fixed top-0 left-0 right-0 p-10 flex bg-gradient-to-b from-black via-black to-transparent z-10">
        <div className="w-1/2">
          <h1 className="text-6xl font-extrabold mb-8">{movie.title}</h1>
          <p className="text-neutral-500 text-2xl">{movie.description}</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <Link
            to={`/movies/${movie.slug}`}
            className="text-5xl opacity-50 hover:opacity-100"
          >
            <CloseIcon />
          </Link>
        </div>
      </section>

      <video
        ref={videoRef}
        autoPlay={true}
        preload="metadata"
        className="w-full"
        src={mediaSourceUrl}
      />

      <section className="fixed left-0 bottom-0 right-0 p-10 flex items-center gap-10 bg-gradient-to-t from-black via-black to-transparent">
        <button className="button-primary" onClick={controls.togglePlay}>
          {controls.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <input
          id="timeline"
          type="range"
          step={0.1}
          min={0}
          max={100}
          value={controls.timeElapsed}
          className="w-full"
          onChange={(event) => {
            controls.updateTime(event.currentTarget.valueAsNumber)
          }}
          onMouseDown={() => {
            controls.pause()
          }}
          onMouseUp={() => {
            controls.play()
          }}
        />
        <label htmlFor="timeline" hidden={true}>
          Timeline
        </label>

        <input
          id="volume"
          type="range"
          step={0.1}
          min={0}
          max={1}
          value={controls.volume}
          onChange={(event) => {
            controls.updateVolume(event.currentTarget.valueAsNumber)
          }}
        />
        <label htmlFor="volume" hidden={true}>
          Volume
        </label>
      </section>
    </div>
  )
}

function useMediaSource(slug: string): string {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof MediaSource === 'undefined') {
      return
    }

    const mediaSource = new MediaSource()
    const mediaSourceUrl = URL.createObjectURL(mediaSource)
    setUrl(mediaSourceUrl)

    const fetchRemoteStream = async () => {
      const buffer = mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      )
      const response = await fetch(
        `https://api.example.com/movies/${slug}/stream`
      )

      if (!response.body) {
        return
      }

      if (!response.ok) {
        mediaSource.endOfStream('network')
        return
      }

      const reader = response.body.getReader()

      async function readChunk(): Promise<void> {
        const { value, done } = await reader.read()

        if (done) {
          return
        }

        await new Promise((resolve, reject) => {
          buffer.addEventListener('updateend', resolve, { once: true })
          buffer.addEventListener('error', reject, { once: true })
          buffer.appendBuffer(value)
        })

        return readChunk()
      }

      await readChunk()
    }

    mediaSource.addEventListener('sourceopen', fetchRemoteStream)

    return () => {
      mediaSource.removeEventListener('sourceopen', fetchRemoteStream)
      if (mediaSource.readyState === 'open') {
        mediaSource.endOfStream()
      }
    }
  }, [slug])

  return url
}

function useVideoControls(videoRef: React.RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const { current: player } = videoRef

    if (!player) {
      return
    }

    player.addEventListener('play', () => setIsPlaying(true))
    player.addEventListener('pause', () => setIsPlaying(false))

    player.addEventListener('timeupdate', () => {
      const timeElapsedPercent = Math.floor(
        (100 / player.duration || 0) * player.currentTime
      )

      setTimeElapsed(timeElapsedPercent)
    })

    player.addEventListener('volumechange', () => {
      setVolume(player.volume)
    })
  }, [videoRef])

  const play = () => {
    videoRef.current?.play()
  }

  const pause = () => {
    videoRef.current?.pause()
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const updateTime = (timeElapsedPercent: number) => {
    const player = videoRef.current

    if (!player) {
      return
    }

    const nextTime = (player.duration / 100) * timeElapsedPercent
    player.currentTime = nextTime
  }

  const updateVolume = (nextVolume: number) => {
    const player = videoRef.current

    if (!player) {
      return
    }

    player.volume = nextVolume
  }

  return {
    isPlaying,
    timeElapsed,
    volume,
    play,
    pause,
    togglePlay,
    updateTime,
    updateVolume,
  }
}
