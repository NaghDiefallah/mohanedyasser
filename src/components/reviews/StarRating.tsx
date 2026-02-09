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

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = interactive ? star <= (hovered || rating) : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`transition-colors duration-150 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={filled ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
