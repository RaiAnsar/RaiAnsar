'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, Chip, Button, ButtonGroup, Avatar } from '@heroui/react';
import { allTestimonials, shuffleArray, type Testimonial } from '@/data/testimonials';
import Image from 'next/image';

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState<'all' | 'upwork' | 'fiverr'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const handlePageChange = (newPage: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    handlePageChange((currentPage + 1) % totalPages);
  };

  const handlePrev = () => {
    handlePageChange(currentPage === 0 ? totalPages - 1 : currentPage - 1);
  };

  useEffect(() => {
    if (!isAutoPlaying || totalPages === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage, filter, isAutoPlaying, totalPages]);

  const handleFilterChange = (newFilter: 'all' | 'upwork' | 'fiverr') => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section id="testimonials" className="py-24 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Client Testimonials
        </h2>
        <p
          className={`text-muted text-center mb-12 max-w-2xl mx-auto transition-all duration-600 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          What my clients say about my WordPress and server management services.
        </p>

        {/* Filter Buttons */}
        <div
          className={`flex justify-center mb-10 transition-all duration-600 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <ButtonGroup variant="tertiary">
            {(['all', 'upwork', 'fiverr'] as const).map((filterOption) => (
              <Button
                key={filterOption}
                onPress={() => handleFilterChange(filterOption)}
                className={filter === filterOption ? 'bg-accent text-white' : ''}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 && (
          <div
            className={`relative transition-all duration-600 delay-400 ${inView ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              {currentTestimonials.map((testimonial, index) => (
                <div
                  key={`${currentPage}-${index}`}
                  className={`transition-all duration-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full" variant="secondary">
                    <Card.Header className="flex-row justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <Chip
                        color={testimonial.platform === 'Upwork' ? 'success' : 'accent'}
                        variant="soft"
                        size="sm"
                      >
                        {testimonial.platform}
                      </Chip>
                    </Card.Header>

                    <Card.Content className="flex-1">
                      <p className="text-muted leading-relaxed">
                        &ldquo;{truncateText(testimonial.quote)}&rdquo;
                      </p>
                    </Card.Content>

                    <Card.Footer className="flex items-center gap-3">
                      <Avatar size="sm">
                        {testimonial.platform === 'Upwork' ? (
                          <Avatar.Fallback className="bg-transparent p-0">
                            <Image
                              src="/images/svg/upwork.svg"
                              alt="Upwork"
                              width={20}
                              height={20}
                              className="dark:invert"
                            />
                          </Avatar.Fallback>
                        ) : (
                          <Avatar.Fallback className="bg-transparent p-0">
                            <Image
                              src="/images/svg/fiverr.svg"
                              alt="Fiverr"
                              width={20}
                              height={20}
                              className="dark:invert"
                            />
                          </Avatar.Fallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted">WordPress Development</p>
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="tertiary"
                isIconOnly
                onPress={() => {
                  handlePrev();
                  setIsAutoPlaying(false);
                }}
                isDisabled={currentPage === 0}
                aria-label="Previous testimonials"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPage ? 'bg-accent w-6' : 'bg-default'
                    }`}
                    onClick={() => {
                      handlePageChange(index);
                      setIsAutoPlaying(false);
                    }}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="tertiary"
                isIconOnly
                onPress={() => {
                  handleNext();
                  setIsAutoPlaying(false);
                }}
                isDisabled={currentPage === totalPages - 1}
                aria-label="Next testimonials"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto transition-all duration-600 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">25+</div>
            <div className="text-sm text-muted">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">95%</div>
            <div className="text-sm text-muted">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">80%</div>
            <div className="text-sm text-muted">Repeat Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
