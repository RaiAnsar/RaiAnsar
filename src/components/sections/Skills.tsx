'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from '@/components/ui/TextScramble';
import { skills, skillsDescription } from '@/data/skills';

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Small delay so bars animate after the section fades in
      const timeout = setTimeout(() => setAnimateBars(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden"
      id="skills"
      role="region"
      aria-label="Skills section"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#ff6b35] text-sm font-semibold tracking-[0.2em] uppercase">
            <TextScramble text="// Skills" delay={0} />
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="max-w-5xl mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]"
          >
            <span className="block mb-2">
              <TextScramble text="My" delay={100} />
            </span>
            <span className="block">
              <span className="gradient-text">
                <TextScramble text="Skills" delay={300} />
              </span>
            </span>
          </motion.h2>
        </div>

        {/* 2-column layout: description left, progress bars right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left column - description */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-white font-semibold leading-relaxed mb-8"
            >
              {skillsDescription.title}
            </motion.h3>

            {skillsDescription.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-[#6b6b6b] text-base md:text-lg leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Divider accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 h-px bg-gradient-to-r from-[#ff6b35]/40 to-transparent origin-left"
            />
          </div>

          {/* Right column - progress bars */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Skill label and percentage */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {skill.name}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
                    className="text-[#a0a0a0] text-xs font-mono tabular-nums"
                  >
                    {skill.percentage}%
                  </motion.span>
                </div>

                {/* Progress bar track */}
                <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-white/[0.04]">
                  {/* Animated fill */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateBars ? `${skill.percentage}%` : '0%',
                      background: 'linear-gradient(90deg, #ff6b35, #ff8555)',
                      transitionDelay: `${index * 100}ms`,
                      boxShadow: animateBars
                        ? '0 0 12px rgba(255, 107, 53, 0.3)'
                        : 'none',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
