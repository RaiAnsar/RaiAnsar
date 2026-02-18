'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll progress bar — pure CSS, no framer-motion.
 * Eliminates framer-motion from mobile-critical code path.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? scrollTop / total : 0);
      setVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        background: 'linear-gradient(to right, #F2D0A4, #9945ff, #ff2d92)',
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.05s linear, opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
}
