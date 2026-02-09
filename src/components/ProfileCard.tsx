import { Star, MapPin, Clock, Zap, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import heroPortrait from '@/assets/hero-portrait.png';

const ProfileCard = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const profile = t.about.profile;

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
    { icon: Zap, label: profile.deliveryLabel, value: profile.deliveryValue },
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
            <img
              src={heroPortrait}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name + Badge + Rating */}
        <div className={`flex flex-col items-center sm:items-start gap-2 ${isRTL ? 'sm:items-end' : ''}`}>
          <div className={`flex items-center gap-3 flex-wrap justify-center sm:justify-start ${isRTL ? 'sm:justify-end' : ''}`}>
            <h3
              className="text-xl md:text-2xl font-bold text-foreground"
              style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
            >
              {profile.name}
            </h3>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/20">
              {profile.badge}
            </span>
          </div>

          <p className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {profile.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{profile.rating}</span>
            <span className="text-xs text-muted-foreground">({profile.reviews})</span>
            <span className="text-muted-foreground/40 mx-1">|</span>
            <span className="text-xs font-medium text-primary">{profile.level}</span>
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className={`mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:brightness-110 ${isRTL ? 'font-arabic' : ''}`}
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
