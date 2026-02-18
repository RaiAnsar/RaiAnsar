'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function LiquidBlob() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Two spring configs for the two mouse-following blobs
  const x1 = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const y1 = useSpring(mouseY, { damping: 25, stiffness: 150 });
  const x2 = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const y2 = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Primary blob — follows mouse, CSS handles pulsing (GPU-only) */}
      <motion.div
        className="fixed w-[500px] h-[500px] pointer-events-none z-0 opacity-40 blob-pulse-primary"
        style={{
          x: x1,
          y: y1,
          background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, rgba(255,133,85,0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary blob — offset spring, CSS scale animation */}
      <motion.div
        className="fixed w-[400px] h-[400px] pointer-events-none z-0 opacity-30 blob-pulse-secondary"
        style={{
          x: x2,
          y: y2,
          background: 'radial-gradient(circle, rgba(255,133,85,0.3) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Static accent blobs — pure CSS, zero JS cost */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blob-accent-left"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 60%)',
            left: '-10%',
            top: '20%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blob-accent-right"
          style={{
            background: 'radial-gradient(circle, rgba(255,133,85,0.08) 0%, transparent 60%)',
            right: '-5%',
            bottom: '10%',
            filter: 'blur(70px)',
          }}
        />
      </div>
    </>
  );
}
