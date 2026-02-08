'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Ring cursor springs
  const ringXSpring = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const ringYSpring = useSpring(cursorY, { damping: 30, stiffness: 200 });

  // Trail dots springs
  const trail1XSpring = useSpring(cursorX, { damping: 35, stiffness: 150 });
  const trail1YSpring = useSpring(cursorY, { damping: 35, stiffness: 150 });
  const trail2XSpring = useSpring(cursorX, { damping: 40, stiffness: 130 });
  const trail2YSpring = useSpring(cursorY, { damping: 40, stiffness: 130 });
  const trail3XSpring = useSpring(cursorX, { damping: 45, stiffness: 110 });
  const trail3YSpring = useSpring(cursorY, { damping: 45, stiffness: 110 });

  useEffect(() => {
    // Only show on desktop
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#ff6b35] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#ff6b35]/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Cursor trail dots */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff6b35]/30 rounded-full pointer-events-none z-[9997]"
        style={{
          x: trail1XSpring,
          y: trail1YSpring,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff6b35]/30 rounded-full pointer-events-none z-[9997]"
        style={{
          x: trail2XSpring,
          y: trail2YSpring,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff6b35]/30 rounded-full pointer-events-none z-[9997]"
        style={{
          x: trail3XSpring,
          y: trail3YSpring,
        }}
      />
    </>
  );
}
