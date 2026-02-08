import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Custom icons for WhatsApp and Behance
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.85 1.973 2.403 1.973.806 0 1.595-.29 1.973-.988h3.38zm-4.27-3.886c-.089-.79-.552-1.696-1.882-1.696-1.363 0-1.866.846-1.994 1.696h3.876zM8.071 10.686c.934 0 1.607-.494 1.607-1.442 0-.985-.718-1.372-1.607-1.372H4.59v2.814h3.481zm.194 4.848c.989 0 1.756-.548 1.756-1.652 0-1.104-.767-1.652-1.756-1.652H4.59v3.304h3.675zM0 5h4.91c2.38 0 4.09 1.048 4.09 3.49 0 1.26-.576 2.19-1.609 2.79v.066c1.486.42 2.276 1.674 2.276 3.153 0 2.727-2.178 3.961-4.688 3.961H0V5z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Contact = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();

  const contactLinks = [
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      handle: '@MohanedYasser',
      href: 'https://instagram.com/MohanedYasser',
    },
    {
      icon: <FacebookIcon />,
      label: 'Facebook',
      handle: 'Mohaned Yasser',
      href: 'https://facebook.com/MohanedYasser',
    },
    {
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      handle: '+20 123 456 7890',
      href: 'https://wa.me/201234567890',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      handle: 'contact@mohanedyasser.com',
      href: 'mailto:contact@mohanedyasser.com',
    },
  ];

  const bgStyle = theme === 'light'
    ? 'hsl(220 25% 12%)'
    : 'hsl(220 30% 8%)';

  return (
    <footer id="contact" className="relative mt-12 md:mt-20">
      {/* Top accent line */}
      <div 
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.6) 50%, transparent 100%)',
        }}
      />
      
      {/* Main footer content */}
      <motion.div
        className="py-10 md:py-16 px-4 sm:px-6"
        style={{ background: bgStyle }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Left side - Contact section */}
            <motion.div 
              className={`flex flex-col items-center md:items-start gap-6 ${isRTL ? 'md:items-end' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Contact header with underline */}
              <div className="relative">
                <h3 
                  className="text-lg font-semibold text-white/90 mb-1"
                  style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
                >
                  {t.contact.header}
                </h3>
                <div 
                  className="h-0.5 w-full"
                  style={{
                    background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 100%)',
                  }}
                />
              </div>

              {/* Social icons */}
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {contactLinks.map((link, index) => (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-white/20 text-white/70 bg-white/5 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        whileHover={{ 
                          scale: 1.15,
                          borderColor: 'hsl(195 100% 50%)',
                          color: 'hsl(195 100% 50%)',
                          boxShadow: '0 0 25px -3px hsl(195 100% 50% / 0.5)',
                        }}
                      >
                        {link.icon}
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="bg-card/95 backdrop-blur-xl border-primary/30 text-foreground"
                    >
                      <p className="font-medium">{link.handle}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>

            {/* Right side - Brand info */}
            <motion.div 
              className={`flex flex-col items-center md:items-end gap-3 ${isRTL ? 'md:items-start' : ''}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Brand name with accent */}
              <h2 
                className="text-2xl md:text-3xl font-bold"
                style={{ 
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "'Bebas Neue', sans-serif",
                  letterSpacing: isRTL ? '0' : '0.05em'
                }}
              >
                <span className="text-white/90">{isRTL ? 'مهند' : 'MOHANED'}</span>
                <span className="text-primary">{isRTL ? ' ياسر' : ' YASSER'}</span>
              </h2>
              
              {/* Tagline */}
              <p className="text-sm text-white/50 text-center md:text-right max-w-xs" style={{ textAlign: isRTL ? 'left' : 'right' }}>
                {t.contact.tagline}
              </p>
            </motion.div>
          </div>

          {/* Bottom copyright */}
          <motion.div 
            className="mt-12 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-center text-sm text-white/40">
              © 2026 <span className="text-primary font-medium">Mohaned Yasser</span>. {t.contact.copyright}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Contact;
