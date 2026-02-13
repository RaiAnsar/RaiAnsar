'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { allTestimonials, type Testimonial } from '@/data/testimonials';

type PlatformFilter = 'All' | 'Upwork' | 'Fiverr';

const CARDS_PER_PAGE = 6;

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-yellow-400"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function PlatformChip({ platform }: { platform: 'Upwork' | 'Fiverr' }) {
  const isUpwork = platform === 'Upwork';
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
      style={{
        background: isUpwork
          ? 'rgba(20, 168, 0, 0.12)'
          : 'rgba(255, 107, 53, 0.12)',
        color: isUpwork ? '#4caf50' : '#ff8555',
        border: `1px solid ${isUpwork ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 133, 85, 0.2)'}`,
      }}
    >
      {platform}
    </span>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const truncated =
    testimonial.quote.length > 150
      ? testimonial.quote.slice(0, 150).trimEnd() + '...'
      : testimonial.quote;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative flex flex-col justify-between rounded-2xl p-6 transition-colors duration-300 hover:border-[#ff6b35]/20"
      style={{
        background: '#161616',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Stars + Platform */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <PlatformChip platform={testimonial.platform} />
      </div>

      {/* Quote */}
      <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5 flex-1">
        &ldquo;{truncated}&rdquo;
      </p>

      {/* Name */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,133,85,0.12))',
            border: '1px solid rgba(255,107,53,0.2)',
          }}
        >
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-white text-sm font-medium truncate">
          {testimonial.name}
        </span>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [activeFilter, setActiveFilter] = useState<PlatformFilter>('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Filter testimonials
  const filtered = useMemo(() => {
    if (activeFilter === 'All') return allTestimonials;
    return allTestimonials.filter((t) => t.platform === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);

  // Current page items
  const pageItems = useMemo(() => {
    const start = currentPage * CARDS_PER_PAGE;
    return filtered.slice(start, start + CARDS_PER_PAGE);
  }, [filtered, currentPage]);

  // Auto-play every 5s, pause on hover
  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, totalPages]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goNext = useCallback(() => {
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const filters: PlatformFilter[] = ['All', 'Upwork', 'Fiverr'];

  const stats = [
    { value: '25+', label: 'Five-Star Reviews' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '80%', label: 'Repeat Clients' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
      id="testimonials"
      role="region"
      aria-label="Testimonials section"
    >
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,53,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ff6b35] text-xs font-semibold tracking-[0.25em] uppercase">
              <TextScramble text="// Testimonials" delay={0} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4"
          >
            <TextScramble text="Client voices" delay={150} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6b6b6b] text-lg tracking-wide max-w-md mx-auto"
          >
            Real feedback from clients across platforms.
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
                style={{
                  background: isActive
                    ? '#ff6b35'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#ffffff' : '#a0a0a0',
                  border: `1px solid ${isActive ? '#ff6b35' : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: isActive
                    ? '0 4px 20px rgba(255,107,53,0.25)'
                    : 'none',
                }}
              >
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {pageItems.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${testimonial.quote.slice(0, 20)}-${index}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={goPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:border-[#ff6b35]/40"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              aria-label="Previous page"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a0a0a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const isActiveDot = i === currentPage;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToPage(i)}
                    className="transition-all duration-300"
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={isActiveDot ? 'true' : undefined}
                  >
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: isActiveDot ? 24 : 8,
                        height: 8,
                        background: isActiveDot
                          ? '#ff6b35'
                          : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: isActiveDot
                          ? '0 0 10px rgba(255,107,53,0.4)'
                          : 'none',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={goNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:border-[#ff6b35]/40"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              aria-label="Next page"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a0a0a0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="my-16 md:my-20 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent origin-left"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center group cursor-default"
            >
              <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-[#ff6b35] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-[#6b6b6b]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
