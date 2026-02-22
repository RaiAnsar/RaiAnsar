'use client';

import { useInView } from '@/hooks/useInView';
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

const fadeIn = (delay = 0, y = 20): React.CSSProperties => ({
  opacity: 1,
  transform: 'none',
  transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
});
const hidden = (y = 20): React.CSSProperties => ({
  opacity: 0,
  transform: `translateY(${y}px)`,
  transition: 'none',
});

export function About() {
  const [containerRef, isInView] = useInView<HTMLElement>({ threshold: 0.2, once: true });

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#030712] overflow-hidden"
      id="about"
      role="region"
      aria-label="About section"
    >
      <div className="container relative z-10">
        {/* Section label */}
        <div className="mb-8" style={isInView ? fadeIn(0) : hidden()}>
          <span className="text-[#38bdf8] text-sm font-semibold tracking-[0.2em] uppercase">
            <TextScramble text="// About" delay={0} />
          </span>
        </div>

        {/* Two-column: Big statement + paragraph */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-[1.15]"
            style={isInView ? fadeIn(0.1, 30) : hidden(30)}
          >
            6+ years of turning{' '}
            <span className="gradient-text">complexity</span> into clean,
            maintainable software.
          </h2>

          <div className="flex items-end" style={isInView ? fadeIn(0.3) : hidden()}>
            <p className="text-lg text-[#6b7280] leading-relaxed">
              I&apos;ve worked with agencies, startups, and established
              companies — building everything from landing pages to full SaaS
              platforms. I write code that other developers can actually
              maintain, and I ship on time.
            </p>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Magnetic key={item.number} strength={0.05}>
              <div
                className="group relative p-8 rounded-2xl border border-white/[0.05] bg-[#111827] hover:border-[#38bdf8]/20 transition-all duration-500"
                style={isInView ? fadeIn(0.4 + index * 0.1, 30) : hidden(30)}
              >
                {/* Number */}
                <span className="text-[#38bdf8] text-xs font-mono tracking-widest mb-4 block">
                  {item.number}
                </span>

                <h3 className="text-white text-lg font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-[#6b7280] text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(400px circle at 50% 0%, rgba(56,189,248,0.04), transparent 70%)',
                  }}
                />
              </div>
            </Magnetic>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8"
          style={isInView ? fadeIn(0.8, 30) : hidden(30)}
        >
          {[
            { value: '6+', label: 'Years Experience' },
            { value: '300+', label: 'Projects Shipped' },
            { value: '20+', label: 'Technologies' },
            { value: '100%', label: 'Satisfaction' },
          ].map((stat) => (
            <Magnetic key={stat.label} strength={0.15}>
              <div className="text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-[#38bdf8] transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-[#374151] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
