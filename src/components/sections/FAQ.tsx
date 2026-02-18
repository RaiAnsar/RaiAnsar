'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="group"
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
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="w-4 h-4 transition-colors duration-300"
            style={{ color: isOpen ? '#ff6b35' : '#505050' }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </motion.svg>
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-8 sm:pl-12 pb-6 pr-4 sm:pr-12">
              <p className="text-[#606060] text-sm md:text-[15px] leading-[1.85]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider line */}
      <div
        className="h-px transition-colors duration-300"
        style={{
          background: isOpen
            ? 'rgba(255,107,53,0.15)'
            : 'rgba(255,255,255,0.05)',
        }}
      />
    </motion.div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [activeCategory, setActiveCategory] = useState('frontend');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
                <TextScramble text="// FAQ" delay={0} />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1]"
            >
              Got questions?{' '}
              <span className="gradient-text">Good.</span>
            </motion.h2>
          </div>

          {/* Category pills — horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {faqCategories.map((category) => {
              const isActive = activeCategory === category.key;
              const count = (faqData[category.key] || []).length;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.key);
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
          </motion.div>
        </div>

        {/* Accordion area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-6 md:p-10"
        >
          {/* Top border accent */}
          <div className="h-px mb-0" style={{ background: 'rgba(255,255,255,0.04)' }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
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
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
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
        </motion.div>
      </div>
    </section>
  );
}
