import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, Languages, X, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const SettingsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      {/* Settings trigger button - fixed position */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/90 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.2)',
        }}
        aria-label="Open settings"
      >
        <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.button>

      {/* Popup overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed z-50 bottom-20 right-6 w-72 rounded-xl bg-card border border-border shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">{t.settings.theme}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Theme Section */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    {t.settings.theme}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        theme === 'light'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.settings.light}</span>
                      {theme === 'light' && <Check className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.settings.dark}</span>
                      {theme === 'dark' && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Language Section */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-2">
                    <Languages className="w-3 h-3" />
                    {t.settings.language}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        language === 'en'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{t.settings.english}</span>
                      {language === 'en' && <Check className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => setLanguage('ar')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        language === 'ar'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{t.settings.arabic}</span>
                      {language === 'ar' && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPopup;
