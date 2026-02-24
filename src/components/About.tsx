import { useLanguage } from '@/contexts/LanguageContext';
import ProfileCard from './ProfileCard';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-20 md:py-32 px-6 sm:px-8">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal className="text-center mb-8 md:mb-10 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {t.about.title} {t.about.titleHighlight}
            </span>
            <div className="h-px w-8 md:w-12 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-foreground uppercase tracking-tight">
            {t.about.title} <span className="text-primary">{t.about.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        {/* Profile Card */}
        <div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default About;
