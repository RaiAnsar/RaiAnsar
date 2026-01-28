'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Step = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understand the real problem',
    description:
      'We clarify goals, constraints, and success metrics—so we build the right thing (and avoid expensive rework).',
    details: ['Scope + priorities', 'Audit current site/app', 'Risks + assumptions', 'Plan + timeline'],
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Make it feel premium',
    description:
      'Clean UX, strong hierarchy, and a system your team can extend—without bloating the UI with effects.',
    details: ['Information architecture', 'Component system', 'Responsive states', 'Accessibility pass'],
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Ship with confidence',
    description:
      'Implementation with performance guardrails: fast pages, clean code, and predictable releases.',
    details: ['Implementation', 'Testing & QA', 'Perf budget checks', 'Polish & edge cases'],
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Measure and iterate',
    description:
      'A clean deployment + monitoring setup, plus a roadmap for improvements after real users arrive.',
    details: ['Deployment', 'Monitoring setup', 'SEO + metadata review', 'Post-launch support'],
  },
];

export function Process() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="process" className="section relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(900px circle at 75% 30%, rgba(153,69,255,0.07), transparent 55%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="section-label">How I Work</span>
          <h2 className="section-title max-w-4xl">
            A process clients trust.
            <span className="block text-white/70">Clear steps. Clear communication.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mt-6">
            You’ll always know what’s happening, what’s next, and what “done” looks like.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * index }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40">
                    {step.subtitle}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mt-1">{step.title}</h3>
                </div>
                <div className="text-3xl font-black tracking-tight text-white/20">{step.number}</div>
              </div>

              <p className="text-white/55 leading-relaxed mt-4">{step.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-2 text-sm text-white/50">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
