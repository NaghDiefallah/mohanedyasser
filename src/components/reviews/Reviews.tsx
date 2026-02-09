import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, LogIn, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import RatingSummary from './RatingSummary';
import OwnerLoginModal from './OwnerLoginModal';

type SortOption = 'newest' | 'highest' | 'lowest';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface OwnerReply {
  id: string;
  review_id: string;
  reply: string;
  owner_user_id: string | null;
  created_at: string;
  updated_at: string;
}

const Reviews = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replies, setReplies] = useState<OwnerReply[]>([]);
  const [sort, setSort] = useState<SortOption>('newest');
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myTokens, setMyTokens] = useState<Record<string, string>>({});

  // Load own review tokens from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('my_review_tokens') || '{}');
    setMyTokens(stored);
  }, []);

  const fetchData = useCallback(async () => {
    const [reviewsRes, repliesRes] = await Promise.all([
      supabase.from('reviews').select('id, name, rating, comment, created_at').order('created_at', { ascending: false }),
      supabase.from('owner_replies').select('id, review_id, reply, owner_user_id, created_at, updated_at'),
    ]);
    if (reviewsRes.data) setReviews(reviewsRes.data);
    if (repliesRes.data) setReplies(repliesRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();

    // Check admin role (server-side verified)
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.rpc('is_admin');
        setIsOwner(!!data);
      } else {
        setIsOwner(false);
      }
    };
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data } = await supabase.rpc('is_admin');
        setIsOwner(!!data);
      } else {
        setIsOwner(false);
      }
    });

    // Realtime subscription
    const channel = supabase
      .channel('reviews-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'owner_replies' }, () => fetchData())
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOwner(false);
  };

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

        {/* Sort + Owner controls */}
        {reviews.length > 0 && (
          <div className={`flex items-center justify-between flex-wrap gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Sort pills */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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

            {/* Owner login/logout */}
            <button
              onClick={isOwner ? handleLogout : () => setShowLogin(true)}
              className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-primary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isOwner ? <LogOut size={12} /> : <LogIn size={12} />}
              {isOwner ? (isRTL ? 'خروج' : 'Logout') : (isRTL ? 'دخول المالك' : 'Owner')}
            </button>
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
            {sortedReviews.map((review) => {
              const reply = replies.find((r) => r.review_id === review.id) || null;
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  ownerReply={reply}
                  isOwner={isOwner}
                  isOwnReview={!!myTokens[review.id]}
                  onReplyUpdated={() => {
                    fetchData();
                    setMyTokens(JSON.parse(localStorage.getItem('my_review_tokens') || '{}'));
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Owner Login Modal */}
      <OwnerLoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoggedIn={() => setIsOwner(true)}
      />
    </div>
  );
};

export default Reviews;
