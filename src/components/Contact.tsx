import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Custom icons for WhatsApp and Behance
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.85 1.973 2.403 1.973.806 0 1.595-.29 1.973-.988h3.38zm-4.27-3.886c-.089-.79-.552-1.696-1.882-1.696-1.363 0-1.866.846-1.994 1.696h3.876zM8.071 10.686c.934 0 1.607-.494 1.607-1.442 0-.985-.718-1.372-1.607-1.372H4.59v2.814h3.481zm.194 4.848c.989 0 1.756-.548 1.756-1.652 0-1.104-.767-1.652-1.756-1.652H4.59v3.304h3.675zM0 5h4.91c2.38 0 4.09 1.048 4.09 3.49 0 1.26-.576 2.19-1.609 2.79v.066c1.486.42 2.276 1.674 2.276 3.153 0 2.727-2.178 3.961-4.688 3.961H0V5z"/>
  </svg>
);

const Contact = () => {
  const { t, isRTL } = useLanguage();
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Magnetic effect for "Let's Talk" button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleButtonMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const contactLinks = [
    {
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      handle: '+20 123 456 7890',
      href: 'https://wa.me/201234567890',
    },
    {
      icon: <BehanceIcon />,
      label: 'Behance',
      handle: '@MohanedYasser',
      href: 'https://behance.net/MohanedYasser',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      handle: 'contact@mohanedyasser.com',
      href: 'mailto:contact@mohanedyasser.com',
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
          style={{
            background: 'hsl(var(--card) / 0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          animate={{
            boxShadow: [
              '0 0 40px -10px hsl(var(--primary) / 0.3), inset 0 0 0 1px hsl(var(--primary) / 0.2)',
              '0 0 60px -10px hsl(var(--primary) / 0.4), inset 0 0 0 1px hsl(var(--primary) / 0.3)',
              '0 0 40px -10px hsl(var(--primary) / 0.3), inset 0 0 0 1px hsl(var(--primary) / 0.2)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Header */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Bebas Neue, sans-serif', letterSpacing: isRTL ? '0' : '0.05em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t.contact.header}
            </motion.h2>

            {/* Sub-header with magnetic effect */}
            <motion.div
              ref={buttonRef}
              className="inline-block cursor-pointer mb-12"
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              style={{ x, y }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.span
                className="text-2xl md:text-3xl font-semibold text-primary inline-block"
                style={{
                  textShadow: '0 0 30px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--primary) / 0.3)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: '0 0 40px hsl(var(--primary) / 0.7), 0 0 80px hsl(var(--primary) / 0.5)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {t.contact.subHeader}
              </motion.span>
            </motion.div>

            {/* Contact Icons */}
            <motion.div
              className="flex items-center justify-center gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {contactLinks.map((link, index) => (
                <Tooltip key={link.label}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-4 rounded-full border border-primary/30 text-foreground/80 transition-colors duration-300"
                      style={{
                        background: 'hsl(var(--card) / 0.5)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={{ 
                        scale: 1.2,
                        borderColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary))',
                        boxShadow: '0 0 30px -5px hsl(var(--primary) / 0.5), 0 0 60px -10px hsl(var(--primary) / 0.3)',
                      }}
                    >
                      {link.icon}
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-card/90 backdrop-blur-xl border-primary/30 text-foreground"
                  >
                    <p className="font-medium">{link.handle}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </div>

          {/* Decorative gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
