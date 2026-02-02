import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

// Optimized text animation - word-level for better performance
const AnimatedText = ({ 
  text, 
  className = "", 
  delay = 0, 
  style 
}: AnimatedTextProps) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      style={style}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedText;
