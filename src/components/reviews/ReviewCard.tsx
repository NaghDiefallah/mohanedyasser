import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import StarRating from './StarRating';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReviewCardProps {
  review: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
  };
  isOwnReview: boolean;
  onDeleted: () => void;
}

function timeAgo(dateStr: string, isRTL: boolean): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return isRTL ? 'الآن' : 'just now';
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return isRTL ? `منذ ${m} دقيقة` : `${m}m ago`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return isRTL ? `منذ ${h} ساعة` : `${h}h ago`;
  }
  if (diff < 2592000) {
    const d = Math.floor(diff / 86400);
    return isRTL ? `منذ ${d} يوم` : `${d}d ago`;
  }
  const mo = Math.floor(diff / 2592000);
  return isRTL ? `منذ ${mo} شهر` : `${mo}mo ago`;
}

const ReviewCard = ({ review, isOwnReview, onDeleted }: ReviewCardProps) => {
  const { isRTL } = useLanguage();
  const { theme } = useTheme();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const stored = JSON.parse(localStorage.getItem('my_review_tokens') || '{}');
    const token = stored[review.id];
    if (!token) return;

    setDeleting(true);
    try {
      const { data, error } = await supabase.rpc('delete_review', {
        p_review_id: review.id,
        p_delete_token: token,
      });

      if (error) throw error;
      if (!data) throw new Error('Token mismatch');

      delete stored[review.id];
      localStorage.setItem('my_review_tokens', JSON.stringify(stored));

      toast({
        title: isRTL ? 'تم حذف التقييم' : 'Review deleted',
        description: isRTL ? 'تم حذف تقييمك بنجاح.' : 'Your review has been removed.',
      });
      onDeleted();
    } catch {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'فشل حذف التقييم.' : 'Failed to delete review.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  const cardBg = theme === 'light'
    ? 'hsl(210 20% 96% / 0.7)'
    : 'hsl(220 30% 8% / 0.8)';
  const cardBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.6)'
    : '1px solid hsl(195 100% 40% / 0.15)';

  const initial = review.name.charAt(0).toUpperCase();

  return (
    <div
      className="rounded-2xl backdrop-blur-xl p-5 md:p-6 space-y-4"
      style={{ background: cardBg, border: cardBorder }}
    >
      {/* Header: Avatar + Name + Rating + Time + Delete */}
      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-primary">{initial}</span>
        </div>

        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
          <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className={`text-sm font-semibold text-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {review.name}
            </span>
            <span className="text-xs text-muted-foreground/60">
              {timeAgo(review.created_at, isRTL)}
            </span>
          </div>
          <div className={`mt-1 ${isRTL ? 'flex justify-end' : ''}`}>
            <StarRating rating={review.rating} size={14} />
          </div>
        </div>

        {isOwnReview && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 p-1"
            title={isRTL ? 'حذف تقييمك' : 'Delete your review'}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Comment */}
      <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
