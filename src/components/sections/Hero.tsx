'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 60, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 100, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.03,
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
      id="home"
      style={{ opacity, scale }}
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="blob w-[800px] h-[800px] bg-gradient-to-r from-[#00fff0]/20 via-[#9945ff]/20 to-[#ff2d92]/20"
          style={{
            left: '10%',
            top: '20%',
          }}
          animate={{
            x: mousePos.x * 50,
            y: mousePos.y * 50,
          }}
          transition={{ type: 'spring', damping: 30 }}
        />
        <motion.div
          className="blob w-[600px] h-[600px] bg-gradient-to-r from-[#ff2d92]/15 to-[#9945ff]/15"
          style={{
            right: '5%',
            bottom: '10%',
          }}
          animate={{
            x: -mousePos.x * 30,
            y: -mousePos.y * 30,
          }}
          transition={{ type: 'spring', damping: 30 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Mouse glow effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,240,0.08) 0%, transparent 70%)',
          left: `calc(${mousePos.x * 100}% - 300px)`,
          top: `calc(${mousePos.y * 100}% - 300px)`,
        }}
      />

      {/* Main content */}
      <motion.div style={{ y }} className="container relative z-10">
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Main headline */}
          <h1 className="overflow-hidden mb-6">
            {isLoaded && (
              <>
                <div className="overflow-hidden">
                  <SplitText
                    text="I CREATE"
                    className="block text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] text-white"
                    delay={0.5}
                  />
                </div>
                <div className="overflow-hidden">
                  <SplitText
                    text="DIGITAL"
                    className="block text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] gradient-text"
                    delay={0.8}
                  />
                </div>
                <div className="overflow-hidden">
                  <SplitText
                    text="EXPERIENCES"
                    className="block text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] text-white"
                    delay={1.1}
                  />
                </div>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Full-stack engineer transforming bold ideas into seamless,
            pixel-perfect digital realities. Code is my craft. Excellence is my standard.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-[#030303] font-bold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, #00fff0 0%, #00d4c8 100%)',
                boxShadow: '0 0 30px rgba(0,255,240,0.4)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00fff0 0%, #9945ff 100%)',
                }}
              />
              <span className="relative z-10">Start a Project</span>
              <svg className="relative z-10 transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="#services"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(153,69,255,0.2) 0%, rgba(255,45,146,0.2) 100%)',
                  boxShadow: 'inset 0 0 30px rgba(153,69,255,0.2)',
                }}
              />
              <span className="relative z-10">View My Work</span>
            </motion.a>
          </motion.div>

          {/* Stats with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto px-4"
          >
            {stats.map((stat, index) => {
              const colors = ['#00fff0', '#9945ff', '#ff2d92'];
              const color = colors[index];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative text-center p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl group cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
                      boxShadow: `0 0 40px ${color}20`,
                    }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 transition-all duration-300"
                      style={{
                        color: 'white',
                        textShadow: `0 0 30px ${color}40`,
                      }}
                    >
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/50 uppercase tracking-wider md:tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="scroll-indicator hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <div className="scroll-indicator-line" />
      </motion.div>

      {/* Decorative corner elements - hidden on mobile to prevent overflow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden md:block absolute top-28 left-6 w-16 h-16 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#00fff0]/60 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#00fff0]/60 to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden md:block absolute top-28 right-6 w-16 h-16 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#ff2d92]/60 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#ff2d92]/60 to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden md:block absolute bottom-6 left-6 w-16 h-16 pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#9945ff]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-[#9945ff]/60 to-transparent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden md:block absolute bottom-6 right-6 w-16 h-16 pointer-events-none"
      >
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#00fff0]/60 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[#00fff0]/60 to-transparent" />
      </motion.div>
    </motion.section>
  );
}
