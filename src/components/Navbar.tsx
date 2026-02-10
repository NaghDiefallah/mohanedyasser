import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import WorkDropdown from "@/components/WorkDropdown";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.about, href: "#about" },
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
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4"
    >
      <div 
        className="container mx-auto max-w-7xl rounded-lg px-3 sm:px-4 md:px-6 py-2 md:py-3 backdrop-blur-xl"
        style={{
          background: navBg,
          border: navBorder,
          boxShadow: navShadow,
        }}
      >
        <div className="flex items-center justify-between">
          {/* LEFT side: In LTR = Toggles, In RTL = CTA */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {isRTL ? (
              // RTL: CTA on LEFT (appears on right visually)
              <div
                className="rounded-md"
                style={{
                  boxShadow: '0 0 15px hsl(195 100% 50% / 0.25), 0 0 30px hsl(195 100% 50% / 0.1)',
                }}
              >
                <Button 
                  size="sm" 
                  className="font-bold font-arabic tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 px-4 lg:px-6 text-xs lg:text-sm"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t.nav.letsTalk}
                </Button>
              </div>
            ) : (
              // LTR: Toggles on LEFT
              <>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  ) : (
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                  )}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-secondary/50 transition-all duration-300 text-xs sm:text-sm font-bold"
                  aria-label="Toggle language"
                >
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-foreground font-bold">AR</span>
                </button>
              </>
            )}
          </div>

          {/* CENTER - Navigation Links (Desktop only) */}
          <div className={`hidden md:flex items-center gap-6 lg:gap-8 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
            {navLinks.map((link) => {
              const linkClass = "text-xs lg:text-sm font-bold text-muted-foreground hover:text-primary transition-colors duration-200 tracking-[0.15em] lg:tracking-[0.2em]";
              
              if (link.href === "#work") {
                return (
                  <WorkDropdown
                    key={link.label}
                    label={link.label}
                    className={linkClass}
                  />
                );
              }
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={linkClass}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* RIGHT side: In LTR = CTA, In RTL = Toggles */}
          <div className="hidden md:flex items-center gap-2">
            {isRTL ? (
              // RTL: Toggles on RIGHT
              <>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-secondary/50 transition-all duration-300 text-xs sm:text-sm font-bold"
                  aria-label="Toggle language"
                >
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-foreground font-bold">EN</span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  ) : (
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                  )}
                </button>
              </>
            ) : (
              // LTR: CTA on RIGHT
              <div
                className="rounded-md"
                style={{
                  boxShadow: '0 0 15px hsl(195 100% 50% / 0.25), 0 0 30px hsl(195 100% 50% / 0.1)',
                }}
              >
                <Button 
                  size="sm" 
                  className="font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 px-4 lg:px-6 text-xs lg:text-sm"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t.nav.letsTalk}
                </Button>
              </div>
            )}
          </div>


          {/* Mobile: Toggles + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-primary" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 rounded-lg hover:bg-secondary/50 text-xs font-bold"
              aria-label="Toggle language"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
            
            <button
              className="p-1.5 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
              <div className={`pt-4 pb-2 flex flex-col gap-3 ${isRTL ? 'items-end' : 'items-start'}`}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-2 tracking-[0.15em]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button 
                  size="sm" 
                  className="w-full mt-2 font-bold uppercase tracking-wider bg-primary text-primary-foreground py-5"
                  style={{
                    boxShadow: '0 0 15px hsl(195 100% 50% / 0.25), 0 0 30px hsl(195 100% 50% / 0.1)',
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
