'use client';

import { useEffect, useState } from 'react';

export function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const link = document.getElementById('skip-link');
    if (link) {
      link.addEventListener('focus', handleFocus);
      link.addEventListener('blur', handleBlur);
      return () => {
        link.removeEventListener('focus', handleFocus);
        link.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  return (
    <a
      id="skip-link"
      href="#main-content"
      className={`
        fixed top-4 left-4 z-[10000] px-4 py-3 rounded-lg
        bg-[#38bdf8] text-[#030712] font-semibold text-sm
        transition-all duration-200
        ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
    >
      Skip to main content
    </a>
  );
}
