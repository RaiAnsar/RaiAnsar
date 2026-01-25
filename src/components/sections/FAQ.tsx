'use client';

import { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { faqData, faqCategories, type FAQItem } from '@/data/faq';

export function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeCategory, setActiveCategory] = useState('wordpress');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filteredFAQs = useMemo(() => {
    return faqData[activeCategory] || [];
  }, [activeCategory]);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="section" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span
            className="badge"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
            }}
          >
            FAQ
          </span>

          <h2
            className="text-title mt-6 mb-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.1s',
            }}
          >
            Common questions
          </h2>

          {/* Category pills */}
          <div
            className="filter-pills"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.2s',
            }}
          >
            {faqCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key);
                  setOpenItems(new Set());
                }}
                className={`filter-pill ${activeCategory === category.key ? 'active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ items */}
        <div className="max-w-3xl">
          {filteredFAQs.map((item: FAQItem, index: number) => (
            <div
              key={index}
              className="faq-item"
              data-open={openItems.has(index)}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                transitionDelay: `${0.3 + index * 0.05}s`,
              }}
            >
              <button
                className="faq-trigger"
                onClick={() => toggleItem(index)}
              >
                <span className="faq-question">{item.question}</span>
                <svg
                  className="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openItems.has(index) ? '500px' : '0',
                  opacity: openItems.has(index) ? 1 : 0,
                }}
              >
                <div className="faq-answer-inner">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-16 pt-8 border-t max-w-3xl"
          style={{
            borderColor: 'var(--border)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.6s',
          }}
        >
          <p className="text-body mb-4" style={{ color: 'var(--text-muted)' }}>
            Have another question?
          </p>
          <a href="#contact" className="link text-subtitle">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
