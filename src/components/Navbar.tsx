import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo.jpg";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div 
            className="container mx-auto max-w-7xl rounded-lg px-6 py-3 backdrop-blur-xl"
            style={{
              background: 'hsl(202 75% 12% / 0.95)',
              border: '1px solid hsl(202 50% 25% / 0.5)',
              boxShadow: '0 10px 40px -10px hsl(202 75% 5% / 0.5)',
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center">
                <img src={logoImage} alt="Logo" className="h-8 w-auto" />
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
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

              {/* CTA Button - Neon Green styling */}
              <div className="hidden md:block">
                <Button 
                  size="sm" 
                  className="font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
                  style={{
                    boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
                  }}
                >
                  Let's Talk
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
                  <div className="pt-4 pb-2 flex flex-col gap-4">
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
                      Let's Talk
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
