import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles, Palette, Mic, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface WorkDropdownProps {
  label: string;
  className?: string;
}

const WorkDropdown = ({ label, className }: WorkDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { theme } = useTheme();

  const workItems = [
    { label: "Reels", labelAr: "ريلز", href: "#reels", icon: Film },
    { label: "Motion Graphics", labelAr: "موشن جرافيك", href: "#motion", icon: Sparkles },
    { label: "Color Grading", labelAr: "تلوين الفيديو", href: "#color-grading", icon: Palette },
    { label: "Vocal Enhance", labelAr: "تحسين الصوت", href: "#vocal-enhance", icon: Mic },
    { label: "Mixing & Sound Design", labelAr: "مكساج وتصميم صوتي", href: "#mixing", icon: Music },
  ];

  const dropdownBg = theme === 'light'
    ? 'hsl(210 20% 98% / 0.98)'
    : 'hsl(220 30% 8% / 0.98)';

  const dropdownBorder = theme === 'light'
    ? '1px solid hsl(214 20% 85% / 0.5)'
    : '1px solid hsl(195 100% 40% / 0.2)';

  const dropdownShadow = theme === 'light'
    ? '0 15px 50px -10px hsl(210 20% 50% / 0.25)'
    : '0 15px 50px -10px hsl(195 100% 50% / 0.15)';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={className}
        style={{ cursor: 'default' }}
      >
        {label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]"
          >
            <div
              className="rounded-xl p-2 min-w-[200px] backdrop-blur-xl"
              style={{
                background: dropdownBg,
                border: dropdownBorder,
                boxShadow: dropdownShadow,
              }}
            >
              {workItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const target = document.querySelector(item.href);
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon className="w-4 h-4 text-primary/70" />
                    <span>{isRTL ? item.labelAr : item.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkDropdown;
