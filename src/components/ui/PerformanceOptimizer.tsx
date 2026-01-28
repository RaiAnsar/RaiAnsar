'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * PerformanceOptimizer Component
 * 
 * Provides advanced performance optimizations:
 * - Reduces motion for users who prefer it
 * - Pauses animations when not in viewport
 * - Debounces scroll events
 * - Uses requestAnimationFrame for smooth animations
 */

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Check for low-end devices
    const checkPerformance = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory || 4;
      const connection = (navigator as { connection?: { effectiveType?: string } }).connection;

      // Enable low performance mode for devices with limited resources
      const isLowEnd = Boolean(
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2 ||
        (connection && connection.effectiveType && connection.effectiveType.includes('2g'))
      );

      setIsLowPerformanceMode(isLowEnd);
    };

    checkPerformance();
  }, []);

  // Debounced scroll handler
  const createDebouncedScrollHandler = (callback: () => void, delay: number = 16) => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(callback, delay);
    };
  };

  // RequestAnimationFrame wrapper
  const createRAFHandler = (callback: () => void) => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(callback);
    };
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      data-reduced-motion={prefersReducedMotion}
      data-low-performance={isLowPerformanceMode}
      className="performance-optimizer"
    >
      {children}
    </div>
  );
}

/**
 * Hook for optimized scroll handling
 */
export function useOptimizedScroll(callback: () => void, delay: number = 16) {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(callback, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [callback, delay]);
}

/**
 * Hook for RAF-based animations
 */
export function useRAF(callback: () => void, dependencies: unknown[] = []) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const run = () => {
      callback();
      rafRef.current = requestAnimationFrame(run);
    };

    rafRef.current = requestAnimationFrame(run);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, dependencies);
}

/**
 * Hook for visibility-based rendering
 */
export function useVisibilityBasedRendering(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { elementRef, isVisible };
}
