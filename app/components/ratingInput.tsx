import { useState } from 'react'
import {
  HiOutlineStar as StartIcon,
  HiStar as StarFillIcon,
} from 'react-icons/hi2'

interface RatingInputProps {
  name: string
  label: string
  defaultValue?: number
  value?: number
  onChange?: (nextRating: number) => void
}

export function RatingInput(props: RatingInputProps) {
  const [internalValue, setInternalValue] = useState(props.value ?? 0)
  const value = props.value == null ? internalValue : props.value

  const starsCount = 5

  const handleRatingChange = (nextRating: number) => {
    if (props.value != null) {
      return props.onChange?.(nextRating)
    }

    setInternalValue(nextRating)
  }

  const handleReset: React.FormEventHandler<HTMLInputElement> = (event) => {
    const nextValue = Number(event.currentTarget.value)
    setInternalValue(nextValue)
  }

  return (
    <div className="flex items-center gap-2">
      <input
        {...props}
        id={props.name}
        min="1"
        max="5"
        value={value}
        className="hidden"
        onChange={() => {}}
        onReset={handleReset}
      />

      <label htmlFor={props.name}>{props.label}:</label>
      <ul className="flex items-center gap-0.5">
        {Array.from({ length: starsCount }, (_, index) => {
          const isFilled = index < value
          const currentStartValue = index + 1

          if (isFilled) {
            return (
              <StarFillIcon
                key={index}
                className="text-yellow-500"
                onClick={handleRatingChange.bind(null, currentStartValue)}
              />
            )
          }

          return (
            <StartIcon
              key={index}
              onClick={handleRatingChange.bind(null, currentStartValue)}
            />
          )
        })}
      </ul>
    </div>
  )
}
