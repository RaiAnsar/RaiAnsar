'use client';

import { useEffect, useRef, useState } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextScramble({ text, className = '', delay = 0 }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hasAnimated) return;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setHasAnimated(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [visible, text, delay, hasAnimated]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-50'} ${className}`}
    >
      {displayText}
    </span>
  );
}
