'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';

const phases = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'Deep dive into your goals, audience, and technical requirements. We map out exactly what success looks like before writing a single line of code.',
    color: '#ff6b35',
    gradient: 'from-[#ff6b35]/20 to-[#ff6b35]/5',
    borderColor: 'rgba(255,107,53,0.3)',
    items: ['Requirements Analysis', 'Technical Audit', 'Scope Definition'],
  },
  {
    number: '02',
    title: 'Strategy',
    subtitle: 'Creating the Blueprint',
    description: 'Architecting the perfect solution with a detailed roadmap, technology stack decisions, and milestone planning for predictable delivery.',
    color: '#3b82f6',
    gradient: 'from-[#3b82f6]/20 to-[#3b82f6]/5',
    borderColor: 'rgba(59,130,246,0.3)',
    items: ['Architecture Design', 'Tech Stack Selection', 'Milestone Planning'],
  },
  {
    number: '03',
    title: 'Development',
    subtitle: 'Building Excellence',
    description: 'Clean, efficient code with regular updates and feedback loops. Every sprint moves the needle with transparent progress and quality checks.',
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6]/20 to-[#8b5cf6]/5',
    borderColor: 'rgba(139,92,246,0.3)',
    items: ['Agile Sprints', 'Code Reviews', 'Progress Updates'],
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Deploy & Beyond',
    description: 'Rigorous testing, performance optimization, and a smooth deployment. Plus ongoing support to keep everything running at peak performance.',
    color: '#10b981',
    gradient: 'from-[#10b981]/20 to-[#10b981]/5',
    borderColor: 'rgba(16,185,129,0.3)',
    items: ['QA Testing', 'Performance Tuning', 'Ongoing Support'],
  },
];

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br ${phase.gradient} border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
        style={{ borderColor: phase.borderColor }}
      >
        {/* Phase number - large watermark */}
        <div
          className="absolute top-4 right-6 text-[8rem] md:text-[10rem] font-black leading-none opacity-[0.04] select-none pointer-events-none"
          style={{ color: phase.color }}
        >
          {phase.number}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Phase label */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold"
              style={{
                background: `${phase.color}15`,
                color: phase.color,
                border: `1px solid ${phase.color}30`,
              }}
            >
              {phase.number}
            </span>
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: phase.color }}
            >
              Phase {phase.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            {phase.title}
          </h3>

          {/* Subtitle */}
          <p className="text-white/40 text-sm font-medium mb-4 tracking-wide">
            {phase.subtitle}
          </p>

          {/* Description */}
          <p className="text-white/55 text-base leading-relaxed mb-6 max-w-lg">
            {phase.description}
          </p>

          {/* Items as pills */}
          <div className="flex flex-wrap gap-2">
            {phase.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  background: `${phase.color}08`,
                  borderColor: `${phase.color}20`,
                  color: `${phase.color}cc`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-[0.06]"
          style={{ background: phase.color }}
        />
      </div>
    </motion.div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

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
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.03) 0%, transparent 50%)',
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
            <span className="text-[#ff6b35] text-xs font-semibold tracking-[0.25em] uppercase">
              <TextScramble text="// Process" delay={0} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4"
          >
            <TextScramble text="From vision to reality" delay={150} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-lg tracking-wide max-w-2xl mx-auto"
          >
            A proven process refined over years of delivering exceptional digital products.
          </motion.p>
        </div>

        {/* Phase cards grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <PhaseCard key={phase.number} phase={phase} index={index} />
          ))}
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 hover:gap-3 bg-[#ff6b35] text-white hover:bg-[#ff8555] shadow-lg shadow-[#ff6b35]/20"
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
