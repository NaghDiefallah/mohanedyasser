import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import RatingSummary from './RatingSummary';

type SortOption = 'newest' | 'highest' | 'lowest';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Reviews = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sort, setSort] = useState<SortOption>('newest');
  const [loading, setLoading] = useState(true);
  const [myTokens, setMyTokens] = useState<Record<string, string>>({});

  const refreshTokens = useCallback(() => {
    setMyTokens(JSON.parse(localStorage.getItem('my_review_tokens') || '{}'));
  }, []);

  useEffect(() => {
    refreshTokens();
  }, [refreshTokens]);

  const fetchData = useCallback(async () => {
    const { data } = await supabase.rpc('get_public_reviews');
    if (data) setReviews(data as Review[]);
    setLoading(false);
    refreshTokens();
  }, [refreshTokens]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sort === 'highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  const rv = t.reviews;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: rv.sortNewest },
    { value: 'highest', label: rv.sortHighest },
    { value: 'lowest', label: rv.sortLowest },
  ];

  const pillBg = theme === 'light'
    ? 'hsl(210 20% 93%)'
    : 'hsl(220 25% 14%)';
  const pillBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85%)'
    : '1px solid hsl(220 20% 22%)';

  return (
    <div className="py-20 md:py-32 px-6 sm:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-xs tracking-[0.3em] text-primary font-bold uppercase">
              {rv.label}
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
          >
            <span className="text-foreground">{rv.title} </span>
            <span className="text-primary">{rv.titleHighlight}</span>
          </h2>
        </div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <div className="mb-10">
            <RatingSummary reviews={reviews} />
          </div>
        )}

        {/* Review Form */}
        <div className="mb-10">
          <ReviewForm onReviewAdded={fetchData} />
        </div>

        {/* Sort controls */}
        {reviews.length > 0 && (
          <div className={`flex items-center gap-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ArrowUpDown size={14} className="text-muted-foreground/60" />
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  sort === opt.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                } ${isRTL ? 'font-arabic' : ''}`}
                style={sort !== opt.value ? { background: pillBg, border: pillBorder } : undefined}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-12">
            <span className="text-muted-foreground text-sm">{isRTL ? 'جاري التحميل...' : 'Loading...'}</span>
          </div>
        ) : sortedReviews.length === 0 ? (
          <div className="text-center py-12">
            <span className={`text-muted-foreground text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {rv.noReviews}
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isOwnReview={!!myTokens[review.id]}
                onDeleted={fetchData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
