import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ViewportRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

// Premium viewport reveal with unblur + scale effect
const ViewportReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
  y = 40
}: ViewportRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y,
        scale: 0.95,
        filter: "blur(8px)"
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default ViewportReveal;
