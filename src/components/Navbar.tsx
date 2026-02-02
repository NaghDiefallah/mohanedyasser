import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t.nav.work, href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.skills, href: "#skills" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navBg = theme === 'light' 
    ? 'hsl(210 20% 98% / 0.95)' 
    : 'hsl(220 30% 6% / 0.95)';
  
  const navBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.5)'
    : '1px solid hsl(195 100% 40% / 0.2)';
  
  const navShadow = theme === 'light'
    ? '0 10px 40px -10px hsl(210 20% 50% / 0.2)'
    : '0 10px 40px -10px hsl(195 100% 50% / 0.15)';

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4"
    >
      <div 
        className="container mx-auto max-w-7xl rounded-lg px-4 md:px-6 py-2.5 md:py-3 backdrop-blur-xl"
        style={{
          background: navBg,
          border: navBorder,
          boxShadow: navShadow,
        }}
      >
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left - Theme & Language Toggles */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-all duration-300 text-sm font-bold"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-foreground font-bold">
                {language === 'ar' ? 'EN' : 'AR'}
              </span>
            </button>
          </div>

          {/* Center - Navigation Links */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - CTA Button with Pulse Glow */}
          <div className="hidden md:block">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px hsl(195 100% 50% / 0.4), 0 0 40px hsl(195 100% 50% / 0.2)',
                  '0 0 30px hsl(195 100% 50% / 0.6), 0 0 60px hsl(195 100% 50% / 0.35)',
                  '0 0 20px hsl(195 100% 50% / 0.4), 0 0 40px hsl(195 100% 50% / 0.2)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-md"
            >
              <Button 
                size="sm" 
                className="font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 px-6"
              >
                {t.nav.letsTalk}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`pt-4 pb-2 flex flex-col gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-2 uppercase tracking-[0.2em]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button 
                  size="sm" 
                  className="w-full mt-2 font-bold uppercase tracking-wider bg-primary text-primary-foreground"
                  style={{
                    boxShadow: '0 0 25px hsl(195 100% 50% / 0.5)',
                  }}
                >
                  {t.nav.letsTalk}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
