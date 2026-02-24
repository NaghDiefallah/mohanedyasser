import { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { heroPortraitSources } from '@/data/imageSources';

const ProfileCard = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const profile = t.about.profile;

  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data } = await supabase.rpc('get_review_ratings');
      if (data && data.length > 0) {
        const avg = data.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / data.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setTotalReviews(data.length);
      }
    };
    fetchRatings();

    const handleUpdate = () => fetchRatings();
    window.addEventListener('review-updated', handleUpdate);

    return () => {
      window.removeEventListener('review-updated', handleUpdate);
    };
  }, []);

  const cardBg = theme === 'light'
    ? 'hsl(210 20% 96% / 0.7)'
    : 'hsl(220 30% 8% / 0.8)';

  const cardBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.6)'
    : '1px solid hsl(195 100% 40% / 0.15)';

  const innerBorder = theme === 'light'
    ? '1px solid hsl(214 20% 88% / 0.5)'
    : '1px solid hsl(220 20% 18% / 0.8)';

  const infoItems = [
    { icon: MapPin, label: profile.fromLabel, value: profile.from },
    { icon: Award, label: profile.experienceLabel, value: profile.experienceValue },
    { icon: Clock, label: profile.responseLabel, value: profile.responseValue },
    { icon: Globe, label: profile.languagesLabel, value: profile.languages },
  ];

  return (
    <div
      className="rounded-2xl backdrop-blur-xl overflow-hidden"
      style={{ background: cardBg, border: cardBorder }}
    >
      {/* Header: Avatar + Name + Badge + Rating */}
      <div className={`p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-primary/30"
          >
            <picture>
              <source type="image/avif" srcSet={heroPortraitSources.avifSrcSet} sizes="112px" />
              <source type="image/webp" srcSet={heroPortraitSources.webpSrcSet} sizes="112px" />
              <img
                src={heroPortraitSources.fallback}
                alt={profile.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>
        </div>

        {/* Name + Badge + Rating */}
        <div className={`flex flex-col items-center sm:items-start gap-2 ${isRTL ? 'sm:items-end' : ''}`}>
          <h3
            className="text-xl md:text-2xl font-bold text-foreground"
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
          >
            {profile.name}
          </h3>

          <p className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {profile.tagline}
          </p>

          {/* Rating - dynamic from reviews */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => {
                const diff = avgRating - s + 1;
                const isFull = diff >= 1;
                const isHalf = !isFull && diff >= 0.5;
                return (
                  <span key={s} className="relative" style={{ width: 14, height: 14 }}>
                    <Star size={14} className="absolute inset-0 text-muted-foreground/30" />
                    {(isFull || isHalf) && (
                      <span className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? '50%' : '100%' }}>
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {totalReviews > 0 ? avgRating.toFixed(1) : '—'}
            </span>
            <span className="text-xs text-muted-foreground">
              ({totalReviews > 0 ? `${totalReviews}` : '0'})
            </span>
            <span className="text-muted-foreground/40 mx-1">|</span>
            <span className="text-xs font-medium text-primary">{profile.level}</span>
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className={`mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 text-white ${isRTL ? 'font-arabic' : ''}`}
            style={{ backgroundColor: '#0077b6' }}
          >
            {profile.contactBtn}
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-8 divider-warm" />

      {/* Info Grid */}
      <div className="p-6 md:p-8">
        <div
          className="rounded-xl p-5 md:p-6"
          style={{ border: innerBorder }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`flex flex-col gap-0.5 ${isRTL ? 'items-end' : ''}`}>
                  <span className={`text-xs text-muted-foreground/70 ${isRTL ? 'font-arabic' : ''}`}>
                    {item.label}
                  </span>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon size={14} className="text-primary/60 shrink-0" />
                    <span className={`text-sm font-semibold text-foreground ${isRTL ? 'font-arabic' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-8 divider-warm" />

      {/* About Description */}
      <div className="p-6 md:p-8">
        <p className={`text-sm md:text-base text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
          {profile.description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
