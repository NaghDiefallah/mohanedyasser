import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide footer when navbar appears (after 100px scroll)
      setIsVisible(scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="sticky bottom-0 left-0 right-0 z-50"
        >
          {/* Gradient fade */}
          <div className="h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          
          {/* Footer content */}
          <div className="bg-background/80 backdrop-blur-xl border-t border-border/50 py-4 px-6">
            <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left - Branding */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">MOHANED YASER</span>
                <span className="text-muted-foreground text-sm hidden sm:block">© 2025</span>
              </div>

              {/* Center - Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Right - CTA */}
              <Button variant="glow" size="default" className="gap-2">
                <Mail className="w-4 h-4" />
                Let's Talk
              </Button>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default StickyFooter;
