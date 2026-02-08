import { ReactNode } from "react";

interface ViewportRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

// Static wrapper — no scroll animations
const ViewportReveal = ({ 
  children, 
  className = "", 
}: ViewportRevealProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ViewportReveal;