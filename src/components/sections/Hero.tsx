'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { TextScramble } from '@/components/ui/TextScramble';
import { Magnetic } from '@/components/ui/Magnetic';
import { ScrollVelocity } from '@/components/ui/ScrollVelocity';

const stats = [
  { value: '10+', label: 'Years' },
  { value: '60+', label: 'Projects' },
  { value: '< 24h', label: 'Response' },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0c0c] to-[#0a0a0a]" />

      {/* Main content */}
      <motion.div 
        className="container relative z-10 px-6"
        style={{ y: smoothY, opacity: smoothOpacity, scale }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <Magnetic strength={0.2}>
              <span className="availability-badge cursor-pointer">
                Available for projects
              </span>
            </Magnetic>
            <span className="text-[#404040] text-sm">|</span>
            <span className="text-[#606060] text-sm">2 spots left</span>
          </motion.div>

          {/* Main headline with scramble effect */}
          <ScrollVelocity>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] mb-8"
            >
              <TextScramble text="Crafting" delay={0} />
              <br />
              <span className="gradient-text">
                <TextScramble text="efficient," delay={200} />
              </span>{' '}
              <TextScramble text="scalable" delay={400} />
              <br />
              <TextScramble text="solutions." delay={600} />
            </motion.h1>
          </ScrollVelocity>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-[#707070] max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Full-stack engineer & DevOps expert. I turn complex problems into 
            elegant, high-performance digital experiences.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            role="navigation"
            aria-label="Hero actions"
          >
            <Magnetic strength={0.3}>
              <motion.a
                href="#contact"
                className="btn-primary inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Book a free audit"
              >
                <span>Start a Project</span>
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <motion.a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Stats with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 flex justify-center gap-16"
            role="list"
            aria-label="Statistics"
          >
            {stats.map((stat, index) => (
              <Magnetic key={stat.label} strength={0.15}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center cursor-default group"
                  role="listitem"
                >
                  <div className="text-4xl md:text-5xl font-black text-white mb-1 group-hover:text-[#ff6b35] transition-colors duration-300" aria-label={`${stat.label}: ${stat.value}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-[#505050] uppercase tracking-widest" aria-label={`${stat.label} description`}>
                    {stat.label}
                  </div>
                </motion.div>
              </Magnetic>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="text-xs font-medium tracking-widest uppercase text-[#404040]">
          Scroll
        </span>
        <motion.div 
          className="w-px h-10 bg-gradient-to-b from-[#ff6b35] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
