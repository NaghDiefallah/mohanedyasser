import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
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
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(review.name);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);
  const [saving, setSaving] = useState(false);

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
      window.dispatchEvent(new Event('review-updated'));
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

  const handleEdit = () => {
    setEditName(review.name);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim() || !editComment.trim() || editRating < 1) return;

    const stored = JSON.parse(localStorage.getItem('my_review_tokens') || '{}');
    const token = stored[review.id];
    if (!token) return;

    setSaving(true);
    try {
      const { data, error } = await supabase.rpc('update_review', {
        p_review_id: review.id,
        p_delete_token: token,
        p_name: editName.trim(),
        p_rating: editRating,
        p_comment: editComment.trim(),
      });

      if (error) throw error;
      if (!data) throw new Error('Token mismatch');

      toast({
        title: isRTL ? 'تم تعديل التقييم' : 'Review updated',
        description: isRTL ? 'تم تعديل تقييمك بنجاح.' : 'Your review has been updated.',
      });
      setEditing(false);
      onDeleted(); // refresh list
      window.dispatchEvent(new Event('review-updated'));
    } catch {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'فشل تعديل التقييم.' : 'Failed to update review.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
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

  const initial = review.name.charAt(0).toUpperCase();

  if (editing) {
    return (
      <div
        className="rounded-2xl backdrop-blur-xl p-5 md:p-6 space-y-4"
        style={{ background: cardBg, border: cardBorder }}
      >
        {/* Edit Name */}
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          maxLength={100}
          className={`w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:ring-1 focus:ring-primary/40 ${isRTL ? 'font-arabic text-right' : ''}`}
          style={{ background: inputBg, border: inputBorder }}
          placeholder={isRTL ? 'الاسم' : 'Name'}
        />

        {/* Edit Rating */}
        <div className={`${isRTL ? 'flex justify-end' : ''}`}>
          <StarRating rating={editRating} onRate={setEditRating} size={20} interactive />
        </div>

        {/* Edit Comment */}
        <textarea
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
          maxLength={2000}
          rows={3}
          className={`w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:ring-1 focus:ring-primary/40 resize-none ${isRTL ? 'font-arabic text-right' : ''}`}
          style={{ background: inputBg, border: inputBorder }}
          placeholder={isRTL ? 'التعليق' : 'Comment'}
        />

        {/* Save / Cancel buttons */}
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={handleSaveEdit}
            disabled={saving || !editName.trim() || !editComment.trim() || editRating < 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check size={14} />
            {saving ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ' : 'Save')}
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
          >
            <X size={14} />
            {isRTL ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl backdrop-blur-xl p-5 md:p-6 space-y-4"
      style={{ background: cardBg, border: cardBorder }}
    >
      {/* Header: Avatar + Name + Rating + Time + Edit/Delete */}
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
          <div className={`flex items-center gap-1 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleEdit}
              className="text-muted-foreground/40 hover:text-primary transition-colors p-1"
              title={isRTL ? 'تعديل تقييمك' : 'Edit your review'}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-muted-foreground/40 hover:text-destructive transition-colors p-1"
              title={isRTL ? 'حذف تقييمك' : 'Delete your review'}
            >
              <Trash2 size={14} />
            </button>
          </div>
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
