import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

const StarRating = ({ rating, onRate, size = 18, interactive = false }: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);

  const displayRating = interactive ? (hovered || rating) : rating;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const diff = displayRating - star + 1;
        // full if diff >= 1, half if diff >= 0.5, empty otherwise
        const isFull = diff >= 1;
        const isHalf = !isFull && diff >= 0.5;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`relative transition-colors duration-150 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
            style={{ width: size, height: size }}
          >
            {/* Background (empty) star */}
            <Star
              size={size}
              className="absolute inset-0 text-muted-foreground/30"
            />
            {/* Filled / half-filled star */}
            {(isFull || isHalf) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: isHalf ? '50%' : '100%' }}
              >
                <Star
                  size={size}
                  className="fill-amber-400 text-amber-400"
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
