'use client';

import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface ScrollVelocityProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocity({ children, className = '' }: ScrollVelocityProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map velocity to skew
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);
  const skewY = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        skewX,
        skewY,
      }}
    >
      {children}
    </motion.div>
  );
}
