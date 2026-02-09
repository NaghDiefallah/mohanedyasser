import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import ProfileCard from './ProfileCard';

const About = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();

  const cardBg = theme === 'light'
    ? 'hsl(210 20% 96% / 0.6)'
    : 'hsl(220 30% 10% / 0.6)';

  const cardBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.5)'
    : '1px solid hsl(195 100% 40% / 0.15)';

  return (
    <div className="py-20 md:py-32 px-6 sm:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-primary font-bold uppercase mb-4">
            {t.about.label}
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif" }}
          >
            <span className="text-foreground">{t.about.title} </span>
            <span className="text-primary">{t.about.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Bio text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-14 md:mb-20 ${isRTL ? 'font-arabic' : ''}`}
        >
          {t.about.bio}
        </motion.p>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14 md:mb-20"
        >
          <ProfileCard />
        </motion.div>



      </div>
    </div>
  );
};

export default About;
