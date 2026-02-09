import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface RatingSummaryProps {
  reviews: { rating: number }[];
}

const RatingSummary = ({ reviews }: RatingSummaryProps) => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();

  const total = reviews.length;
  const avg = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: total > 0 ? (reviews.filter((r) => r.rating === star).length / total) * 100 : 0,
  }));

  const cardBg = theme === 'light'
    ? 'hsl(210 20% 96% / 0.7)'
    : 'hsl(220 30% 8% / 0.8)';
  const cardBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.6)'
    : '1px solid hsl(195 100% 40% / 0.15)';
  const barBg = theme === 'light'
    ? 'hsl(210 20% 90%)'
    : 'hsl(220 20% 15%)';

  const rv = t.reviews;

  return (
    <div
      className="rounded-2xl backdrop-blur-xl p-6 md:p-8"
      style={{ background: cardBg, border: cardBorder }}
    >
      <div className={`flex flex-col sm:flex-row items-center gap-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        {/* Left: Big average */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span
            className="text-5xl md:text-6xl font-bold text-foreground"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {avg.toFixed(1)}
          </span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                className={s <= Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}
              />
            ))}
          </div>
          <span className={`text-xs text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {total} {rv.totalReviews}
          </span>
        </div>

        {/* Right: Distribution bars */}
        <div className="flex-1 w-full space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs text-muted-foreground w-4 text-center">{d.star}</span>
              <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: barBg }}>
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground/60 w-6 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
