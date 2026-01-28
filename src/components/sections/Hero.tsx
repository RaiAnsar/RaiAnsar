'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '60+', label: 'Projects Delivered' },
  { value: '< 24h', label: 'Response Time' },
];

function FloatingText({ text, delay }: { text: string; delay: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-[8vw] md:text-[12vw] font-black text-transparent whitespace-nowrap select-none"
      style={{
        WebkitTextStroke: '1px rgba(255,255,255,0.08)',
        WebkitTextStrokeWidth: '1px',
      }}
      aria-hidden="true"
    >
      {text}
    </motion.div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic background with mouse-following gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(800px circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(0,255,240,0.08) 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      />

      {/* Secondary ambient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(153,69,255,0.06) 0%, transparent 60%)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,45,147,0.05) 0%, transparent 60%)',
          right: '15%',
          bottom: '20%',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Floating text marquee */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 right-0 flex gap-8 md:gap-16">
          <FloatingText text="CREATIVE • DEVELOPER • DESIGNER • ENGINEER • " delay={0} />
          <FloatingText text="CREATIVE • DEVELOPER • DESIGNER • ENGINEER • " delay={0.15} />
          <FloatingText text="CREATIVE • DEVELOPER • DESIGNER • ENGINEER • " delay={0.3} />
        </div>
        <div className="absolute bottom-1/4 left-0 right-0 flex gap-8 md:gap-16">
          <FloatingText text="FULL-STACK • ARCHITECT • INNOVATOR • " delay={0} />
          <FloatingText text="FULL-STACK • ARCHITECT • INNOVATOR • " delay={0.15} />
          <FloatingText text="FULL-STACK • ARCHITECT • INNOVATOR • " delay={0.3} />
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
            role="status"
            aria-label="Available for new projects"
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="absolute inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00fff0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00fff0]" />
              </span>
            </motion.span>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60">
              Available for new projects
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]"
          >
            Build{' '}
            <motion.span
              className="inline-block"
              animate={{
                background: [
                  'linear-gradient(135deg, #00fff0 0%, #00d4c8 50%, #00fff0 100%)',
                  'linear-gradient(135deg, #9945ff 0%, #ff2d92 50%, #9945ff 100%)',
                  'linear-gradient(135deg, #ff2d92 0%, #00fff0 50%, #ff2d92 100%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              fast, secure
            </motion.span>
            {' '}
            <motion.span
              className="inline-block"
              animate={{
                background: [
                  'linear-gradient(135deg, #9945ff 0%, #00fff0 50%, #9945ff 100%)',
                  'linear-gradient(135deg, #ff2d92 0%, #9945ff 50%, #ff2d92 100%)',
                  'linear-gradient(135deg, #00fff0 0%, #ff2d92 50%, #00fff0 100%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              web products
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              that scale.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mt-6"
          >
            I&apos;m Rai Ansar — full-stack engineer. I help founders and teams ship
            high-performing websites, WordPress builds, and custom systems with clean
            architecture.
          </motion.p>

          {/* CTA buttons */}
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
            role="navigation"
            aria-label="Hero actions"
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base font-semibold text-[#030303] rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Start a project"
              style={{
                background: 'linear-gradient(135deg, #00fff0 0%, #00d4c8 100%)',
                boxShadow: '0 0 30px rgba(0, 255, 240, 0.3), 0 0 60px rgba(0, 255, 240, 0.2)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #00fff0 0%, #9945ff 100%)' }}
              />
              <span className="relative z-10">Start a Project</span>
            </motion.a>
            <motion.a
              href="#process"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base font-semibold text-[#030303] rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="How I work"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              />
              <span className="relative z-10">How I Work</span>
            </motion.a>
          </motion.nav>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl"
            role="list"
            aria-label="Statistics"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 sm:p-5"
                role="listitem"
              >
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white" aria-label={`${stat.label}: ${stat.value}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-white/40" aria-label={`${stat.label} description`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,255,240,0.3) 0%, rgba(0,255,240,0.1) 100%)',
          }}
        />
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-6 h-10 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,255,240,0.3) 0%, rgba(0,255,240,0.1) 100%)',
          }}
        />
      </motion.div>
    </section>
  );
}
