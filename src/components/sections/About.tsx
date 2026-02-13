'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';
import { GlowCard } from '@/components/ui/GlowCard';

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden"
      id="about"
      role="region"
      aria-label="About section"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div className="container relative z-10">
        {/* Section label with scramble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
            <TextScramble text="// About" delay={0} />
          </span>
        </motion.div>

        {/* Big story heading with staggered reveal */}
        <div className="max-w-5xl mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]"
          >
            <span className="block mb-2">
              <TextScramble text="Every great" delay={100} />
            </span>
            <span className="block mb-2">
              <span className="gradient-text">
                <TextScramble text="developer" delay={300} />
              </span>
            </span>
            <span className="block mb-2">
              <TextScramble text="begins with" delay={500} />
            </span>
            <span className="block">
              <span className="gradient-text">
                <TextScramble text="an even better story." delay={700} />
              </span>
            </span>
          </motion.h2>
        </div>

        {/* Story content with glow cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Magnetic strength={0.05}>
            <GlowCard className="p-8 rounded-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-[#a0a0a0] leading-relaxed"
              >
                I&apos;ve been building software for{' '}
                <strong className="text-white font-semibold">10+ years</strong>, working with agencies, startups, and established companies.
                I specialize in turning complex requirements into clean, maintainable solutions.
              </motion.p>
            </GlowCard>
          </Magnetic>

          <Magnetic strength={0.05}>
            <GlowCard className="p-8 rounded-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-[#707070] leading-relaxed mb-6"
              >
                I stay current with modern frameworks and best practices, focusing on code that scales and 
                performs well in production.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-[#707070] leading-relaxed"
              >
                Clear communication and reliable delivery matter as much as technical skill. I aim to make 
                every project straightforward for my clients.
              </motion.p>
            </GlowCard>
          </Magnetic>
        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="my-20 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent origin-left"
        />

        {/* Stats row with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '60+', label: 'Projects Delivered' },
            { value: '< 24h', label: 'Response Time' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <Magnetic key={stat.label} strength={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#ff6b35] transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-[#505050]">{stat.label}</div>
              </motion.div>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
