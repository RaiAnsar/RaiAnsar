'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
  springConfig?: { damping: number; stiffness: number };
}

export function Spotlight({
  children,
  className = '',
  size = 600,
  color = 'rgba(0, 255, 240, 0.06)',
  springConfig = { damping: 30, stiffness: 200 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight gradient layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
        style={{
          background: `radial-gradient(${size}px circle at ${spotlightX.get()}px ${spotlightY.get()}px, ${color}, transparent 50%)`,
        }}
      />

      {/* Children with higher z-index */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Alternative: Card-level spotlight for individual cards
interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function CardSpotlight({
  children,
  className = '',
  color = 'rgba(255, 255, 255, 0.06)',
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      style={
        {
          '--spotlight-color': color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
