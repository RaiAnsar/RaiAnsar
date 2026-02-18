'use client';

import { motion } from 'framer-motion';

const roles = ['DEVELOPER', 'ENGINEER', 'CREATIVE', 'PROBLEM SOLVER', 'ARCHITECT'];

export function CodeMarquee() {
  const marqueeText = roles.join(' \u00b7 ') + ' \u00b7 ';
  const tripled = marqueeText + marqueeText + marqueeText;

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden" aria-hidden="true">
      <div className="py-16 md:py-24">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <span
            className="text-[12vw] md:text-[10vw] font-black tracking-tight leading-none select-none"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.12)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {tripled}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
