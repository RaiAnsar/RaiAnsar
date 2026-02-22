'use client';

import { useEffect, useState } from 'react';

/**
 * Back-to-top button — pure CSS transitions, no framer-motion.
 * Eliminates framer-motion from mobile-critical code path.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#38bdf8] hover:border-[#38bdf8]/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
