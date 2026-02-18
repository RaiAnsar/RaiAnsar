'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';

type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  pills: string[];
  accent: string;
  accentRgb: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    category: 'Digital Experience',
    description:
      'High-performance landing pages and web apps — clean UI engineering, accessible UX, and polished interactions that convert.',
    pills: ['React / Next.js', 'TypeScript', 'Design Systems', 'Accessibility'],
    accent: '#ff6b35',
    accentRgb: '255,107,53',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    category: 'CMS Expertise',
    description:
      'Custom themes, plugins, migrations, and debugging — plus performance and security hardening for production sites.',
    pills: ['Custom Themes', 'Plugin Dev', 'WooCommerce', 'Speed + Security'],
    accent: '#3b82f6',
    accentRgb: '59,130,246',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 9l2.5 8L12 6l2.5 11L17 9" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    category: 'Conversion Systems',
    description:
      'Checkout flows, catalog logic, performance, and integrations — engineered to convert and scale smoothly.',
    pills: ['Stripe / Payments', 'Shipping + Tax', 'Analytics', 'SEO'],
    accent: '#10b981',
    accentRgb: '16,185,129',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full" aria-hidden="true">
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6l-2-3H2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'devops',
    title: 'DevOps',
    category: 'Deployment & Reliability',
    description:
      'Secure deployments, automation, and monitoring — so your product stays stable, fast, and easy to maintain.',
    pills: ['Docker', 'AWS / Cloud', 'CI/CD', 'Monitoring'],
    accent: '#8b5cf6',
    accentRgb: '139,92,246',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'backend',
    title: 'Backend',
    category: 'System Architecture',
    description:
      'Secure APIs and scalable services with pragmatic architecture — built for reliability, performance, and maintainability.',
    pills: ['Node.js / Python', 'PostgreSQL', 'Redis / Caching', 'Auth + APIs'],
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
];

/**
 * Clou.ch-style sticky stacking card.
 * Structure: 200vh frame (relative) → sticky card (top: 10vh, 80vh tall).
 * Each card sticks at the same top. The next card (higher z-index) slides up
 * from below and covers the current card. As the current card gets covered,
 * it scales down to 0.85 for a depth/parallax effect.
 * Background is fully opaque so covered cards are completely hidden.
 */
function ClouCard({ service, index, isLast }: { service: Service; index: number; isLast: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start start', 'end start'],
  });

  // Subtle scale down during second half of scroll (when next card is covering this one)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.3]);

  return (
    <div
      ref={frameRef}
      className="relative"
      style={{
        height: isLast ? '90vh' : '200vh',
        marginBottom: isLast ? undefined : '-100vh',
      }}
    >
      <div
        className="sticky"
        style={{
          top: '10vh',
          height: '90vh',
          zIndex: index + 1,
        }}
      >
        {/* Scale + fade wrapper — inner card shrinks while sticky container stays full-size */}
        <motion.div
          className="relative overflow-hidden rounded-2xl h-full group cursor-default"
          style={{
            background: '#0c0c0c',
            border: `1px solid rgba(${service.accentRgb},0.2)`,
            boxShadow: `0 30px 80px -20px rgba(0,0,0,0.9), inset 0 1px 0 rgba(${service.accentRgb},0.1)`,
            scale: isLast ? undefined : scale,
            opacity: isLast ? undefined : opacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        >
          {/* Accent gradient overlay on top of solid bg */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(160deg, rgba(${service.accentRgb},0.15) 0%, transparent 35%)`,
            }}
          />

          <div className="relative z-10 grid md:grid-cols-5 gap-6 p-8 md:p-12 lg:p-16 h-full">
            {/* Left content - 3 cols */}
            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                {/* Pills row */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium border"
                      style={{
                        color: `rgba(${service.accentRgb},0.9)`,
                        borderColor: `rgba(${service.accentRgb},0.25)`,
                        background: `rgba(${service.accentRgb},0.08)`,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Category */}
                <p
                  className="text-sm font-semibold tracking-[0.15em] uppercase mb-6"
                  style={{ color: service.accent }}
                >
                  {service.category}
                </p>

                {/* Description */}
                <p className="text-base md:text-lg text-white/45 leading-relaxed max-w-xl">
                  {service.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link hover:gap-3"
                  style={{ color: service.accent }}
                >
                  Start Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover/link:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right illustration area - 2 cols */}
            <div className="md:col-span-2 relative hidden md:flex items-center justify-center">
              <div className="relative w-56 h-56 lg:w-72 lg:h-72">
                {/* Outer glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: `radial-gradient(circle, rgba(${service.accentRgb},0.25) 0%, transparent 70%)`,
                  }}
                />
                {/* Circle border with orbiting dot */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid rgba(${service.accentRgb},0.18)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{
                      background: service.accent,
                      boxShadow: `0 0 14px rgba(${service.accentRgb},0.7)`,
                    }}
                  />
                </motion.div>
                {/* Inner dashed circle */}
                <div
                  className="absolute inset-8 lg:inset-10 rounded-full"
                  style={{ border: `1px dashed rgba(${service.accentRgb},0.12)` }}
                />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 lg:w-20 lg:h-20 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      color: service.accent,
                      filter: `drop-shadow(0 0 30px rgba(${service.accentRgb},0.4))`,
                    }}
                  >
                    {service.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background number watermark */}
          <div
            className="absolute -bottom-10 -right-4 text-[14rem] md:text-[18rem] font-black leading-none pointer-events-none select-none"
            style={{
              WebkitTextStroke: `1px rgba(${service.accentRgb},0.06)`,
              color: 'transparent',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Hover glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, rgba(${service.accentRgb},0.1) 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.02 });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      id="services"
    >
      <div className="container relative z-10 pt-24 md:pt-32">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ff6b35] text-xs font-semibold tracking-[0.25em] uppercase">
              <TextScramble text="// Services" delay={0} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4"
          >
            <TextScramble text="What I build" delay={150} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-lg tracking-wide max-w-2xl"
          >
            End-to-end expertise across the full stack, from pixel-perfect frontends to bulletproof infrastructure.
          </motion.p>
        </div>
      </div>

      {/* Full-width stacking cards area */}
      <div className="relative px-4 md:px-8 lg:px-12">
        {services.map((service, index) => (
          <ClouCard
            key={service.id}
            service={service}
            index={index}
            isLast={index === services.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
