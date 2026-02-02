import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();

  const navLinks = [
    { label: t.nav.work, href: "#work" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at top, hide when scrolling down
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
    : 'hsl(220 30% 8% / 0.95)';
  
  const navBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.5)'
    : '1px solid hsl(220 20% 20% / 0.5)';
  
  const navShadow = theme === 'light'
    ? '0 10px 40px -10px hsl(210 20% 50% / 0.2)'
    : '0 10px 40px -10px hsl(220 30% 5% / 0.5)';

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div 
        className="container mx-auto max-w-7xl rounded-lg px-6 py-3 backdrop-blur-xl"
        style={{
          background: navBg,
          border: navBorder,
          boxShadow: navShadow,
        }}
      >
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src={logoImage} alt="Logo" className="h-8 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              size="sm" 
              className="font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
              style={{
                boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
              }}
            >
              {t.nav.letsTalk}
            </Button>
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
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 uppercase tracking-wider"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button 
                  size="sm" 
                  className="w-full mt-2 font-bold uppercase tracking-wider bg-primary text-primary-foreground"
                  style={{
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
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
