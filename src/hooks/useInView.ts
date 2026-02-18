'use client';

import { useState, useRef, useEffect, type RefObject } from 'react';

/**
 * Lightweight useInView hook using IntersectionObserver.
 * Replaces framer-motion's useInView to eliminate it from the shared bundle.
 */
export function useInView<T extends Element>(
  options?: IntersectionObserverInit & { once?: boolean }
): [RefObject<T | null>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { once = true, ...ioOptions } = options ?? {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, ioOptions);

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
