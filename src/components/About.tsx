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

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20"
        >
          {t.about.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 py-6 md:py-8 rounded-xl backdrop-blur-md"
              style={{
                background: cardBg,
                border: cardBorder,
              }}
            >
              <span
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </span>
              <span className={`text-sm text-muted-foreground font-medium tracking-wide ${isRTL ? 'font-arabic' : 'uppercase'}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {t.about.skills.map((skill, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium text-foreground/80 backdrop-blur-md transition-colors duration-200 hover:text-primary hover:border-primary/40 ${isRTL ? 'font-arabic' : ''}`}
              style={{
                background: cardBg,
                border: cardBorder,
              }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
