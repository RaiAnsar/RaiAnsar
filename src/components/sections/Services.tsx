'use client';

import { useInView } from 'react-intersection-observer';
import { services } from '@/data/services';

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="services" className="section" ref={ref} style={{ backgroundColor: 'var(--bg-elevated)' }}>
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
            Services
          </span>

          <h2
            className="text-title mt-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease',
              transitionDelay: '0.1s',
            }}
          >
            What I do
          </h2>
        </div>

        {/* Services list */}
        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                transitionDelay: `${0.2 + index * 0.1}s`,
              }}
            >
              <span className="service-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="service-title">
                {service.title}
              </h3>
              <p className="service-description">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-16 pt-8 border-t"
          style={{
            borderColor: 'var(--border)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.8s',
          }}
        >
          <p className="text-body mb-4" style={{ color: 'var(--text-muted)' }}>
            Have a project in mind?
          </p>
          <a
            href="#contact"
            className="link text-subtitle"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
