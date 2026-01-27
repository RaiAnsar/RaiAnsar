'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #030712, #0a0f1a)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="block gradient-animated-text">CODE.</span>
          <span className="block text-white">CREATE.</span>
          <span className="block gradient-animated-text">CONQUER.</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Three words. Infinite possibilities. Every line of code is a step toward something extraordinary.
        </motion.p>
      </div>
    </section>
  );
}
