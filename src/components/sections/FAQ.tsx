'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { faqData, faqCategories, type FAQItem } from '@/data/faq';

/* ------------------------------------------------------------------ */
/*  Chevron icon                                                       */
/* ------------------------------------------------------------------ */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 shrink-0 text-[#a0a0a0]"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Search icon                                                        */
/* ------------------------------------------------------------------ */
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-[#6b6b6b]"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion item                                                     */
/* ------------------------------------------------------------------ */
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="rounded-xl overflow-hidden"
      style={{
        background: '#161616',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Question trigger */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.02]"
      >
        <span className="text-white text-[15px] md:text-base font-medium leading-relaxed">
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <div
                className="h-px mb-4"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              <p className="text-[#a0a0a0] text-sm md:text-[15px] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main FAQ section                                                   */
/* ------------------------------------------------------------------ */
export function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [activeCategory, setActiveCategory] = useState('wordpress');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  /* ---- Toggle accordion item ---- */
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

  /* ---- Filter FAQs with search + category ---- */
  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // When searching (>= 2 chars), search across all categories
    if (query.length >= 2) {
      const results: { category: string; item: FAQItem; originalIndex: number }[] = [];
      for (const cat of Object.keys(faqData)) {
        faqData[cat].forEach((item, idx) => {
          if (
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
          ) {
            results.push({ category: cat, item, originalIndex: idx });
          }
        });
      }
      return results;
    }

    // Otherwise show the active category
    return (faqData[activeCategory] || []).map((item, idx) => ({
      category: activeCategory,
      item,
      originalIndex: idx,
    }));
  }, [searchQuery, activeCategory]);

  const isSearching = searchQuery.trim().length >= 2;

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
      id="faq"
      role="region"
      aria-label="Frequently asked questions"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,107,53,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* ---- Section header ---- */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ff6b35] text-xs font-semibold tracking-[0.25em] uppercase">
              <TextScramble text="// FAQ" delay={0} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4"
          >
            <TextScramble text="Common Questions" delay={150} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#a0a0a0] text-lg tracking-wide max-w-xl mx-auto"
          >
            Everything you need to know about my services.
          </motion.p>
        </div>

        {/* ---- Search bar ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200"
            style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <SearchIcon />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-[#6b6b6b] outline-none"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#6b6b6b] hover:text-white transition-colors text-xs"
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* ---- Category tabs ---- */}
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
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
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: isActive ? '#ff6b35' : 'rgba(255,255,255,0.04)',
                    color: isActive ? '#ffffff' : '#a0a0a0',
                    border: isActive
                      ? '1px solid #ff6b35'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isActive
                      ? '0 4px 20px rgba(255,107,53,0.25)'
                      : 'none',
                  }}
                >
                  {category.label}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ---- Search results label ---- */}
        {isSearching && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#6b6b6b] text-sm mb-8"
          >
            {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found across all categories
          </motion.p>
        )}

        {/* ---- Accordion list ---- */}
        <div className="max-w-2xl mx-auto space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSearching ? `search-${searchQuery}` : `cat-${activeCategory}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map(({ category, item, originalIndex }, index) => {
                  const itemKey = `${category}-${originalIndex}`;
                  return (
                    <AccordionItem
                      key={itemKey}
                      item={item}
                      index={index}
                      isOpen={openItems.has(itemKey)}
                      onToggle={() => toggleItem(itemKey)}
                    />
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-[#6b6b6b] text-sm">
                    No questions match your search. Try a different term.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---- CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <div
            className="inline-block p-8 md:p-10 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 100%)',
              border: '1px solid rgba(255,107,53,0.1)',
            }}
          >
            <p className="text-white text-lg md:text-xl font-semibold mb-2">
              Still have questions?
            </p>
            <p className="text-[#a0a0a0] text-sm mb-6 max-w-md mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Feel free to reach out.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-90 hover:gap-3"
              style={{
                background: '#ff6b35',
                color: '#ffffff',
                boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
              }}
            >
              Get in Touch
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
