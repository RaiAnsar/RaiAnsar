'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Expertise = {
  id: string;
  title: string;
  category: string;
  description: string;
  bullets: string[];
  accentFrom: string;
  accentTo: string;
  icon: React.ReactNode;
};

const expertise: Expertise[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    category: 'Digital Experience',
    description:
      'High-performance landing pages and web apps—clean UI engineering, accessible UX, and polished interactions.',
    bullets: ['React / Next.js', 'TypeScript', 'Design Systems', 'Accessibility + UX'],
    accentFrom: '#06b6d4',
    accentTo: '#2563eb',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      </svg>
    ),
  },
  {
    id: 'backend',
    title: 'BACKEND',
    category: 'System Architecture',
    description:
      'Secure APIs and scalable services with pragmatic architecture—built for reliability, performance, and maintainability.',
    bullets: ['Node.js / Python', 'PostgreSQL', 'Redis / Caching', 'Auth + Integrations'],
    accentFrom: '#8b5cf6',
    accentTo: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-10 h-10">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    title: 'WORDPRESS',
    category: 'CMS Expertise',
    description:
      'Custom themes, plugins, migrations, and debugging—plus performance and security hardening for production sites.',
    bullets: ['Custom Themes', 'Plugin Development', 'WooCommerce', 'Speed + Security'],
    accentFrom: '#0ea5e9',
    accentTo: '#22c55e',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 9l2.5 8L12 6l2.5 11L17 9" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    title: 'E‑COMMERCE',
    category: 'Conversion Systems',
    description:
      'Checkout flows, catalog logic, performance, and integrations—engineered to convert and scale smoothly.',
    bullets: ['Stripe / Payments', 'Shipping + Tax', 'Analytics', 'SEO Foundations'],
    accentFrom: '#ec4899',
    accentTo: '#f97316',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-10 h-10">
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6l-2-3H2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'devops',
    title: 'DEVOPS',
    category: 'Deployment & Reliability',
    description:
      'Secure deployments, automation, and monitoring—so your product stays stable, fast, and easy to maintain.',
    bullets: ['Docker', 'Linux / Nginx', 'CI/CD', 'Monitoring + Backups'],
    accentFrom: '#22c55e',
    accentTo: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-10 h-10">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

function ExpertiseCard({
  item,
  index,
  total,
  progress,
  isActive,
}: {
  item: Expertise;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const radius = 620;
  const position = useTransform(progress, (v) => v * Math.max(1, total - 1));
  const offset = useTransform(position, (p) => index - p);
  const angle = useTransform(offset, (o) => (shouldReduceMotion ? 0 : o * 0.55));

  const x = useTransform(angle, (a) => Math.sin(a) * radius * 1.05);
  const z = useTransform([angle, offset], ([a, o]: number[]) => {
    return Math.cos(a) * radius - radius - Math.abs(o) * 160;
  });
  const rotateY = useTransform(angle, (a) => (-a * 180) / Math.PI);

  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs > 1.4) return 0;
    return 1 - abs / 1.4;
  });

  const scale = useTransform(offset, (o) => 1 - Math.min(0.14, Math.abs(o) * 0.06));
  const y = useTransform(offset, (o) => (shouldReduceMotion ? 0 : o * -10));

  return (
    <motion.div
      className="absolute top-24 md:top-auto w-[85vw] sm:w-[90vw] max-w-6xl h-[70vh] sm:h-[70vh] md:h-[70vh] flex flex-col lg:flex-row overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0D1117] border border-white/10 shadow-2xl origin-center"
      style={{
        opacity,
        scale,
        x,
        y,
        z,
        rotateY,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
        zIndex: isActive ? 3 : 1,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
    >
      <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
        <div
          className="inline-flex self-start items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold tracking-wider mb-4 sm:mb-6 border border-white/10"
          style={{
            background: `linear-gradient(90deg, ${item.accentFrom}33, ${item.accentTo}33)`,
          }}
        >
          <span className="opacity-90">{item.category}</span>
        </div>

        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter text-white">
          {item.title}
        </h3>

        <p className="text-base sm:text-lg md:text-xl text-white/55 leading-relaxed mb-6 sm:mb-8 md:mb-12 max-w-2xl">
          {item.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          {item.bullets.map((bullet) => (
            <div key={bullet} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-white/70">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${item.accentFrom}, ${item.accentTo})`,
                }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div>
          <a
            className="inline-flex items-center gap-3 text-base sm:text-lg font-bold transition-all duration-300 group w-fit"
            href="#contact"
            style={{ color: item.accentFrom }}
          >
            Start Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right illustration */}
      <div className="flex-1 relative hidden lg:block">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(135deg, ${item.accentFrom}, ${item.accentTo})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80">
            <motion.div
              className="absolute inset-0"
              animate={shouldReduceMotion || !isActive ? undefined : { rotate: 360 }}
              transition={
                shouldReduceMotion || !isActive
                  ? undefined
                  : { duration: 40, repeat: Infinity, ease: 'linear' }
              }
            >
              <div className="absolute inset-0 border-2 border-dashed border-white/15 rounded-full" />
              <div className="absolute inset-10 border border-white/10 rounded-full" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]"
                style={{ color: item.accentFrom }}
              >
                {item.icon}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0D1117]" />
      </div>
    </motion.div>
  );
}

function ServicesCarousel({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStart = useRef<{ x: number; y: number; time: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Hold the first/last card for a bit so users can’t “skip” past the section edges.
  const edgeHold = shouldReduceMotion ? 0 : 0.085;
  const progress = useTransform(scrollYProgress, (v) => {
    const start = edgeHold;
    const end = edgeHold;
    const range = 1 - start - end;
    if (range <= 0) return 0;
    const t = (v - start) / range;
    return Math.min(1, Math.max(0, t));
  });

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => {
      const maxIndex = Math.max(1, expertise.length - 1);
      const idx = Math.min(expertise.length - 1, Math.max(0, Math.round(v * maxIndex)));
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    });
    return () => unsubscribe();
  }, [progress]);

  const marqueeX = useTransform(progress, [0, 1], ['65%', '-65%']);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;

      const sectionTop = window.scrollY + el.getBoundingClientRect().top;
      const totalScroll = Math.max(1, el.offsetHeight - window.innerHeight);
      const maxIndex = Math.max(1, expertise.length - 1);
      const range = 1 - edgeHold - edgeHold;
      const normalized = index / maxIndex;
      const targetProgress = edgeHold + normalized * Math.max(0, range);
      const top = sectionTop + totalScroll * targetProgress;

      window.scrollTo({
        top,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    },
    [sectionRef, shouldReduceMotion, edgeHold]
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    swipeStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = swipeStart.current;
      swipeStart.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const dt = Date.now() - start.time;

      // Quick, mostly-horizontal swipe switches cards.
      if (dt > 650) return;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (absX < 56 || absX < absY * 1.2) return;

      const next = Math.min(
        expertise.length - 1,
        Math.max(0, activeIndex + (dx < 0 ? 1 : -1))
      );
      if (next !== activeIndex) scrollToIndex(next);
    },
    [activeIndex, scrollToIndex]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;
      if (key === 'ArrowRight' || key === 'ArrowDown') {
        event.preventDefault();
        scrollToIndex(Math.min(expertise.length - 1, activeIndex + 1));
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        event.preventDefault();
        scrollToIndex(Math.max(0, activeIndex - 1));
      } else if (key === 'Home') {
        event.preventDefault();
        scrollToIndex(0);
      } else if (key === 'End') {
        event.preventDefault();
        scrollToIndex(expertise.length - 1);
      }
    },
    [activeIndex, scrollToIndex]
  );

  return (
    <>
      {/* Dots nav */}
      <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-1/2 sm:-translate-x-1/2 z-50 flex items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 overflow-x-auto max-w-[calc(100vw-2rem)] sm:max-w-fit no-scrollbar">
        {expertise.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              className="relative group"
              onClick={() => scrollToIndex(index)}
              aria-label={item.title}
              aria-current={isActive ? 'true' : undefined}
            >
              <div
                className="w-3 h-3 rounded-full transition-colors"
                style={{
                  background: isActive ? item.accentFrom : 'rgba(255,255,255,0.2)',
                }}
              />
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap bg-black px-2 py-1 rounded border border-white/10">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Marquee stroke text */}
      <motion.div
        className="absolute bottom-0 h-full leading-[100vh] flex justify-center whitespace-nowrap text-[18vh] sm:text-[30vw] md:text-[38vw] font-black text-transparent select-none pointer-events-none left-0 opacity-50 sm:opacity-100"
        style={{
          x: marqueeX,
          WebkitTextStroke: '2px rgba(255, 255, 255, 0.08)',
        }}
      >
        CODE • COFFEE • <span className="text-white/10" style={{ WebkitTextStroke: '0px' }}>INNOVATION</span> • CREATIVITY •{' '}
        <span className="text-white/10" style={{ WebkitTextStroke: '0px' }}>
          PASSION •
        </span>
      </motion.div>

      {/* Cards */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
        tabIndex={0}
        role="region"
        aria-label="Expertise carousel"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {expertise.map((item, index) => {
          if (Math.abs(index - activeIndex) > 1) return null;
          return (
            <ExpertiseCard
              key={item.id}
              item={item}
              index={index}
              total={expertise.length}
              progress={progress}
              isActive={index === activeIndex}
            />
          );
        })}
      </div>
    </>
  );
}

function ServicesPlaceholder() {
  const first = expertise[0];
  if (!first) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[85vw] sm:w-[90vw] max-w-6xl h-[70vh] flex flex-col lg:flex-row overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0D1117] border border-white/10 shadow-2xl">
        <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-4">
            Expertise
          </div>
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
            {first.title}
          </div>
          <div className="text-white/55 text-lg leading-relaxed max-w-2xl">
            {first.description}
          </div>
        </div>
        <div className="flex-1 relative hidden lg:flex items-center justify-center">
          <div className="text-white/20">{first.icon}</div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [observeRef, inView] = useInView({
    rootMargin: '1200px 0px',
    triggerOnce: true,
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      observeRef(node);
    },
    [observeRef]
  );

  const sectionHeightVh = useMemo(() => Math.max(560, expertise.length * 160), []);

  return (
    <section
      ref={setRefs}
      className="relative w-full"
      id="services"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {inView ? <ServicesCarousel sectionRef={sectionRef} /> : <ServicesPlaceholder />}
      </div>
    </section>
  );
}
