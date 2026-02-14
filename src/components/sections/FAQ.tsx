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
        className="w-full flex items-start gap-4 py-6 text-left cursor-pointer"
      >
        {/* Number */}
        <span
          className="text-xs font-mono tabular-nums pt-1 shrink-0 transition-colors duration-300"
          style={{ color: isOpen ? '#ff6b35' : '#404040' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="flex-1 text-base md:text-lg font-medium leading-relaxed transition-colors duration-300"
          style={{ color: isOpen ? '#ffffff' : '#909090' }}
        >
          {item.question}
        </span>

        {/* Plus/minus icon */}
        <span className="shrink-0 pt-1">
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isOpen ? '#ff6b35' : '#505050' }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
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
            <div className="pl-10 pb-6">
              <p className="text-[#707070] text-sm md:text-[15px] leading-[1.8] max-w-xl">
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
            ? 'rgba(255,107,53,0.2)'
            : 'rgba(255,255,255,0.06)',
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
      className="relative py-24 md:py-32"
      id="faq"
      role="region"
      aria-label="Frequently asked questions"
      style={{ background: '#0a0a0a' }}
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-16 lg:gap-20">
          {/* Left column — header + categories */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
                <TextScramble text="// FAQ" delay={0} />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              <TextScramble text="Common" delay={150} />
              <br />
              <span className="gradient-text">
                <TextScramble text="Questions" delay={300} />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-base tracking-wide max-w-md mb-10"
            >
              Everything you need to know about working with me.
            </motion.p>

            {/* Category tabs — vertical on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap lg:flex-col gap-2"
            >
              {faqCategories.map((category) => {
                const isActive = activeCategory === category.key;
                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category.key);
                      setOpenItems(new Set());
                    }}
                    className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 text-left"
                    style={{
                      background: isActive
                        ? 'rgba(255,107,53,0.08)'
                        : 'transparent',
                      color: isActive ? '#ff6b35' : '#606060',
                      borderLeft: isActive
                        ? '2px solid #ff6b35'
                        : '2px solid transparent',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? '#ff6b35' : '#303030',
                        boxShadow: isActive ? '0 0 8px rgba(255,107,53,0.5)' : 'none',
                      }}
                    />
                    {category.label}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right column — accordion */}
          <div>
            {/* Top border */}
            <div className="h-px mb-0" style={{ background: 'rgba(255,255,255,0.06)' }} />

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

            {/* Bottom CTA — subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <p className="text-[#505050] text-sm">
                Still have questions?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link hover:gap-3"
                style={{ color: '#ff6b35' }}
              >
                Get in touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover/link:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
