'use client';

import { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Accordion, Tabs, Button, TextField, Input } from '@heroui/react';
import { faqData, faqCategories, type FAQItem } from '@/data/faq';

export function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeCategory, setActiveCategory] = useState('wordpress');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (searchQuery.length < 2) {
      return faqData[activeCategory] || [];
    }

    const query = searchQuery.toLowerCase();
    const allFAQs: (FAQItem & { category: string })[] = [];

    Object.entries(faqData).forEach(([category, items]) => {
      items.forEach((item) => {
        if (
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        ) {
          allFAQs.push({ ...item, category });
        }
      });
    });

    return allFAQs;
  }, [searchQuery, activeCategory]);

  return (
    <section id="faq" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={`text-muted text-center mb-12 max-w-2xl mx-auto transition-all duration-600 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          Find answers to common questions about my WordPress and server management services.
        </p>

        {/* Search Bar */}
        <div
          className={`max-w-md mx-auto mb-10 transition-all duration-600 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <TextField className="w-full">
            <div className="relative">
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </TextField>
        </div>

        {/* Category Tabs - Horizontal with secondary variant */}
        {searchQuery.length < 2 && (
          <div
            className={`flex justify-center mb-10 transition-all duration-600 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <Tabs
              selectedKey={activeCategory}
              onSelectionChange={(key) => setActiveCategory(key as string)}
              variant="secondary"
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="FAQ Categories">
                  {faqCategories.map((category) => (
                    <Tabs.Tab key={category.key} id={category.key}>
                      {category.label}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>
        )}

        {/* FAQ Items */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-600 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            key={activeCategory + searchQuery}
            className="transition-opacity duration-300"
          >
            {filteredFAQs.length > 0 ? (
              <Accordion className="w-full" variant="surface" allowsMultipleExpanded>
                {filteredFAQs.map((item, index) => (
                  <Accordion.Item key={index}>
                    <Accordion.Heading>
                      <Accordion.Trigger>
                        {item.question}
                        <Accordion.Indicator>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Accordion.Indicator>
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="text-muted">
                        {item.answer}
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 text-muted">
                No matching results found. Please try a different search term.
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-600 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-muted max-w-xl mx-auto mb-6">
            If you couldn&apos;t find the answer to your question, feel free to reach out.
            I&apos;m here to help with any WordPress or server management concerns you may have.
          </p>
          <Button
            variant="primary"
            size="lg"
            onPress={() => { window.location.href = '#contact'; }}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
