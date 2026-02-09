import { useState } from 'react';
import { MessageSquare, Edit2, Check, X, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import StarRating from './StarRating';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OwnerReply {
  id: string;
  reply: string;
  owner_user_id: string | null;
  created_at: string;
  updated_at: string;
}

interface ReviewCardProps {
  review: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
  };
  ownerReply?: OwnerReply | null;
  isOwner: boolean;
  isOwnReview: boolean;
  onReplyUpdated: () => void;
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

const ReviewCard = ({ review, ownerReply, isOwner, isOwnReview, onReplyUpdated }: ReviewCardProps) => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState(ownerReply?.reply || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const rv = t.reviews;

  const handleSaveReply = async () => {
    if (!replyText.trim()) return;
    setSaving(true);
    try {
      if (ownerReply) {
        const { error } = await supabase
          .from('owner_replies')
          .update({ reply: replyText.trim() })
          .eq('id', ownerReply.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('owner_replies')
          .insert({ review_id: review.id, reply: replyText.trim() });
        if (error) throw error;
      }
      setShowReplyInput(false);
      setEditing(false);
      onReplyUpdated();
    } catch {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'فشل حفظ الرد.' : 'Failed to save reply.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

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

      // Remove token from localStorage
      delete stored[review.id];
      localStorage.setItem('my_review_tokens', JSON.stringify(stored));

      toast({
        title: isRTL ? 'تم حذف التقييم' : 'Review deleted',
        description: isRTL ? 'تم حذف تقييمك بنجاح.' : 'Your review has been removed.',
      });
      onReplyUpdated();
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
  const replyBg = theme === 'light'
    ? 'hsl(195 100% 95% / 0.5)'
    : 'hsl(195 100% 15% / 0.15)';
  const replyBorder = theme === 'light'
    ? '1px solid hsl(195 100% 70% / 0.3)'
    : '1px solid hsl(195 100% 40% / 0.2)';
  const inputBg = theme === 'light'
    ? 'hsl(210 20% 94%)'
    : 'hsl(220 25% 12%)';
  const inputBorder = theme === 'light'
    ? '1px solid hsl(214 20% 82%)'
    : '1px solid hsl(220 20% 20%)';

  const initial = review.name.charAt(0).toUpperCase();

  return (
    <div
      className="rounded-2xl backdrop-blur-xl p-5 md:p-6 space-y-4"
      style={{ background: cardBg, border: cardBorder }}
    >
      {/* Header: Avatar + Name + Rating + Time + Delete */}
      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
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

        {/* Delete button for own review */}
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

      {/* Owner Reply */}
      {ownerReply && !editing && (
        <div
          className={`rounded-xl p-4 space-y-2 ${isRTL ? 'mr-6' : 'ml-6'}`}
          style={{ background: replyBg, border: replyBorder }}
        >
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`text-xs font-semibold text-primary ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'محمد ياسر — المالك' : 'Mohamed Yasser — Owner'}
            </span>
            {isOwner && (
              <button
                onClick={() => { setEditing(true); setReplyText(ownerReply.reply); }}
                className="text-muted-foreground/50 hover:text-primary transition-colors"
              >
                <Edit2 size={12} />
              </button>
            )}
          </div>
          <p className={`text-sm text-foreground/80 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
            {ownerReply.reply}
          </p>
        </div>
      )}

      {/* Reply input (owner only) */}
      {isOwner && (showReplyInput || editing) && (
        <div className={`space-y-3 ${isRTL ? 'mr-6' : 'ml-6'}`}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={isRTL ? 'اكتب ردك...' : 'Write your reply...'}
            rows={3}
            className={`w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:ring-1 focus:ring-primary/40 resize-none ${isRTL ? 'font-arabic text-right' : ''}`}
            style={{ background: inputBg, border: inputBorder }}
          />
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleSaveReply}
              disabled={!replyText.trim() || saving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-40 transition-all"
            >
              <Check size={12} />
              {saving ? '...' : (isRTL ? 'حفظ' : 'Save')}
            </button>
            <button
              onClick={() => { setShowReplyInput(false); setEditing(false); }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={12} />
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* Reply button (owner only, no existing reply) */}
      {isOwner && !ownerReply && !showReplyInput && (
        <button
          onClick={() => setShowReplyInput(true)}
          className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <MessageSquare size={12} />
          {rv.replyBtn}
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
