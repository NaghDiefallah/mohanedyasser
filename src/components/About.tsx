import { useLanguage } from '@/contexts/LanguageContext';
import ProfileCard from './ProfileCard';

const About = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-20 md:py-32 px-6 sm:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Section label with decorative lines */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-xs tracking-[0.3em] text-primary font-bold uppercase">
              {t.about.label}
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
          >
            <span className="text-foreground">{t.about.title} </span>
            <span className="text-primary">{t.about.titleHighlight}</span>
          </h2>
        </div>

        {/* Profile Card */}
        <div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default About;
