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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
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
    bullets: ['Docker', 'AWS / Cloud', 'CI/CD', 'Monitoring + Backups'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        <circle cx="12" cy="12" r="3" />
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
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
  const radius = 480;
  const position = useTransform(progress, (v) => v * Math.max(1, total - 1));
  const offset = useTransform(position, (p) => index - p);
  const angle = useTransform(offset, (o) => (shouldReduceMotion ? 0 : o * 0.35));

  const x = useTransform(angle, (a) => Math.sin(a) * radius * 1.1);
  const z = useTransform([angle, offset], ([a, o]: number[]) => {
    return Math.cos(a as number) * radius - radius - Math.abs(o as number) * 60;
  });
  const rotateY = useTransform(angle, (a) => (-a * 180) / Math.PI);

  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs > 2.5) return 0;
    return 1 - abs / 2.5;
  });

  const scale = useTransform(offset, (o) => 1 - Math.min(0.08, Math.abs(o) * 0.03));
  const y = useTransform(offset, (o) => (shouldReduceMotion ? 0 : o * -4));

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-4xl h-[60vh] max-h-[550px] flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-[#111] border border-white/[0.08] shadow-2xl origin-center"
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
        zIndex: isActive ? 10 : 5 - Math.abs(index),
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
    >
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center relative z-10">
        <div
          className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold tracking-wider mb-5 border border-white/[0.08]"
          style={{
            background: 'linear-gradient(90deg, rgba(255,107,53,0.15), rgba(255,133,85,0.08))',
          }}
        >
          <span className="opacity-90">{item.category}</span>
        </div>

        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tighter text-white">
          {item.title}
        </h3>

        <p className="text-base md:text-lg text-white/50 leading-relaxed mb-6 max-w-lg">
          {item.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {item.bullets.map((bullet) => (
            <div key={bullet} className="flex items-center gap-2 text-white/60 text-sm">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: 'linear-gradient(90deg, #ff6b35, #ff8555)',
                }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group w-fit hover:gap-3"
            href="#contact"
            style={{ color: '#ff6b35' }}
          >
            Start Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right illustration */}
      <div className="flex-1 relative hidden lg:block overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'linear-gradient(135deg, #ff6b35, #ff8555)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-56 h-56 xl:w-64 xl:h-64">
            <motion.div
              className="absolute inset-0"
              animate={shouldReduceMotion || !isActive ? undefined : { rotate: 360 }}
              transition={
                shouldReduceMotion || !isActive
                  ? undefined
                  : { duration: 40, repeat: Infinity, ease: 'linear' }
              }
            >
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full" />
              <div className="absolute inset-6 border border-white/10 rounded-full" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#ff6b35] drop-shadow-[0_0_30px_rgba(255,107,53,0.3)]">
                {item.icon}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111]" />
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

  // Asymmetric holds - more at end for last card
  const startHold = shouldReduceMotion ? 0 : 0.12;
  const endHold = shouldReduceMotion ? 0 : 0.28; // Much more hold at end
  
  const progress = useTransform(scrollYProgress, (v) => {
    const range = 1 - startHold - endHold;
    if (range <= 0) return 0;
    const t = (v - startHold) / range;
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

  const marqueeX = useTransform(progress, [0, 1], ['50%', '-50%']);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;

      const sectionTop = window.scrollY + el.getBoundingClientRect().top;
      const totalScroll = Math.max(1, el.offsetHeight - window.innerHeight);
      const maxIndex = Math.max(1, expertise.length - 1);
      const range = 1 - startHold - endHold;
      const normalized = index / maxIndex;
      const targetProgress = startHold + normalized * Math.max(0, range);
      const top = sectionTop + totalScroll * targetProgress;

      window.scrollTo({
        top,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    },
    [sectionRef, shouldReduceMotion, startHold, endHold]
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
      {/* Dots nav - fixed at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
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
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? '#ff6b35' : 'rgba(255,255,255,0.25)',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                }}
              />
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium whitespace-nowrap bg-[#1a1a1a] px-2 py-1 rounded border border-white/10 pointer-events-none">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Marquee stroke text */}
      <motion.div
        className="absolute bottom-0 h-full leading-[100vh] flex justify-center whitespace-nowrap text-[20vw] font-black text-transparent select-none pointer-events-none left-0 opacity-30"
        style={{
          x: marqueeX,
          WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.05)',
        }}
      >
        CODE • CREATE • CONQUER • DEPLOY • SCALE •
      </motion.div>

      {/* Cards */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        tabIndex={0}
        role="region"
        aria-label="Expertise carousel"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {expertise.map((item, index) => (
          <ExpertiseCard
            key={item.id}
            item={item}
            index={index}
            total={expertise.length}
            progress={progress}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </>
  );
}

function ServicesPlaceholder() {
  const first = expertise[0];
  if (!first) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[88vw] max-w-4xl h-[60vh] max-h-[550px] flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-[#111] border border-white/[0.08] shadow-2xl">
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
          <div className="text-xs font-medium tracking-widest uppercase text-white/40 mb-4">
            {first.category}
          </div>
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
            {first.title}
          </div>
          <div className="text-white/50 text-lg leading-relaxed max-w-lg">
            {first.description}
          </div>
        </div>
        <div className="flex-1 relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#ff6b35]/10 to-transparent">
          <div className="text-[#ff6b35]/30">{first.icon}</div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [observeRef, inView] = useInView({
    rootMargin: '1000px 0px',
    triggerOnce: true,
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      observeRef(node);
    },
    [observeRef]
  );

  // Much more height - 220vh per card for very generous viewing time
  const sectionHeightVh = useMemo(() => Math.max(900, expertise.length * 220), []);

  return (
    <section
      ref={setRefs}
      className="relative w-full bg-[#0a0a0a]"
      id="services"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {inView ? <ServicesCarousel sectionRef={sectionRef} /> : <ServicesPlaceholder />}
      </div>
    </section>
  );
}
