'use client';

import { useInView } from 'react-intersection-observer';
import { Card } from '@heroui/react';
import { services } from '@/data/services';
import Image from 'next/image';

const iconMap: Record<string, string> = {
  'wordpress-dev': '/images/svg/services/wordpress-dev.svg',
  'wordpress-maintenance': '/images/svg/services/wordpress-maintenance.svg',
  'server': '/images/svg/services/server-specialist.svg',
  'ecommerce': '/images/svg/services/ecommerce.svg',
  'custom-dev': '/images/svg/services/custom-development.svg',
  'security': '/images/svg/services/web-security.svg'
};

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="services" className="py-24 bg-surface" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-600 hover:-translate-y-2.5 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <Card className="h-full" variant="secondary">
                <Card.Header>
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Image
                      src={iconMap[service.icon] || '/images/svg/services/wordpress-dev.svg'}
                      alt={service.title}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="dark:invert"
                    />
                  </div>
                </Card.Header>
                <Card.Content>
                  <h3 className="text-xl mb-3 font-semibold">{service.title}</h3>
                  <Card.Description className="text-muted leading-relaxed">
                    {service.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
