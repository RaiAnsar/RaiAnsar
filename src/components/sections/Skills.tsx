'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { TextScramble } from '@/components/ui/TextScramble';
import { skills, skillsDescription } from '@/data/skills';

export function Skills() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.2, once: true });
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setAnimateBars(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const anim = (delay = 0, y = 20): React.CSSProperties => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : `translateY(${y}px)`,
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-[#030712] overflow-hidden"
      id="skills"
      role="region"
      aria-label="Skills section"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <div className="mb-4" style={anim(0)}>
          <span className="text-[#38bdf8] text-sm font-semibold tracking-[0.2em] uppercase">
            <TextScramble text="// Skills" delay={0} />
          </span>
        </div>

        {/* Main heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.15] mb-10"
          style={anim(0.2)}
        >
          <span className="block mb-2">
            <TextScramble text="My" delay={100} />
          </span>
          <span className="block">
            <span className="gradient-text">
              <TextScramble text="Skills" delay={300} />
            </span>
          </span>
        </h2>

        {/* 2-column layout: description left, progress bars right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          {/* Left column - description */}
          <div>
            <h3
              className="text-xl md:text-2xl text-white font-semibold leading-relaxed mb-8"
              style={anim(0.3)}
            >
              {skillsDescription.title}
            </h3>

            {skillsDescription.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#6b7280] text-base md:text-lg leading-relaxed mb-6 last:mb-0"
                style={anim(0.4 + index * 0.1)}
              >
                {paragraph}
              </p>
            ))}

            {/* Divider accent */}
            <div
              className="mt-10 h-px bg-gradient-to-r from-[#38bdf8]/40 to-transparent"
              style={{
                transformOrigin: 'left',
                transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
                transition: `transform 1s 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            />
          </div>

          {/* Right column - progress bars */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                style={anim(0.3 + index * 0.08, 30)}
              >
                {/* Skill label and percentage */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {skill.name}
                  </span>
                  <span
                    className="text-[#9ca3af] text-xs font-mono tabular-nums"
                    style={anim(0.6 + index * 0.08)}
                  >
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="relative h-2 bg-[#1f2937] rounded-full overflow-hidden border border-white/[0.04]">
                  {/* Animated fill */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateBars ? `${skill.percentage}%` : '0%',
                      background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)',
                      transitionDelay: `${index * 100}ms`,
                      boxShadow: animateBars
                        ? '0 0 12px rgba(56, 189, 248, 0.3)'
                        : 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
