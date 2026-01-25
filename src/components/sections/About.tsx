'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Image */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="about-image-wrapper">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/images/me-mobile-optimized.webp"
                />
                <Image
                  src="/images/me-desktop-optimized.webp"
                  alt="Rai Ansar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="about-image-frame" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="badge">About</span>

            <h2
              className="text-title mt-6 mb-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease',
                transitionDelay: '0.3s',
              }}
            >
              Building digital products with precision and purpose
            </h2>

            <div
              className="space-y-6 mb-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease',
                transitionDelay: '0.4s',
              }}
            >
              <p className="text-body-lg">
                I&apos;m a full-stack developer with six years of experience building
                web applications that scale. My work spans from custom WordPress
                solutions to modern React applications and cloud infrastructure.
              </p>
              <p className="text-body-lg">
                I believe in clean code, thoughtful architecture, and delivering
                solutions that work. Every project is an opportunity to solve
                real problems with elegant, maintainable code.
              </p>
            </div>

            {/* Stats - minimal */}
            <div
              className="grid grid-cols-3 gap-8 py-8 border-t border-b"
              style={{
                borderColor: 'var(--border)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease',
                transitionDelay: '0.5s',
              }}
            >
              <div>
                <div className="text-title mb-1">6+</div>
                <div className="text-small">Years</div>
              </div>
              <div>
                <div className="text-title mb-1">500+</div>
                <div className="text-small">Projects</div>
              </div>
              <div>
                <div className="text-title mb-1">98%</div>
                <div className="text-small">Satisfaction</div>
              </div>
            </div>

            {/* CTA */}
            <div
              className="mt-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease',
                transitionDelay: '0.6s',
              }}
            >
              <a href="#contact" className="btn btn-primary">
                Work With Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
