'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { allTestimonials, shuffleArray, type Testimonial } from '@/data/testimonials';

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState<'all' | 'upwork' | 'fiverr'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const testimonialsPerPage = 6;

  useEffect(() => {
    const shuffled = shuffleArray(allTestimonials);
    setTestimonials(shuffled);
  }, []);

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.platform.toLowerCase() === filter);

  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);
  const currentTestimonials = filteredTestimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const handleFilterChange = (newFilter: 'all' | 'upwork' | 'fiverr') => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  const truncateText = (text: string, maxLength = 180) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      id="work"
      className="section"
      ref={ref}
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
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
            Testimonials
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
            What clients say
          </h2>

          {/* Filter */}
          <div
            className="filter-pills"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.2s',
            }}
          >
            {(['all', 'upwork', 'fiverr'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilterChange(filterOption)}
                className={`filter-pill ${filter === filterOption ? 'active' : ''}`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials grid */}
        {testimonials.length > 0 && (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            }}
          >
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={`${currentPage}-${index}`}
                className="testimonial-card"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease',
                  transitionDelay: `${0.3 + index * 0.1}s`,
                }}
              >
                {/* Stars */}
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="testimonial-quote">
                  &ldquo;{truncateText(testimonial.quote)}&rdquo;
                </p>

                {/* Author */}
                <div className="testimonial-author">
                  <span className="testimonial-name">
                    {testimonial.name}
                  </span>
                  <span className="testimonial-platform">
                    {testimonial.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
