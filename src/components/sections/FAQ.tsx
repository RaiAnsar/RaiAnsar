'use client';

import { useState, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';
import { TextScramble } from '@/components/ui/TextScramble';
import { faqData, faqCategories, type FAQItem } from '@/data/faq';

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="group"
      style={{
        opacity: 1,
        transform: 'none',
        transition: `opacity 0.4s ${0.05 * index}s ease, transform 0.4s ${0.05 * index}s ease`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-5 py-5 md:py-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className="text-[11px] font-mono tabular-nums w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-300 border"
          style={{
            color: isOpen ? '#ff6b35' : '#505050',
            borderColor: isOpen ? 'rgba(255,107,53,0.3)' : 'rgba(255,255,255,0.06)',
            background: isOpen ? 'rgba(255,107,53,0.08)' : 'transparent',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="flex-1 text-[15px] md:text-[17px] font-medium leading-snug transition-colors duration-300"
          style={{ color: isOpen ? '#ffffff' : '#a0a0a0' }}
        >
          {item.question}
        </span>

        {/* Plus/minus icon */}
        <span
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 border"
          style={{
            borderColor: isOpen ? 'rgba(255,107,53,0.3)' : 'rgba(255,255,255,0.06)',
            background: isOpen ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="w-4 h-4 transition-all duration-200"
            style={{
              color: isOpen ? '#ff6b35' : '#505050',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>
      </button>

      {/* Answer — CSS grid-template-rows accordion (no framer-motion needed) */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pl-8 sm:pl-12 pb-6 pr-4 sm:pr-12">
            <p className="text-[#606060] text-sm md:text-[15px] leading-[1.85]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="h-px transition-colors duration-300"
        style={{
          background: isOpen
            ? 'rgba(255,107,53,0.15)'
            : 'rgba(255,255,255,0.05)',
        }}
      />
    </div>
  );
}

export function FAQ() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.15, once: true });

  const [activeCategory, setActiveCategory] = useState('frontend');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [catKey, setCatKey] = useState('frontend');

  const toggleItem = useCallback((key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const currentFAQs = faqData[activeCategory] || [];

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : 'translateY(20px)',
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      id="faq"
      role="region"
      aria-label="Frequently asked questions"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="mb-6" style={anim(0)}>
              <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
                <TextScramble text="// FAQ" delay={0} />
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]"
              style={anim(0.1)}
            >
              Got questions?{' '}
              <span className="gradient-text">Good.</span>
            </h2>
          </div>

          {/* Category pills — horizontal */}
          <div className="flex flex-wrap gap-2" style={anim(0.3)}>
            {faqCategories.map((category) => {
              const isActive = activeCategory === category.key;
              const count = (faqData[category.key] || []).length;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.key);
                    setCatKey(category.key);
                    setOpenItems(new Set());
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer"
                  style={{
                    background: isActive
                      ? 'rgba(255,107,53,0.12)'
                      : 'rgba(255,255,255,0.02)',
                    color: isActive ? '#ff6b35' : '#606060',
                    borderColor: isActive
                      ? 'rgba(255,107,53,0.3)'
                      : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {category.label}
                  <span
                    className="text-[11px] font-mono transition-colors duration-300"
                    style={{ color: isActive ? '#ff6b35' : '#404040' }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion area */}
        <div
          className="rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-6 md:p-10"
          style={anim(0.4)}
        >
          {/* Top border accent */}
          <div className="h-px mb-0" style={{ background: 'rgba(255,255,255,0.04)' }} />

          {/* Category switch — CSS opacity transition instead of AnimatePresence */}
          <div
            key={catKey}
            style={{
              animation: 'faqFadeIn 0.2s ease forwards',
            }}
          >
            {currentFAQs.map((item, index) => {
              const itemKey = `${activeCategory}-${index}`;
              return (
                <AccordionItem
                  key={itemKey}
                  item={item}
                  index={index}
                  isOpen={openItems.has(itemKey)}
                  onToggle={() => toggleItem(itemKey)}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 flex items-center justify-center gap-4"
          style={anim(0.6)}
        >
          <p className="text-[#404040] text-sm">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link hover:gap-3"
            style={{ color: '#ff6b35' }}
          >
            Let&apos;s talk
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
