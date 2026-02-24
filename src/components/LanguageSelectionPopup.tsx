import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelectionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();
  const hasOpened = useRef(false);

  useEffect(() => {
    // Check if user has already selected a language
    const hasSelectedLanguage = localStorage.getItem('language-selected');
    if (hasSelectedLanguage) return;

    const openOnce = () => {
      if (hasOpened.current) return;
      hasOpened.current = true;
      setIsOpen(true);
      window.removeEventListener('pointerdown', openOnce);
      window.removeEventListener('keydown', openOnce);
      window.removeEventListener('touchstart', openOnce);
    };

    window.addEventListener('pointerdown', openOnce, { once: true });
    window.addEventListener('keydown', openOnce, { once: true });
    window.addEventListener('touchstart', openOnce, { once: true });

    return () => {
      window.removeEventListener('pointerdown', openOnce);
      window.removeEventListener('keydown', openOnce);
      window.removeEventListener('touchstart', openOnce);
    };
  }, []);

  const handleSelectLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('language-selected', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
            className="fixed z-[100] inset-0 flex items-center justify-center p-4"
          >
            <div 
              className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -12px hsl(var(--primary) / 0.3)',
              }}
            >
              {/* Header */}
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Globe className="w-8 h-8 text-primary" />
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-bold text-foreground mb-2"
                >
                  Choose Your Language
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  اختر لغتك المفضلة
                </motion.p>
              </div>

              {/* Language Options */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-4">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleSelectLanguage('en')}
                  className="group relative p-6 rounded-xl border-2 border-border bg-secondary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">🇺🇸</div>
                  <div className="text-lg font-semibold text-foreground">English</div>
                  <div className="text-sm text-muted-foreground">Continue in English</div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleSelectLanguage('ar')}
                  className="group relative p-6 rounded-xl border-2 border-border bg-secondary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">🇸🇦</div>
                  <div className="text-lg font-semibold text-foreground">العربية</div>
                  <div className="text-sm text-muted-foreground">المتابعة بالعربية</div>
                </motion.button>
              </div>

              {/* Footer hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="px-6 pb-6 text-center"
              >
                <p className="text-xs text-muted-foreground/60">
                  You can change this later in settings • يمكنك تغيير هذا لاحقاً من الإعدادات
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelectionPopup;
