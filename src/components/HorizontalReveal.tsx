import { motion } from "motion/react";
import { ReactNode } from "react";

interface HorizontalRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  width?: string;
}

const HorizontalReveal = ({ children, className = "", delay = 0, width = "100%" }: HorizontalRevealProps) => {
  const variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { 
      clipPath: "inset(0 0 0 0)", 
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalReveal;
