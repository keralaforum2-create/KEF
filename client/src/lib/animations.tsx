import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 15 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -3, scale: 0.97 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const pulseGlowVariants: Variants = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.4)"
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(239, 68, 68, 0.4)",
      "0 0 20px 10px rgba(239, 68, 68, 0.2)",
      "0 0 0 0 rgba(239, 68, 68, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function ScrollFadeUp({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.25, ease: "easeOut", delay: delay * 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeDown({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.25, ease: "easeOut", delay: delay * 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeLeft({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { duration: 0.25, ease: "easeOut", delay: delay * 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeRight({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { duration: 0.25, ease: "easeOut", delay: delay * 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollScale({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.2, ease: "easeOut", delay: delay * 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.02 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.02
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.2, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSubAnimation({ children, className = "", delay = 0.1 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PulsingGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0)",
          "0 0 30px 15px rgba(239, 68, 68, 0.3)",
          "0 0 0 0 rgba(239, 68, 68, 0)"
        ]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export function RotateIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
      animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -2, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: delay * 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CardWaveProps {
  children: ReactNode;
  className?: string;
  index: number;
  baseDelay?: number;
}

export function CardWave({ children, className = "", index, baseDelay = 0 }: CardWaveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
  const waveDelay = baseDelay + (index * 0.03);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        opacity: { duration: 0.2, delay: waveDelay, ease: "easeOut" },
        y: { duration: 0.2, delay: waveDelay, ease: "easeOut" },
        scale: { duration: 0.2, delay: waveDelay, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({ children, className = "", scale = 1.05 }: { children: ReactNode; className?: string; scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const MotionDiv = motion.div;
