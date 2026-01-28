'use client';

import { motion, useReducedMotion } from 'framer-motion';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '60+', label: 'Projects Delivered' },
  { value: '< 24h', label: 'Response Time' },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,240,0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute -bottom-72 right-[-15%] w-[900px] h-[900px] rounded-full blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(153,69,255,0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00fff0] opacity-70" />
            Available for new projects
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Build fast, secure web products that scale.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed">
            I&apos;m Rai Ansar — full-stack engineer. I help founders and teams ship high-performing websites,
            WordPress builds, and custom systems with clean architecture.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="btn-primary">
              <span>Start a Project</span>
            </a>
            <a href="#process" className="btn-secondary">
              <span>How I Work</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4"
              >
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

