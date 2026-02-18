'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';

const highlights = [
  {
    number: '01',
    title: 'Full-Stack Mastery',
    description:
      'React, Next.js, Node.js, WordPress — I build across the entire stack, choosing the right tool for each job.',
  },
  {
    number: '02',
    title: 'DevOps & Infrastructure',
    description:
      'Docker, AWS, CI/CD pipelines, server hardening. Your app runs fast, stays secure, and scales on demand.',
  },
  {
    number: '03',
    title: 'Reliable Delivery',
    description:
      'Clear communication, honest timelines, zero ghosting. I treat every project like a partnership, not a transaction.',
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#0a0a0a] overflow-hidden"
      id="about"
      role="region"
      aria-label="About section"
    >
      <div className="container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
            <TextScramble text="// About" delay={0} />
          </span>
        </motion.div>

        {/* Two-column: Big statement + paragraph */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15]"
          >
            A decade of turning{' '}
            <span className="gradient-text">complexity</span> into clean,
            maintainable software.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-end"
          >
            <p className="text-lg text-[#707070] leading-relaxed">
              I&apos;ve worked with agencies, startups, and established
              companies — building everything from landing pages to full SaaS
              platforms. I write code that other developers can actually
              maintain, and I ship on time.
            </p>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Magnetic key={item.number} strength={0.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-white/[0.05] bg-[#111] hover:border-[#ff6b35]/20 transition-all duration-500"
              >
                {/* Number */}
                <span className="text-[#ff6b35] text-xs font-mono tracking-widest mb-4 block">
                  {item.number}
                </span>

                <h3 className="text-white text-lg font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-[#606060] text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(400px circle at 50% 0%, rgba(255,107,53,0.04), transparent 70%)',
                  }}
                />
              </motion.div>
            </Magnetic>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '60+', label: 'Projects Shipped' },
            { value: '15+', label: 'Technologies' },
            { value: '100%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <Magnetic key={stat.label} strength={0.15}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
                className="text-center group cursor-default"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-[#ff6b35] transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-[#505050] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
