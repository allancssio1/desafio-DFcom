import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onRatingChange,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const handleClick = (newRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(newRating)
    }
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= Math.round(rating)

          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300',
                interactive &&
                  'cursor-pointer hover:text-yellow-400 transition-colors',
              )}
              onClick={() => handleClick(starValue)}
            />
          )
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-slate-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating
