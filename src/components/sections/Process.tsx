'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';

const steps = [
  {
    number: '01',
    title: 'Contact',
    subtitle: 'Understanding Your Vision',
    description: 'We discuss your idea, requirements, and goals to understand the vision.',
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'Creating the Roadmap',
    description: 'I create a detailed roadmap and technical architecture for your project.',
  },
  {
    number: '03',
    title: 'Develop',
    subtitle: 'Building Excellence',
    description: 'Writing clean, efficient code with regular updates and feedback loops.',
  },
  {
    number: '04',
    title: 'Deploy',
    subtitle: 'Launch & Beyond',
    description: 'Launching your product to the world with proper testing and optimization.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#c9a962]/40">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcessStep({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) {
  return (
    <div className="flex items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
        className="flex-1 group"
      >
        {/* Step content */}
        <div className="relative">
          {/* Number badge */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,98,0.12) 0%, rgba(201,169,98,0.05) 100%)',
              border: '1px solid rgba(201,169,98,0.2)',
            }}
          >
            <span 
              className="text-lg font-bold tracking-wider"
              style={{ color: '#c9a962' }}
            >
              {step.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#c9a962] transition-colors duration-300">
            {step.title}
          </h3>

          {/* Subtitle */}
          <p className="text-[#c9a962]/70 text-sm font-medium mb-3 tracking-wide">
            {step.subtitle}
          </p>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Arrow connector */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
          className="hidden md:flex items-center justify-center px-4 pt-6"
        >
          <ArrowIcon />
        </motion.div>
      )}
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden"
      id="process"
      role="region"
      aria-label="Process section"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,98,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#c9a962] text-xs font-semibold tracking-[0.25em] uppercase">
              <TextScramble text="// Process" delay={0} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4"
          >
            <TextScramble text="How we work" delay={150} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-lg tracking-wide"
          >
            Simple. Transparent. Effective.
          </motion.p>
        </div>

        {/* Process flow - horizontal on desktop, vertical on mobile */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop: Horizontal flow */}
          <div className="hidden md:grid md:grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <ProcessStep 
                key={step.number} 
                step={step} 
                index={index} 
                isLast={index === steps.length - 1} 
              />
            ))}
          </div>

          {/* Mobile: Vertical flow with connecting line */}
          <div className="md:hidden relative">
            {/* Vertical connecting line */}
            <div 
              className="absolute left-7 top-7 bottom-7 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(201,169,98,0.3), rgba(201,169,98,0.05))' }}
            />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Number badge */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,169,98,0.15) 0%, rgba(201,169,98,0.05) 100%)',
                      border: '1px solid rgba(201,169,98,0.25)',
                    }}
                  >
                    <span className="text-lg font-bold" style={{ color: '#c9a962' }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#c9a962]/70 text-sm font-medium mb-2">
                      {step.subtitle}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 hover:gap-3"
            style={{
              background: 'rgba(201,169,98,0.1)',
              border: '1px solid rgba(201,169,98,0.25)',
              color: '#c9a962',
            }}
          >
            Start Your Project
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
