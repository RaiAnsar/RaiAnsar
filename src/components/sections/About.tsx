'use client';

import { useInView } from 'react-intersection-observer';
import { Button, Card } from '@heroui/react';
import Image from 'next/image';

const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '6+', label: 'Years Experience' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '24/7', label: 'Support Available' }
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-24 bg-background relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          About Me
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-overlay transition-all duration-600 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/me-mobile-optimized.webp"
              />
              <Image
                src="/images/me-desktop-optimized.webp"
                alt="Rai Ansar"
                fill
                sizes="(max-width: 768px) 300px, 500px"
                className="object-cover"
                loading="lazy"
              />
            </picture>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-600 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <p className="text-muted text-lg leading-relaxed mb-6">
              I am a freelance WordPress expert, React developer, PHP developer, and server management specialist with over 6 years of experience
              delivering high-quality web development solutions for clients worldwide. My expertise spans across custom development,
              performance optimization, security hardening, and complex technical problem-solving.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-10">
              As a dedicated web developer, whether you need a custom WordPress plugin rebuilt from scratch, a React + Vite application developed,
              or server issues resolved, I bring deep technical knowledge and a commitment to excellence to every project.
              I&apos;ve successfully completed over 500 projects ranging from $500 to $20,000+, maintaining a 98% client satisfaction rate.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <Card className="text-center" variant="secondary">
                    <Card.Content>
                      <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted">{stat.label}</div>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              <Button
                variant="primary"
                size="lg"
                onPress={() => { window.location.href = '#contact'; }}
              >
                Let&apos;s Work Together
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
