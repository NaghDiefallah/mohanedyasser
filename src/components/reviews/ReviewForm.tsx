import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import StarRating from './StarRating';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReviewFormProps {
  onReviewAdded: () => void;
}

const ReviewForm = ({ onReviewAdded }: ReviewFormProps) => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid = name.trim().length > 0 && rating > 0 && comment.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      // Generate a delete token for this review
      const deleteToken = crypto.randomUUID();

      const { data, error } = await supabase.from('reviews').insert({
        name: name.trim(),
        rating,
        comment: comment.trim(),
        delete_token: deleteToken,
      }).select('id').single();

      if (error) throw error;

      // Store the token in localStorage so the user can delete their review later
      if (data) {
        const stored = JSON.parse(localStorage.getItem('my_review_tokens') || '{}');
        stored[data.id] = deleteToken;
        localStorage.setItem('my_review_tokens', JSON.stringify(stored));
      }

      toast({
        title: isRTL ? 'تم إرسال التقييم!' : 'Review submitted!',
        description: isRTL ? 'شكراً لمشاركتك رأيك.' : 'Thank you for your feedback.',
      });

      setName('');
      setRating(0);
      setComment('');
      onReviewAdded();
    } catch {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'فشل إرسال التقييم. حاول مرة أخرى.' : 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cardBg = theme === 'light'
    ? 'hsl(210 20% 96% / 0.7)'
    : 'hsl(220 30% 8% / 0.8)';
  const cardBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.6)'
    : '1px solid hsl(195 100% 40% / 0.15)';
  const inputBg = theme === 'light'
    ? 'hsl(210 20% 94%)'
    : 'hsl(220 25% 12%)';
  const inputBorder = theme === 'light'
    ? '1px solid hsl(214 20% 82%)'
    : '1px solid hsl(220 20% 20%)';

  const rv = t.reviews;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl backdrop-blur-xl p-6 md:p-8 space-y-5"
      style={{ background: cardBg, border: cardBorder }}
    >
      <h3
        className={`text-lg font-bold text-foreground ${isRTL ? 'font-arabic text-right' : ''}`}
        style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
      >
        {rv.formTitle}
      </h3>

      {/* Name */}
      <div>
        <label className={`block text-xs text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {rv.nameLabel} <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={rv.namePlaceholder}
          maxLength={100}
          className={`w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:ring-1 focus:ring-primary/40 ${isRTL ? 'font-arabic text-right' : ''}`}
          style={{ background: inputBg, border: inputBorder }}
        />
      </div>

      {/* Star Rating */}
      <div>
        <label className={`block text-xs text-muted-foreground mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {rv.ratingLabel} <span className="text-primary">*</span>
        </label>
        <StarRating rating={rating} onRate={setRating} size={24} interactive />
      </div>

      {/* Comment */}
      <div>
        <label className={`block text-xs text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {rv.commentLabel} <span className="text-primary">*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={rv.commentPlaceholder}
          rows={4}
          maxLength={2000}
          className={`w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:ring-1 focus:ring-primary/40 resize-none ${isRTL ? 'font-arabic text-right' : ''}`}
          style={{ background: inputBg, border: inputBorder }}
        />
      </div>

      {/* Validation message */}
      {!isValid && (name.length > 0 || rating > 0 || comment.length > 0) && (
        <p className={`text-xs text-destructive ${isRTL ? 'font-arabic text-right' : ''}`}>
          {!name.trim() ? rv.nameRequired : !rating ? rv.ratingRequired : rv.commentRequired}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || submitting}
        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}
      >
        {submitting ? (isRTL ? 'جاري الإرسال...' : 'Submitting...') : rv.submitBtn}
        <Send size={14} />
      </button>
    </form>
  );
};

export default ReviewForm;
